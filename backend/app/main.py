from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Database
from app.database.connection import (
    engine,
    Base
)

# Import ALL models
from app.models.user import User
from app.models.department import Department
from app.models.batch import Batch
from app.models.faculty import Faculty
from app.models.subject import Subject
from app.models.faculty_subject_mapping import FacultySubjectMapping
from app.models.timetable import Timetable

# Routers
from app.routes.auth import router as auth_router
from app.routes.department import router as department_router
from app.routes.batch import router as batch_router
from app.routes.faculty import router as faculty_router
from app.routes.subject import router as subject_router
from app.routes.dashboard import router as dashboard_router
from app.routes.health import router as health_router
from app.routes.timetable import router as timetable_router
from app.routes.faculty_subject_mapping import (
    router as faculty_subject_mapping_router
)

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

# Register routes
app.include_router(auth_router)
app.include_router(department_router)
app.include_router(batch_router)
app.include_router(faculty_router)
app.include_router(subject_router)
app.include_router(dashboard_router)
app.include_router(health_router)
app.include_router(timetable_router)
app.include_router(faculty_subject_mapping_router)