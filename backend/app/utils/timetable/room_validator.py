from app.models.timetable import Timetable


def is_room_busy(
    db,
    room,
    day,
    period
):

    return (
        db.query(Timetable)
        .filter(
            Timetable.room_number == room,
            Timetable.day == day,
            Timetable.period == period
        )
        .first()
        is not None
    )