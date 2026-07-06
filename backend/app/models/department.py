from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean
)

from sqlalchemy.orm import relationship

from app.database.connection import Base


class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), nullable=False)

    code = Column(String(10), nullable=False)

    description = Column(String(255))

    status = Column(Boolean, default=True)

    # Relationships
    batches = relationship(
        "Batch",
        back_populates="department"
    )

    faculties = relationship(
        "Faculty",
        back_populates="department"
    )

    subjects = relationship(
        "Subject",
        back_populates="department"
    )