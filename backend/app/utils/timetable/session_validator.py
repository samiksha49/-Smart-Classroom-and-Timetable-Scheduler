from app.models.timetable import Timetable


def subject_exists_in_same_session(
    db,
    batch_id,
    subject_id,
    day,
    period
):

    # Morning Session
    if period <= 4:
        periods = [1, 2, 3, 4]

    # Afternoon Session
    else:
        periods = [6, 7, 8]

    existing = (
        db.query(Timetable)
        .filter(
            Timetable.batch_id == batch_id,
            Timetable.subject_id == subject_id,
            Timetable.day == day,
            Timetable.period.in_(periods)
        )
        .first()
    )

    return existing is not None