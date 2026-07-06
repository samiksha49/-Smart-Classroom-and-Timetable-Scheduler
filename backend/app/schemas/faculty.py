from pydantic import BaseModel, EmailStr
from typing import Optional


class FacultyCreate(BaseModel):
    department_id: int
    name: str
    employee_code: str
    email: EmailStr
    designation: str
    status: bool = True


class FacultyUpdate(BaseModel):
    department_id: Optional[int] = None
    name: Optional[str] = None
    employee_code: Optional[str] = None
    email: Optional[EmailStr] = None
    designation: Optional[str] = None
    status: Optional[bool] = None