import random

from app.models.timetable import Timetable
from app.models.faculty_subject_mapping import (
    FacultySubjectMapping
)

from app.utils.timetable.constants import (
    DAYS,
    PERIODS
)

from app.utils.timetable.session_validator import (
    subject_exists_in_same_session
)

from app.utils.timetable.subject_validator import (
    exceeds_consecutive_limit
)


def fill_remaining_slots(
    db,
    batch,
    theory_subjects,
    schedule_state
):

    generated_count = 0

    room = (
        f"{batch.department.code}"
        f"-{batch.year}"
        f"{batch.section}"
    )

    for day in DAYS:

        for period in PERIODS:

            # Skip occupied slot
            if schedule_state.is_batch_busy(
                batch.id,
                day,
                period
            ):
                continue

            subjects = theory_subjects.copy()
            random.shuffle(subjects)

            allocated = False

            for subject in subjects:

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

                # Faculty clash
                if schedule_state.is_faculty_busy(
                    faculty_id,
                    day,
                    period
                ):
                    continue

                # Room clash
                if schedule_state.is_room_busy(
                    room,
                    day,
                    period
                ):
                    continue

                # Same subject shouldn't repeat
                # in same morning/afternoon session
                if subject_exists_in_same_session(
                    db,
                    batch.id,
                    subject.id,
                    day,
                    period
                ):
                    continue

                # Avoid continuous periods
                if exceeds_consecutive_limit(
                    db,
                    batch.id,
                    subject.id,
                    day,
                    period
                ):
                    continue

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

                generated_count += 1
                allocated = True

                break

            if not allocated:

                print(
                    f"Unable to fill "
                    f"{day} P{period} "
                    f"for Batch {batch.id}"
                )

    db.flush()

    return generated_count