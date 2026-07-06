from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey
)

from sqlalchemy.orm import relationship

from app.database.connection import Base


class Timetable(Base):
    __tablename__ = "timetables"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    batch_id = Column(
        Integer,
        ForeignKey("batches.id"),
        nullable=False
    )

    day = Column(
        String(20),
        nullable=False
    )

    period = Column(
        Integer,
        nullable=False
    )

    subject_id = Column(
        Integer,
        ForeignKey("subjects.id"),
        nullable=False
    )

    faculty_id = Column(
        Integer,
        ForeignKey("faculties.id"),
        nullable=False
    )

    room_number = Column(
        String(50),
        nullable=True
    )

    batch = relationship("Batch")

    subject = relationship("Subject")

    faculty = relationship("Faculty")