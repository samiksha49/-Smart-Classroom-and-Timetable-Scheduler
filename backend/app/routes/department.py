from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.utils.auth import get_current_user

from app.schemas.department import (
    DepartmentCreate,
    DepartmentUpdate
)

from app.services.department_service import DepartmentService


router = APIRouter(
    prefix="/departments",
    tags=["Departments"]
)


@router.get("/")
def get_departments(
    page: int = 1,
    page_size: int = 10,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return DepartmentService.get_all_departments(
        page,
        page_size,
        db
    )

@router.post("/")
def create_department(
    payload: DepartmentCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return DepartmentService.create_department(
        payload,
        db
    )


@router.get("/{department_id}")
def get_department_by_id(
    department_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return DepartmentService.get_department_by_id(
        department_id,
        db
    )


@router.put("/{department_id}")
def update_department(
    department_id: int,
    payload: DepartmentUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return DepartmentService.update_department(
        department_id,
        payload,
        db
    )