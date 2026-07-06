from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.utils.auth import get_current_user

from app.schemas.faculty_subject_mapping import (
    FacultySubjectMappingCreate
)

from app.services.faculty_subject_mapping_service import (
    FacultySubjectMappingService
)

router = APIRouter(
    prefix="/faculty-subject-mappings",
    tags=["Faculty Subject Mapping"]
)


@router.get("/")
def get_all_mappings(
    page: int = 1,
    page_size: int = 10,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return FacultySubjectMappingService.get_all_mappings(
        page,
        page_size,
        db
    )


@router.post("/")
def create_mapping(
    payload: FacultySubjectMappingCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return FacultySubjectMappingService.create_mapping(
        payload,
        db
    )