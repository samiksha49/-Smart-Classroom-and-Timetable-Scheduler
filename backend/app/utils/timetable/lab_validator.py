from app.models.timetable import Timetable
from app.models.subject import Subject


def lab_already_scheduled_today(
    db,
    batch_id,
    subject_id,
    day
):

    return (
        db.query(Timetable)
        .filter(
            Timetable.batch_id == batch_id,
            Timetable.subject_id == subject_id,
            Timetable.day == day
        )
        .count()
        > 0
    )


def batch_has_lab_on_day(
    db,
    batch_id,
    day
):

    return (
        db.query(Timetable)
        .join(
            Subject,
            Subject.id == Timetable.subject_id
        )
        .filter(
            Timetable.batch_id == batch_id,
            Timetable.day == day,
            Subject.is_lab.is_(True)
        )
        .count()
        > 0
    )