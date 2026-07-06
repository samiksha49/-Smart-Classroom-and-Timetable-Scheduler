from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey
)

from sqlalchemy.orm import relationship

from app.database.connection import Base


class Faculty(Base):
    __tablename__ = "faculties"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    department_id = Column(
        Integer,
        ForeignKey("departments.id"),
        nullable=False
    )

    name = Column(
        String(100),
        nullable=False
    )

    employee_code = Column(
        String(20),
        nullable=False,
        unique=True
    )

    email = Column(
        String(100),
        nullable=False,
        unique=True
    )

    designation = Column(
        String(100),
        nullable=False
    )

    status = Column(
        Boolean,
        default=True
    )

    # Relationship
    department = relationship(
        "Department",
        back_populates="faculties"
    )

    subjects = relationship(
        "Subject",
        back_populates="faculty"
    )

    subject_mappings = relationship(
        "FacultySubjectMapping",
        back_populates="faculty"
    )