import random

from app.models.timetable import Timetable

from app.models.faculty_subject_mapping import (
    FacultySubjectMapping
)

from app.utils.timetable.constants import (
    DAYS,
    LAB_SLOTS
)

from app.utils.timetable.lab_validator import (
    lab_already_scheduled_today,
    batch_has_lab_on_day
)


def allocate_lab_sessions(
    db,
    batch,
    lab_subjects,
    schedule_state
):

    generated_count = 0

    room = (
        f"LAB-{batch.department.code}"
    )

    for subject in lab_subjects:

        mapping = (
            db.query(
                FacultySubjectMapping
            )
            .filter(
                FacultySubjectMapping.subject_id
                == subject.id
            )
            .first()
        )

        if not mapping:
            continue

        faculty_id = mapping.faculty_id

        sessions = int(
            subject.lab_sessions_per_week or 1
        )

        allocated_sessions = 0

        days = DAYS.copy()
        random.shuffle(days)

        while allocated_sessions < sessions:

            allocated = False

            for day in days:

                # Same lab cannot repeat on same day
                if lab_already_scheduled_today(
                    db,
                    batch.id,
                    subject.id,
                    day
                ):
                    continue

                # Only one lab session per batch per day
                if batch_has_lab_on_day(
                    db,
                    batch.id,
                    day
                ):
                    continue

                slot_pairs = LAB_SLOTS.copy()
                random.shuffle(slot_pairs)

                for pair in slot_pairs:

                    clash = False

                    # ==================================
                    # Validate complete pair
                    # ==================================

                    for period in pair:

                        # Faculty clash
                        if schedule_state.is_faculty_busy(
                            faculty_id,
                            day,
                            period
                        ):
                            clash = True
                            break

                        # Batch clash
                        if schedule_state.is_batch_busy(
                            batch.id,
                            day,
                            period
                        ):
                            clash = True
                            break

                        # Room clash
                        if schedule_state.is_room_busy(
                            room,
                            day,
                            period
                        ):
                            clash = True
                            break

                    if clash:
                        continue

                    # ==================================
                    # Allocate lab
                    # ==================================

                    for period in pair:

                        timetable = Timetable(
                            batch_id=batch.id,
                            day=day,
                            period=period,
                            subject_id=subject.id,
                            faculty_id=faculty_id,
                            room_number=room
                        )

                        db.add(timetable)

                        schedule_state.occupy_faculty(
                            faculty_id,
                            day,
                            period
                        )

                        schedule_state.occupy_batch(
                            batch.id,
                            day,
                            period
                        )

                        schedule_state.occupy_room(
                            room,
                            day,
                            period
                        )

                    db.flush()

                    print(
                        f"Allocated "
                        f"{subject.subject_name} "
                        f"for Batch {batch.id} "
                        f"on {day} "
                        f"{pair}"
                    )

                    generated_count += len(pair)

                    allocated_sessions += 1

                    allocated = True

                    break

                if allocated:
                    break

            # Safety check
            if not allocated:

                print(
                    f"Unable to allocate "
                    f"{subject.subject_name} "
                    f"for Batch {batch.id}"
                )

                break

    return generated_count