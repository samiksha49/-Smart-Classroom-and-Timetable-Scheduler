from app.models.timetable import Timetable

from app.utils.timetable.constants import (
    MAX_DAILY_HOURS,
    MAX_WEEKLY_HOURS
)


def faculty_daily_limit_exceeded(
    db,
    faculty_id,
    day
):

    count = (
        db.query(Timetable)
        .filter(
            Timetable.faculty_id == faculty_id,
            Timetable.day == day
        )
        .count()
    )

    return count >= MAX_DAILY_HOURS


def faculty_weekly_limit_exceeded(
    db,
    faculty_id
):

    count = (
        db.query(Timetable)
        .filter(
            Timetable.faculty_id == faculty_id
        )
        .count()
    )

    return count >= MAX_WEEKLY_HOURS