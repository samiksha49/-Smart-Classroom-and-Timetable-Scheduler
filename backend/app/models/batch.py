from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    ForeignKey
)
from sqlalchemy.orm import relationship
from app.database.connection import Base


class Batch(Base):
    __tablename__ = "batches"
    id = Column(Integer, primary_key=True, index=True)
    department_id = Column(
        Integer,
        ForeignKey("departments.id"),
        nullable=False
    )
    year = Column(Integer, nullable=False)
    section = Column(String(10), nullable=False)
    strength = Column(Integer, nullable=False)
    status = Column(Boolean, default=True)

    department = relationship(
        "Department",
        back_populates="batches"
    )

    subjects = relationship(
        "Subject",
        back_populates="batch"
    )