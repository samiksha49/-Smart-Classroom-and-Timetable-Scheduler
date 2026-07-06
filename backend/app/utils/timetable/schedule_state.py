class ScheduleState:

    def __init__(self):
        self.faculty_schedule = {}
        self.batch_schedule = {}
        self.room_schedule = {}

    def is_faculty_busy(
        self,
        faculty_id,
        day,
        period
    ):
        return self.faculty_schedule.get(
            (faculty_id, day, period),
            False
        )

    def occupy_faculty(
        self,
        faculty_id,
        day,
        period
    ):

        self.faculty_schedule[
            (faculty_id, day, period)
        ] = True

    def is_batch_busy(
        self,
        batch_id,
        day,
        period
    ):

        return self.batch_schedule.get(
            (batch_id, day, period),
            False
        )

    def occupy_batch(
        self,
        batch_id,
        day,
        period
    ):
        self.batch_schedule[
            (batch_id, day, period)
        ] = True

    def is_room_busy(
        self,
        room,
        day,
        period
    ):
        return self.room_schedule.get(
            (room, day, period),
            False
        )

    def occupy_room(
        self,
        room,
        day,
        period
    ):
        self.room_schedule[
            (room, day, period)
        ] = True