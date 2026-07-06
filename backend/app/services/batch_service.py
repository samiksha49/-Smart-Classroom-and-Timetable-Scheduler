from sqlalchemy.orm import Session

from app.models.batch import Batch
from app.models.department import Department
from app.schemas.batch import (
    BatchCreate,
    BatchUpdate
)
from app.utils.response import ApiResponse
from app.utils.metadata import pagination_metadata

class BatchService:

    # Create batch
    @staticmethod
    def create_batch(
        payload: BatchCreate,
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
                message="Department not found",
                status_code=404
            )

        existing_batch = (
            db.query(Batch)
            .filter(
                Batch.department_id == payload.department_id,
                Batch.year == payload.year,
                Batch.section == payload.section
            )
            .first()
        )

        if existing_batch:
            return ApiResponse.error(
                message="Batch already exists",
                status_code=400
            )

        batch = Batch(
            department_id=payload.department_id,
            year=payload.year,
            section=payload.section,
            strength=payload.strength
        )

        db.add(batch)
        db.commit()
        db.refresh(batch)

        return ApiResponse.success(
            message="Batch created successfully",
            data=batch
        )
    

    # Get all batches
    @staticmethod
    def get_all_batches(
        page: int,
        page_size: int,
        db: Session
    ):

        query = db.query(Batch)

        total_records = query.count()

        if page == -1:
            batches = query.all()
        else:
            batches = (
                query
                .offset((page - 1) * page_size)
                .limit(page_size)
                .all()
            )

        response = []

        for batch in batches:

            response.append({
                "id": batch.id,

                "department_id":
                    batch.department_id,

                "department_name":
                    batch.department.name
                    if batch.department
                    else None,

                "year":
                    batch.year,

                "section":
                    batch.section,

                "strength":
                    batch.strength,

                "status":
                    batch.status,

                "display_name": (
                    f"{batch.department.name} "
                    f"- Year {batch.year} "
                    f"- Section {batch.section}"
                )
            })

        return ApiResponse.success(
            message="Batches fetched successfully",
            data=response,
            metadata=pagination_metadata(
                page=page,
                page_size=page_size,
                total_records=total_records
            )
        )

    # Get batch by id
    @staticmethod
    def get_batch_by_id(
        batch_id: int,
        db: Session
    ):

        batch = (
            db.query(Batch)
            .filter(
                Batch.id == batch_id
            )
            .first()
        )

        if not batch:
            return ApiResponse.error(
                message="Batch not found",
                status_code=404
            )

        return ApiResponse.success(
            message="Batch fetched successfully",
            data=batch
        )
    

    # Update batch
    @staticmethod
    def update_batch(
        batch_id: int,
        payload: BatchUpdate,
        db: Session
    ):

        batch = (
            db.query(Batch)
            .filter(
                Batch.id == batch_id
            )
            .first()
        )

        if not batch:
            return ApiResponse.error(
                message="Batch not found",
                status_code=404
            )

        update_data = payload.model_dump(
            exclude_unset=True
        )

        for key, value in update_data.items():
            setattr(
                batch,
                key,
                value
            )

        db.commit()
        db.refresh(batch)

        return ApiResponse.success(
            message="Batch updated successfully",
            data=batch
        )