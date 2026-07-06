from pydantic import BaseModel
from typing import Optional


class SubjectCreate(BaseModel):
    department_id: int
    batch_id: int
    faculty_id: int
    subject_code: str
    subject_name: str
    hours_per_week: int
    status: bool = True


class SubjectUpdate(BaseModel):
    department_id: Optional[int] = None
    batch_id: Optional[int] = None
    faculty_id: Optional[int] = None
    subject_code: Optional[str] = None
    subject_name: Optional[str] = None
    hours_per_week: Optional[int] = None
    status: Optional[bool] = None