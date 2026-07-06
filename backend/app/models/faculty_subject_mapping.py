from sqlalchemy import (
    Column,
    Integer,
    ForeignKey
)

from sqlalchemy.orm import relationship
from app.database.connection import Base

class FacultySubjectMapping(Base):
    __tablename__ = "faculty_subject_mappings"
    id = Column(
        Integer,
        primary_key=True,
        index=True
    )
    faculty_id = Column(
        Integer,
        ForeignKey("faculties.id"),
        nullable=False
    )
    subject_id = Column(
        Integer,
        ForeignKey("subjects.id"),
        nullable=False
    )
    faculty = relationship(
        "Faculty",
        back_populates="subject_mappings"
    )
    subject = relationship(
        "Subject",
        back_populates="faculty_mappings"
    )