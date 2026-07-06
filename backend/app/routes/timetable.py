from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.utils.auth import (
    get_current_user
)

from app.services.timetable_service import (
    TimetableService
)

router = APIRouter(
    prefix="/timetable",
    tags=["Timetable"]
)


# Generate timetable for entire college
@router.post("/generate")
def generate_timetable(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return TimetableService.generate_timetable(
        db
    )

# Get timetable by batch
@router.get("/{batch_id}")
def get_timetable(
    batch_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return TimetableService.get_timetable(
        batch_id,
        db
    )


# Delete timetable by batch
@router.delete("/{batch_id}")
def delete_timetable(
    batch_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return TimetableService.delete_timetable(
        batch_id,
        db
    )