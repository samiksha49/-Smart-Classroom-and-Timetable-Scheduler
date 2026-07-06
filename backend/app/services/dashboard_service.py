from sqlalchemy.orm import Session

from app.models.department import Department
from app.models.batch import Batch
from app.models.faculty import Faculty
from app.models.subject import Subject
from app.models.timetable import Timetable

from app.utils.response import ApiResponse


class DashboardService:

    @staticmethod
    def get_dashboard_stats(
        db: Session
    ):

        stats = {
            "departments": db.query(Department).count(),
            "batches": db.query(Batch).count(),
            "faculties": db.query(Faculty).count(),
            "subjects": db.query(Subject).count(),
            "timetables": db.query(Timetable).count()
        }

        return ApiResponse.success(
            message="Dashboard stats fetched successfully",
            data=stats
        )