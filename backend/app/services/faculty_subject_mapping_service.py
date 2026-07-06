from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.faculty_subject_mapping import (
    FacultySubjectMapping
)

from app.utils.response import ApiResponse
from app.utils.metadata import pagination_metadata

class FacultySubjectMappingService:

    @staticmethod
    def create_mapping(
        payload,
        db: Session
    ):

        existing = (
            db.query(FacultySubjectMapping)
            .filter(
                FacultySubjectMapping.faculty_id ==
                payload.faculty_id,

                FacultySubjectMapping.subject_id ==
                payload.subject_id
            )
            .first()
        )

        if existing:
            return ApiResponse.error(
                "Mapping already exists"
            )

        mapping = FacultySubjectMapping(
            faculty_id=payload.faculty_id,
            subject_id=payload.subject_id
        )

        db.add(mapping)
        db.commit()
        db.refresh(mapping)

        return ApiResponse.success(
            "Mapping created successfully",
            mapping
        )

    from app.utils.metadata import pagination_metadata

    @staticmethod
    def get_all_mappings(
        page: int,
        page_size: int,
        db: Session
    ):

        query = (
            db.query(FacultySubjectMapping)
        )

        total_records = query.count()

        if page == -1:
            mappings = query.all()
        else:
            mappings = (
                query
                .offset((page - 1) * page_size)
                .limit(page_size)
                .all()
            )

        response = []

        for mapping in mappings:

            response.append({
                "id": mapping.id,

                "faculty_id":
                    mapping.faculty_id,

                "faculty_name":
                    mapping.faculty.name
                    if mapping.faculty
                    else None,

                "subject_id":
                    mapping.subject_id,

                "subject_name":
                    mapping.subject.subject_name
                    if mapping.subject
                    else None
            })

        return ApiResponse.success(
            message="Mappings fetched successfully",
            data=response,
            metadata=pagination_metadata(
                page=page,
                page_size=page_size,
                total_records=total_records
            )
        )