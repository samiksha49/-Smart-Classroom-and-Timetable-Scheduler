from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey
)

from sqlalchemy.orm import relationship

from app.database.connection import Base


class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)

    department_id = Column(
        Integer,
        ForeignKey("departments.id"),
        nullable=False
    )

    batch_id = Column(
        Integer,
        ForeignKey("batches.id"),
        nullable=False
    )

    faculty_id = Column(
        Integer,
        ForeignKey("faculties.id"),
        nullable=True
    )

    subject_code = Column(
        String(20),
        nullable=False,
        unique=True
    )

    subject_name = Column(
        String(100),
        nullable=False
    )

    hours_per_week = Column(
        Integer,
        nullable=False
    )

    status = Column(
        Boolean,
        default=True
    )

    is_lab = Column(
        Boolean,
        default=False
    )

    lab_sessions_per_week = Column(
        Integer,
        default=0
    )

    department = relationship("Department", back_populates="subjects")
    batch = relationship("Batch", back_populates="subjects")
    faculty = relationship("Faculty", back_populates="subjects")

    faculty_mappings = relationship(
        "FacultySubjectMapping",
        back_populates="subject"
    )