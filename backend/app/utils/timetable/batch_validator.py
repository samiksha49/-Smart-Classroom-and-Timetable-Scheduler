from app.models.timetable import Timetable


def is_batch_busy(
    db,
    batch_id,
    day,
    period
):

    return (
        db.query(Timetable)
        .filter(
            Timetable.batch_id == batch_id,
            Timetable.day == day,
            Timetable.period == period
        )
        .first()
        is not None
    )