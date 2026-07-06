from pydantic import BaseModel, Field
from typing import Optional


class BatchCreate(BaseModel):
    department_id: int
    year: int = Field(..., ge=1, le=4)
    section: str
    strength: int = Field(..., gt=0)


class BatchUpdate(BaseModel):
    department_id: Optional[int] = None
    year: Optional[int] = Field(None, ge=1, le=4)
    section: Optional[str] = None
    strength: Optional[int] = Field(None, gt=0)