from sqlalchemy.orm import Session

import random
from app.models.batch import Batch
from app.models.subject import Subject
from app.models.timetable import Timetable
from app.models.faculty_subject_mapping import (
    FacultySubjectMapping
)

from app.utils.timetable.fill_remaining_slots import (
    fill_remaining_slots
)

from typing import cast

from app.utils.timetable.schedule_state import (
    ScheduleState
)

from app.utils.timetable.session_validator import (
    subject_exists_in_same_session
)

from app.utils.response import ApiResponse

from app.utils.timetable.slot_generator import (
    generate_slots
)

from app.utils.timetable.workload_validator import (
    faculty_daily_limit_exceeded,
    faculty_weekly_limit_exceeded
)

from app.utils.timetable.subject_validator import (
    exceeds_consecutive_limit
)

from app.utils.timetable.placement_validator import (
    can_schedule_placement
)

from app.utils.timetable.lab_scheduler import (
    allocate_lab_sessions
)


class TimetableService:

    @staticmethod
    def generate_timetable(
        db: Session
    ):

        # Clear old timetable
        db.query(Timetable).delete()
        db.commit()

        batches = db.query(Batch).all()

        if not batches:
            return ApiResponse.error(
                message="No batches found"
            )

        generated_count = 0

        # Global state for entire college
        schedule_state = ScheduleState()

        for batch in batches:

            subjects = (
                db.query(Subject)
                .filter(
                    Subject.batch_id == batch.id
                )
                .all()
            )

            if not subjects:
                continue

            theory_subjects = [
                s for s in subjects
                if s.is_lab is False
            ]

            theory_subjects = sorted(
                theory_subjects,
                key=lambda s: (
                    0 if "math" in s.subject_name.lower()
                    or "calculus" in s.subject_name.lower()
                    else 1
                )
            )

            lab_subjects = [
                s for s in subjects
                if s.is_lab is True
            ]

            available_slots = generate_slots()

            # =====================================
            # LAB SCHEDULING
            # =====================================

            lab_count = allocate_lab_sessions(
                db=db,
                batch=batch,
                lab_subjects=lab_subjects,
                schedule_state=schedule_state
            )

            generated_count += lab_count

            # =====================================
            # THEORY SUBJECTS
            # =====================================

            for subject in theory_subjects:

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
                hours = cast(int, subject.hours_per_week)

                allocated_hours = 0

                while allocated_hours < hours:
                    if not available_slots:
                        break

                    slot = random.choice(available_slots)

                    day = slot["day"]
                    period = slot["period"]
                    # Placement rule
                    if not can_schedule_placement(
                        subject.subject_name,
                        period
                    ):
                        continue

                    # Faculty clash
                    if schedule_state.is_faculty_busy(
                        faculty_id,
                        day,
                        period
                    ):
                        continue

                    # Batch clash
                    if schedule_state.is_batch_busy(
                        batch.id,
                        day,
                        period
                    ):
                        continue

                    room = (
                        f"{batch.department.code}"
                        f"-{batch.year}"
                        f"{batch.section}"
                    )

                    # Room clash
                    if schedule_state.is_room_busy(
                        room,
                        day,
                        period
                    ):
                        continue

                    # Faculty workload
                    if faculty_daily_limit_exceeded(
                        db,
                        faculty_id,
                        day
                    ):
                        continue

                    if faculty_weekly_limit_exceeded(
                        db,
                        faculty_id
                    ):
                        continue

                    # Prevent continuous subject
                    if exceeds_consecutive_limit(
                        db,
                        batch.id,
                        subject.id,
                        day,
                        period
                    ):
                        continue

                    # Prevent same subject in same half
                    if subject_exists_in_same_session(
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

                    # Occupy global schedule
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

                    available_slots.remove(slot)
                    db.flush()

                    allocated_hours += 1
                    generated_count += 1

            fill_count = fill_remaining_slots(
                db=db,
                batch=batch,
                theory_subjects=theory_subjects,
                schedule_state=schedule_state
            )

            generated_count += fill_count

        db.commit()

        return ApiResponse.success(
            message="College timetable generated successfully",
            data={
                "total_batches": len(batches),
                "total_periods_generated":
                    generated_count
            }
        )

    @staticmethod
    def get_timetable(
        batch_id: int,
        db: Session
    ):

        timetable = (
            db.query(Timetable)
            .filter(
                Timetable.batch_id == batch_id
            )
            .order_by(
                Timetable.day,
                Timetable.period
            )
            .all()
        )

        if not timetable:
            return ApiResponse.error(
                message="No timetable found",
                status_code=404
            )

        response = []

        for item in timetable:

            response.append({
                "id": item.id,
                "day": item.day,
                "period": item.period,

                "subject_id":
                    item.subject_id,

                "subject_name":
                    item.subject.subject_name,

                "faculty_id":
                    item.faculty_id,

                "faculty_name":
                    item.faculty.name,

                "room_number":
                    item.room_number
            })

        return ApiResponse.success(
            message="Timetable fetched successfully",
            data=response
        )

    @staticmethod
    def delete_timetable(
        batch_id: int,
        db: Session
    ):

        deleted = (
            db.query(Timetable)
            .filter(
                Timetable.batch_id == batch_id
            )
            .delete()
        )

        if not deleted:
            return ApiResponse.error(
                message="No timetable found",
                status_code=404
            )

        db.commit()

        return ApiResponse.success(
            message="Timetable deleted successfully",
            data=[]
        )