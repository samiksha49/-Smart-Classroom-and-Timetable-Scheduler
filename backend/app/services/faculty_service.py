from sqlalchemy.orm import Session

from app.models.faculty import Faculty
from app.models.department import Department

from app.schemas.faculty import (
    FacultyCreate,
    FacultyUpdate
)
from app.utils.metadata import pagination_metadata
from app.utils.response import ApiResponse

class FacultyService:

    @staticmethod
    def create_faculty(
        payload: FacultyCreate,
        db: Session
    ):

        department = (
            db.query(Department)
            .filter(
                Department.id == payload.department_id
            )
            .first()
        )

        if not department:
            return ApiResponse.error(
                "Department not found",
                404
            )

        existing_faculty = (
            db.query(Faculty)
            .filter(
                Faculty.employee_code ==
                payload.employee_code
            )
            .first()
        )

        if existing_faculty:
            return ApiResponse.error(
                "Faculty already exists",
                400
            )

        faculty = Faculty(
            department_id=payload.department_id,
            name=payload.name,
            employee_code=payload.employee_code,
            email=payload.email,
            designation=payload.designation,
            status=payload.status
        )

        db.add(faculty)
        db.commit()
        db.refresh(faculty)

        return ApiResponse.success(
            "Faculty created successfully",
            faculty
        )

    @staticmethod
    def get_all_faculties(
        page: int,
        page_size: int,
        db: Session
    ):

        query = db.query(Faculty)

        total_records = query.count()

        if page == -1:
            faculties = query.all()
        else:
            faculties = (
                query
                .offset((page - 1) * page_size)
                .limit(page_size)
                .all()
            )

        response = []

        for faculty in faculties:

            response.append({
                "id": faculty.id,

                "department_id":
                    faculty.department_id,

                "department_name":
                    faculty.department.name
                    if faculty.department
                    else None,

                "name":
                    faculty.name,

                "employee_code":
                    faculty.employee_code,

                "email":
                    faculty.email,

                "designation":
                    faculty.designation,

                "status":
                    faculty.status
            })

        return ApiResponse.success(
            message="Faculties fetched successfully",
            data=response,
            metadata=pagination_metadata(
                page=page,
                page_size=page_size,
                total_records=total_records
            )
        )

    @staticmethod
    def get_faculty_by_id(
        faculty_id: int,
        db: Session
    ):

        faculty = (
            db.query(Faculty)
            .filter(
                Faculty.id == faculty_id
            )
            .first()
        )

        if not faculty:
            return ApiResponse.error(
                "Faculty not found",
                404
            )

        return ApiResponse.success(
            "Faculty fetched successfully",
            faculty
        )

    @staticmethod
    def update_faculty(
        faculty_id: int,
        payload: FacultyUpdate,
        db: Session
    ):

        faculty = (
            db.query(Faculty)
            .filter(
                Faculty.id == faculty_id
            )
            .first()
        )

        if not faculty:
            return ApiResponse.error(
                "Faculty not found",
                404
            )

        update_data = payload.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(
                faculty,
                key,
                value
            )

        db.commit()
        db.refresh(faculty)

        return ApiResponse.success(
            "Faculty updated successfully",
            faculty
        )