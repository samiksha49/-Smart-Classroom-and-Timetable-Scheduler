from pydantic import BaseModel
from typing import Optional

class FacultySubjectMappingCreate(BaseModel):
    faculty_id: int
    subject_id: int

class FacultySubjectMappingUpdate(BaseModel):
    faculty_id: Optional[int] = None
    subject_id: Optional[int] = None