from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.database.connection import get_db

router = APIRouter(
    prefix="/health",
    tags=["Health"]
)


@router.get("/")
def health_check(
    db: Session = Depends(get_db)
):
    try:
        # Check DB Connection
        db.execute(text("SELECT 1"))

        return {
            "status": True,
            "message": "Application is healthy",
            "data": {
                "api": "UP",
                "database": "CONNECTED"
            }
        }

    except Exception as e:
        return {
            "status": False,
            "message": "Application is unhealthy",
            "data": {
                "api": "UP",
                "database": "DISCONNECTED",
                "error": str(e)
            }
        }