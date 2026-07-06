from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db

from app.utils.auth import (
    get_current_user
)

from app.schemas.faculty import (
    FacultyCreate,
    FacultyUpdate
)

from app.services.faculty_service import (
    FacultyService
)

router = APIRouter(
    prefix="/faculties",
    tags=["Faculties"]
)


@router.get("/")
def get_all_faculties(
    page: int = 1,
    page_size: int = 10,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return FacultyService.get_all_faculties(
        page,
        page_size,
        db
    )


@router.post("/")
def create_faculty(
    payload: FacultyCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return FacultyService.create_faculty(
        payload,
        db
    )


@router.get("/{faculty_id}")
def get_faculty_by_id(
    faculty_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return FacultyService.get_faculty_by_id(
        faculty_id,
        db
    )


@router.put("/{faculty_id}")
def update_faculty(
    faculty_id: int,
    payload: FacultyUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return FacultyService.update_faculty(
        faculty_id,
        payload,
        db
    )