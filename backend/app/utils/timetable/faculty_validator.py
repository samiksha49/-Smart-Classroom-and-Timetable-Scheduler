from app.models.timetable import Timetable


def is_faculty_busy(
    db,
    faculty_id,
    day,
    period
):

    return (
        db.query(Timetable)
        .filter(
            Timetable.faculty_id == faculty_id,
            Timetable.day == day,
            Timetable.period == period
        )
        .first()
        is not None
    )