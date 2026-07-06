from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.utils.response import ApiResponse

from app.models.user import User
from app.utils.security import (
    hash_password,
    verify_password,
    create_access_token
)

class AuthService:

    @staticmethod
    def register_user(payload, db: Session):

        existing_user = (
            db.query(User)
            .filter(User.email == payload.email)
            .first()
        )

        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Email already exists"
            )

        user = User(
            name=payload.name,
            email=payload.email,
            password=hash_password(payload.password),
            role=payload.role
        )

        db.add(user)
        db.commit()
        db.refresh(user)

        return {
            "message": "User registered successfully"
        }

    @staticmethod
    def login_user(payload, db: Session):

        user = (
            db.query(User)
            .filter(User.email == payload.email)
            .first()
        )

        if not user:
            return ApiResponse.error(
                message="User not found",
                )

        if not verify_password(
            payload.password,
            str(user.password)
        ):
            return ApiResponse.error(
                message="Invalid credentials",
            )

        token = create_access_token(
            {
                "sub": str(user.id),
                "email": user.email,
                "role": user.role
            }
        )

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role
            }
        }