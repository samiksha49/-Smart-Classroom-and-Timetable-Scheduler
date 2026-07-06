from sqlalchemy.orm import Session

from app.models.subject import Subject
from app.models.department import Department
from app.models.batch import Batch
from app.models.faculty import Faculty
from app.schemas.subject import (
    SubjectCreate,
    SubjectUpdate
)
from app.utils.response import ApiResponse
from app.utils.metadata import pagination_metadata


class SubjectService:

    @staticmethod
    def create_subject(
        payload: SubjectCreate,
        db: Session
    ):

        # Check Department
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

        # Check Batch
        batch = (
            db.query(Batch)
            .filter(
                Batch.id == payload.batch_id
            )
            .first()
        )

        if not batch:
            return ApiResponse.error(
                "Batch not found",
                404
            )

        # Check Faculty
        faculty = (
            db.query(Faculty)
            .filter(
                Faculty.id == payload.faculty_id
            )
            .first()
        )

        if not faculty:
            return ApiResponse.error(
                "Faculty not found",
                404
            )

        # Check duplicate subject code
        existing_subject = (
            db.query(Subject)
            .filter(
                Subject.subject_code ==
                payload.subject_code
            )
            .first()
        )

        if existing_subject:
            return ApiResponse.error(
                "Subject already exists",
                400
            )

        subject = Subject(
            department_id=payload.department_id,
            batch_id=payload.batch_id,
            faculty_id=payload.faculty_id,
            subject_code=payload.subject_code,
            subject_name=payload.subject_name,
            hours_per_week=payload.hours_per_week,
            status=payload.status
        )

        db.add(subject)
        db.commit()
        db.refresh(subject)

        return ApiResponse.success(
            "Subject created successfully",
            subject
        )

    @staticmethod
    def get_all_subjects(
        page: int,
        page_size: int,
        db: Session
    ):

        query = db.query(Subject)

        total_records = query.count()

        if page == -1:
            subjects = query.all()
        else:
            subjects = (
                query
                .offset((page - 1) * page_size)
                .limit(page_size)
                .all()
            )

        response = []

        for subject in subjects:
            response.append({
                "id": subject.id,
                "department_id": subject.department_id,
                "department_name": (
                    subject.department.name
                    if subject.department else None
                ),

                "batch_id": subject.batch_id,
                "batch_name": (
                    f"{subject.batch.year}-{subject.batch.section}"
                    if subject.batch else None
                ),

                "faculty_id": subject.faculty_id,
                "faculty_name": (
                    subject.faculty.name
                    if subject.faculty else None
                ),

                "subject_code": subject.subject_code,
                "subject_name": subject.subject_name,
                "hours_per_week": subject.hours_per_week,
                "status": subject.status
            })

        return ApiResponse.success(
            message="Subjects fetched successfully",
            data=response,
            metadata=pagination_metadata(
                page=page,
                page_size=page_size,
                total_records=total_records
            )
        )

    @staticmethod
    def get_subject_by_id(
        subject_id: int,
        db: Session
    ):

        subject = (
            db.query(Subject)
            .filter(
                Subject.id == subject_id
            )
            .first()
        )

        if not subject:
            return ApiResponse.error(
                "Subject not found",
                404
            )

        return ApiResponse.success(
            "Subject fetched successfully",
            subject
        )

    @staticmethod
    def update_subject(
        subject_id: int,
        payload: SubjectUpdate,
        db: Session
    ):

        subject = (
            db.query(Subject)
            .filter(
                Subject.id == subject_id
            )
            .first()
        )

        if not subject:
            return ApiResponse.error(
                "Subject not found",
                404
            )

        update_data = payload.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(subject, key, value)

        db.commit()
        db.refresh(subject)

        return ApiResponse.success(
            "Subject updated successfully",
            subject
        )