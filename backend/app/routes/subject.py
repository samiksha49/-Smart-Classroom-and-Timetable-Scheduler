from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.utils.auth import get_current_user

from app.schemas.subject import (
    SubjectCreate,
    SubjectUpdate
)

from app.services.subject_service import SubjectService


router = APIRouter(
    prefix="/subjects",
    tags=["Subjects"]
)


# Get all subjects
@router.get("/")
def get_all_subjects(
    page: int = 1,
    page_size: int = 10,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return SubjectService.get_all_subjects(
        page,
        page_size,
        db
    )


# Create a new subject
@router.post("/")
def create_subject(
    payload: SubjectCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return SubjectService.create_subject(
        payload,
        db
    )


# Get subject by id
@router.get("/{subject_id}")
def get_subject_by_id(
    subject_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return SubjectService.get_subject_by_id(
        subject_id,
        db
    )


# Update subject
@router.put("/{subject_id}")
def update_subject(
    subject_id: int,
    payload: SubjectUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return SubjectService.update_subject(
        subject_id,
        payload,
        db
    )