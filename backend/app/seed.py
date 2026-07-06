import random

from app.database.connection import (
    SessionLocal,
    Base,
    engine
)

from app.models.user import User
from app.models.department import Department
from app.models.batch import Batch
from app.models.faculty import Faculty
from app.models.subject import Subject
from app.models.faculty_subject_mapping import (
    FacultySubjectMapping
)
from app.models.timetable import Timetable

from app.utils.security import hash_password


# Create tables
Base.metadata.create_all(bind=engine)


def seed_database():

    db = SessionLocal()

    try:

        # ======================================
        # CLEAR EXISTING DATA
        # ======================================

        db.query(Timetable).delete()
        db.query(FacultySubjectMapping).delete()
        db.query(Subject).delete()
        db.query(Faculty).delete()
        db.query(Batch).delete()
        db.query(Department).delete()
        db.query(User).delete()

        db.commit()

        print("✅ Existing data cleared")

        # ======================================
        # ADMIN USER
        # ======================================

        admin = User(
            name="Admin",
            email="admin@gmail.com",
            password=hash_password(
                "admin123"
            ),
            role="ADMIN"
        )

        db.add(admin)
        db.commit()

        print("✅ Admin created")

        # ======================================
        # DEPARTMENTS
        # ======================================

        departments_data = [

            (
                "Computer Science Engineering",
                "CSE"
            ),

            (
                "Information Technology",
                "IT"
            ),

            (
                "Artificial Intelligence & Machine Learning",
                "AIML"
            ),

            (
                "Electronics and Communication Engineering",
                "ECE"
            ),

            (
                "Electrical and Electronics Engineering",
                "EEE"
            ),

            (
                "Mechanical Engineering",
                "MECH"
            )

        ]

        departments = []

        for name, code in departments_data:

            department = Department(
                name=name,
                code=code,
                description=f"{name} Department",
                status=True
            )

            db.add(department)
            db.flush()

            departments.append(department)

        db.commit()

        print("✅ Departments seeded")

        # ======================================
        # BATCHES
        # ONLY YEAR 1 SECTION A
        # ======================================

        batches = []

        for department in departments:

            batch = Batch(
                department_id=department.id,
                year=1,
                section="A",
                strength=60,
                status=True
            )

            db.add(batch)
            db.flush()

            batches.append(batch)

        db.commit()

        print("✅ Batches seeded")

        # ======================================
        # FACULTIES
        # ======================================

        faculty_names = [

            "Dr Kumar",
            "Mrs Priya",
            "Mr Rahul",
            "Dr Deepika",
            "Mr Ravi",
            "Mrs Anitha",
            "Mr Arjun",
            "Dr Suresh",
            "Mrs Keerthana",
            "Mr Dinesh",
            "Dr Vignesh",
            "Mrs Divya",
            "Mr Karthik",
            "Dr Lakshmi",
            "Mr Naveen",
            "Mrs Janani",
            "Mr Ashwin",
            "Dr Meena",
            "Mrs Nandhini",
            "Mr Prakash"

        ]

        faculties = []

        for index, name in enumerate(
            faculty_names
        ):

            faculty = Faculty(

                department_id=random.choice(
                    departments
                ).id,

                name=name,

                employee_code=(
                    f"FAC{index + 1:03}"
                ),

                email=(
                    f"faculty{index + 1}"
                    "@college.com"
                ),

                designation=(
                    "Assistant Professor"
                ),

                status=True
            )

            db.add(faculty)
            db.flush()

            faculties.append(faculty)

        db.commit()

        print("✅ Faculties seeded")

        # ======================================
        # COMMON FIRST YEAR SUBJECTS
        # SAME FOR ALL DEPARTMENTS
        # ======================================

        subjects_data = [
            {
                "code": "MA25C01",
                "name": "Applied Calculus",
                "hours": 5,   # increased from 4
                "is_lab": False
            },

            {
                "code": "EN25C01",
                "name": "English Essentials - I",
                "hours": 4,   # increased from 3
                "is_lab": False
            },

            {
                "code": "UC25H01",
                "name": "Heritage of Tamils",
                "hours": 2,
                "is_lab": False
            },

            {
                "code": "PH25C01",
                "name": "Applied Physics - I",
                "hours": 4,
                "is_lab": False
            },

            {
                "code": "CY25C01",
                "name": "Applied Chemistry - I",
                "hours": 4,
                "is_lab": False
            },

            {
                "code": "CS25C01",
                "name": "Computer Programming: C",
                "hours": 5,
                "is_lab": False
            },

            {
                "code": "CS25C03",
                "name": "Essentials of Computing",
                "hours": 4,
                "is_lab": False
            },

            {
                "code": "PH25L01",
                "name": "Physics Laboratory",
                "hours": 2,
                "is_lab": True,
                "lab_sessions": 1
            },

            {
                "code": "CY25L01",
                "name": "Chemistry Laboratory",
                "hours": 2,
                "is_lab": True,
                "lab_sessions": 1
            },

            {
                "code": "CS25L01",
                "name": "Programming Laboratory",
                "hours": 2,
                "is_lab": True,
                "lab_sessions": 1
            }
        ]
        
        # ======================================
        # SUBJECTS + MAPPINGS
        # EVERY SUBJECT HAS 2 STAFFS
        # ======================================

        for batch in batches:

            for item in subjects_data:

                primary_faculty = (
                    random.choice(
                        faculties
                    )
                )

                secondary_faculty = (
                    random.choice(
                        [
                            faculty
                            for faculty in faculties
                            if faculty.id !=
                            primary_faculty.id
                        ]
                    )
                )

                subject = Subject(

                    department_id=
                    batch.department_id,

                    batch_id=batch.id,

                    faculty_id=
                    primary_faculty.id,

                    subject_code=(
                        f"{batch.department.code}_"
                        f"{item['code']}"
                    ),

                    subject_name=
                    item["name"],

                    hours_per_week=
                    item["hours"],

                    is_lab=item["is_lab"],

                    lab_sessions_per_week=
                    item.get(
                        "lab_sessions",
                        0
                    ),

                    status=True
                )

                db.add(subject)
                db.flush()

                # Primary Faculty Mapping

                db.add(
                    FacultySubjectMapping(
                        faculty_id=
                        primary_faculty.id,

                        subject_id=
                        subject.id
                    )
                )

                # Secondary Faculty Mapping

                db.add(
                    FacultySubjectMapping(
                        faculty_id=
                        secondary_faculty.id,

                        subject_id=
                        subject.id
                    )
                )

        db.commit()

        print(
            "✅ Subjects seeded"
        )

        print(
            "✅ Faculty mappings seeded"
        )

        print(
            "\n🎉 Database seeded successfully"
        )

        print(
            "\nLogin Credentials"
        )

        print(
            "Email    : admin@gmail.com"
        )

        print(
            "Password : admin123"
        )

    except Exception as e:

        db.rollback()

        print(
            f"❌ Error : {str(e)}"
        )

    finally:

        db.close()


if __name__ == "__main__":
    seed_database()