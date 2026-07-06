from app.models.timetable import Timetable


def exceeds_consecutive_limit(
    db,
    batch_id,
    subject_id,
    day,
    period
):

    previous = (
        db.query(Timetable)
        .filter(
            Timetable.batch_id == batch_id,
            Timetable.subject_id == subject_id,
            Timetable.day == day,
            Timetable.period.in_([
                period - 1,
                period - 2
            ])
        )
        .count()
    )

    return previous >= 2