from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.utils.auth import get_current_user

from app.schemas.user import (
    RegisterRequest,
    LoginRequest
)

from app.services.auth_service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/register")
def register(
    payload: RegisterRequest,
    db: Session = Depends(get_db)
):
    return AuthService.register_user(
        payload,
        db
    )

@router.post("/login")
def login(
    payload: LoginRequest,
    db: Session = Depends(get_db)
):
    return AuthService.login_user(
        payload,
        db
    )

@router.get("/me")
def get_me(
    current_user=Depends(get_current_user)
):
    return current_user