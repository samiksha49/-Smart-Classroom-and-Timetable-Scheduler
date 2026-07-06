def can_schedule_placement(
    subject_name,
    period
):

    if (
        "Placement" in subject_name
        and period < 6
    ):
        return False

    return True