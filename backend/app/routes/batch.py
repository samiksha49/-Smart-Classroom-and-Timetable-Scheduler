from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.utils.auth import get_current_user

from app.schemas.batch import (
    BatchCreate,
    BatchUpdate
)

from app.services.batch_service import BatchService

router = APIRouter(
    prefix="/batches",
    tags=["Batches"]
)

# Get all batches
@router.get("/")
def get_all_batches(
    page: int = 1,
    page_size: int = 10,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return BatchService.get_all_batches(
        page,
        page_size,
        db
    )

# Create a new batch
@router.post("/")
def create_batch(
    payload: BatchCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return BatchService.create_batch(
        payload,
        db
    )

# Get batch by id
@router.get("/{batch_id}")
def get_batch_by_id(
    batch_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return BatchService.get_batch_by_id(
        batch_id,
        db
    )

# Update batch
@router.put("/{batch_id}")
def update_batch(
    batch_id: int,
    payload: BatchUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return BatchService.update_batch(
        batch_id,
        payload,
        db
    )