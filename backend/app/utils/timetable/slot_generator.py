import random

from app.utils.timetable.constants import (
    DAYS,
    PERIODS
)


def generate_slots():

    slots = []

    for day in DAYS:

        for period in PERIODS:

            slots.append({
                "day": day,
                "period": period
            })

    random.shuffle(slots)

    return slots