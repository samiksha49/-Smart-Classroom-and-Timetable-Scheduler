from sqlalchemy.orm import Session

from app.models.department import Department
from app.schemas.department import (
    DepartmentCreate,
    DepartmentUpdate
)

from app.utils.response import ApiResponse
from app.utils.metadata import pagination_metadata

class DepartmentService:

    @staticmethod
    def create_department(
        payload: DepartmentCreate,
        db: Session
    ):
        existing_department = (
            db.query(Department)
            .filter(Department.name == payload.name)
            .first()
        )

        if existing_department:
            return ApiResponse.error(
                message="Department already exists",
                status_code=400
            )

        department = Department(
            name=payload.name,
            code=payload.code,
            description=payload.description,
            status=payload.status
        )

        db.add(department)
        db.commit()
        db.refresh(department)

        return ApiResponse.success(
            message="Department created successfully",
            data=department
        )

    @staticmethod
    def get_all_departments(
        page: int,
        page_size: int,
        db: Session
    ):

        query = db.query(Department)

        total_records = query.count()

        if page == -1:
            departments = query.all()
        else:
            departments = (
                query
                .offset((page - 1) * page_size)
                .limit(page_size)
                .all()
            )

        response = []

        for department in departments:
            response.append({
                "id": department.id,
                "name": department.name,
                "code": department.code,
                "description": department.description,
                "status": department.status
            })

        return ApiResponse.success(
            message="Departments fetched successfully",
            data=response,
            metadata=pagination_metadata(
                page=page,
                page_size=page_size,
                total_records=total_records
            )
        )

    @staticmethod
    def get_department_by_id(
        department_id: int,
        db: Session
    ):
        department = (
            db.query(Department)
            .filter(
                Department.id == department_id
            )
            .first()
        )

        if not department:
            return ApiResponse.error(
                message="Department not found",
                status_code=404
            )

        return ApiResponse.success(
            message="Department fetched successfully",
            data=department
        )

    @staticmethod
    def update_department(
        department_id: int,
        payload: DepartmentUpdate,
        db: Session
    ):
        department = (
            db.query(Department)
            .filter(
                Department.id == department_id
            )
            .first()
        )

        if not department:
            return ApiResponse.error(
                message="Department not found",
                status_code=404
            )

        update_data = payload.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(
                department,
                key,
                value
            )

        db.commit()
        db.refresh(department)

        return ApiResponse.success(
            message="Department updated successfully",
            data=department
        )