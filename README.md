# SMART CLASSROOM & TIMETABLE SCHEDULER

## PROJECT OVERVIEW

🔸The Smart Classroom & Timetable Scheduler is a web-based system developed to simplify timetable management in educational institutions. It automates the process of scheduling classes, assigning faculty members, and managing subjects across multiple departments. The system helps reduce manual effort, improve scheduling accuracy, and provide easy timetable access for both students and faculty.

## PROBLEM STATEMENT

🔸Creating timetables manually is a time-consuming task in educational institutions. It may lead to faculty conflicts, classroom allocation issues, and scheduling errors. This project aims to automate timetable generation and efficiently manage faculty and classroom allocation. The system also detects conflicts and helps optimize resource utilization.

## OBJECTIVE

🔸 To automate the timetable generation process.

🔸 To avoid faculty scheduling conflicts.

🔸 To efficiently allocate classrooms and faculty members.

🔸 To reduce manual effort in timetable management.

🔸 To optimize the utilization of available resources.

## USER AND MODULE IDENTIFICATION

### User

🔸Admin

🔸Faculty

🔸Student

### Modules

🔸Login

🔸Faculty Management

🔸 Subject Management

🔸 Timetable Generation

🔸 Conflict Detection

🔸 Timetable View

## USE CASE DIAGRAM

🔸This diagram illustrates the system’s overall use case structure.

![Use Case Diagram](./file_0000000047a0720ba47f8fcd0bf30db7.png)

## TABLE LIST

🔸The following tables are used in the system database design:

| S.No | Table Name            | Purpose |
|------|-----------------------|---------|
| 1    | Department            | Stores department details |
| 2    | Faculty               | Stores faculty information |
| 3    | Subject               | Stores subject details |
| 4    | Faculty_Subject       | Maps faculty with subjects |
| 5    | Classroom             | Stores classroom details |
| 6    | Timetable             | Manages class schedule |
| 7    | Faculty_Availability  | Tracks faculty availability |
| 8    | Leave_Request         | Manages leave requests |
| 9    | Training_Course       | Stores training courses |
| 10   | Conflict_Log          | Records scheduling conflicts |

##  ER DIAGRAM

🔸This diagram represents the database structure and relationships between entities.

![ER Diagram](./file_00000000d748720bbe92bd0fd23f3205.png)
## SQL SCHEMA

### Department Table

```sql
CREATE TABLE department (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(100)
);
```

### Faculty Table

```sql
CREATE TABLE faculty (
    faculty_id INT PRIMARY KEY,
    faculty_name VARCHAR(100),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(department_id)
);
```

### Subject Table

```sql
CREATE TABLE subject (
    subject_id INT PRIMARY KEY,
    subject_name VARCHAR(100),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(department_id)
);
```

### Classroom Table

```sql
CREATE TABLE classroom (
    classroom_id INT PRIMARY KEY,
    room_number VARCHAR(20),
    capacity INT
);
```

### Timetable Table

```sql
CREATE TABLE timetable (
    timetable_id INT PRIMARY KEY,
    faculty_id INT,
    subject_id INT,
    classroom_id INT,
    day VARCHAR(20),
    period INT,
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id),
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id),
    FOREIGN KEY (classroom_id) REFERENCES classroom(classroom_id)
);
```


## PAGE LAYOUT

+--------------------------------------------------+
|              SMART CLASSROOM                     |
|          & TIMETABLE SCHEDULER                   |
+--------------------------------------------------+

                 Username
            [______________]

                 Password
            [______________]

              [ LOGIN ]

+--------------------------------------------------+


## Admin Dashboard

+--------------------------------------------------+
|                    DASHBOARD                     |
+--------------------------------------------------+

 Total Faculty     : 26
 Total Subjects    : 7
 Total Departments : 7

 [ Manage Faculty ]

 [ Manage Subjects ]

 [ Generate Timetable ]

 [ View Timetable ]

+--------------------------------------------------+


## Timetable Page

+--------------------------------------------------+
|                VIEW TIMETABLE                    |
+--------------------------------------------------+

 Department : [ CSE ▼ ]

 Semester   : [ I ▼ ]

+--------------------------------------------------+
| Day      | P1 | P2 | P3 | P4 | P5 | P6 | P7 |
+--------------------------------------------------+
| Monday   |    |    |    |    |    |    |    |
| Tuesday  |    |    |    |    |    |    |    |
| Wednesday|    |    |    |    |    |    |    |
| Thursday |    |    |    |    |    |    |    |
| Friday   |    |    |    |    |    |    |    |
+--------------------------------------------------+

          [ Download Timetable ]

+--------------------------------------------------+


## LOGIN & DASHBOARD UI DESIGN

🔸The Login Page allows Admin, Faculty, and Students to securely access the system using their credentials.

🔸The Dashboard provides quick access to key features such as Faculty Management, Subject Management, Timetable Generation, and Timetable View. It also displays summary information including the total number of faculties, subjects, and departments.


## NAVIGATION & FORM DESIGN

🔸The system includes a navigation menu for accessing different modules such as Faculty Management, Subject Management, Timetable Generation, and Timetable View. Forms are designed to collect and manage faculty and subject information efficiently.



## DESIGN REVIEW

🔸The project design was reviewed based on the planned requirements. The UI layouts, database structure, and system workflow were verified before starting the development phase.

### Designs Reviewed

- Use Case Diagram
- ER Diagram
- SQL Schema
- Login Page Design
- Dashboard Design
- Navigation & Form Design


## FRONTEND ENVIRONMENT SETUP

🔸The React project was successfully created and configured for frontend development. The project structure was initialized and is ready for implementing the user interface.

### React Project Structure

src/
├── components/

├── pages/

├── assets/

├── App.js

└── index.js

## LOGIN PAGE DEVELOPMENT

🔸The login page was developed to provide secure access for Admin, Faculty, and Students. Users can enter their credentials and access the system based on their role. 

## USER REGISTRATION MODULE

🔸The user registration module allows the administrator to add faculty and student accounts into the system for timetable access and management.



## DASHBOARD DEVELOPMENT

🔸The dashboard was developed to provide a centralized view of the system. It allows users to access faculty management, subject management, timetable generation, and timetable viewing features from a single interface.



## CRUD FORM DEVELOPMENT

🔸The CRUD forms were developed to manage faculty, subjects, departments, and classrooms efficiently. Users can create, view, update, and delete records through user-friendly forms.



## TABLE & SEARCH FEATURES

🔸The table and search features were implemented to display and retrieve faculty, subjects, and timetable records efficiently. Users can search records quickly and view the required information in a structured table format.



## FRONTEND TESTING

🔸The frontend modules were tested to ensure that all pages, forms, buttons, and navigation links work correctly. The user interface was verified for smooth functionality and proper user interaction.


## BACKEND SETUP

🔸The backend environment was configured for the Smart Classroom & Timetable Scheduler project. The project structure was created to manage APIs, database connectivity, and business logic efficiently.


## DATABASE CONNECTIVITY

🔸The application was successfully connected with the database to store and retrieve information such as faculty details, subjects, classrooms, and timetable records. The connection was established to ensure efficient data management within the system.



## ENTITY CLASSES

🔸Entity classes were created to represent the database tables in the application. These classes help map the data between the application and the database efficiently.

### Entity Classes

- Department
- Faculty
- Subject
- Classroom
- Timetable


## REPOSITORY CLASSES

🔸Repository classes were created to perform database operations such as storing, retrieving, updating, and deleting records. These classes act as an interface between the application and the database.

### Repository Classes

- DepartmentRepository
- FacultyRepository
- SubjectRepository
- ClassroomRepository
- TimetableRepository



## REST API DEVELOPMENT

🔸REST APIs were developed to perform Create, Read, Update, and Delete (CRUD) operations for faculty, subjects, classrooms, and timetables. These APIs enable seamless communication between the frontend and backend.


## AUTHENTICATION MODULE

🔸The authentication module was developed to validate user credentials and provide secure access to the system. The Login API verifies the username and password before granting access to the application.


## BACKEND BUSINESS LOGIC

🔸The service layer was developed to handle the core business logic of the application. It processes faculty allocation, subject management, timetable generation, and classroom scheduling before interacting with the database.



## API TESTING USING POSTMAN

🔸The developed REST APIs were tested using Postman to verify their functionality and accuracy. All API endpoints were validated to ensure proper request handling and successful responses.



## FRONTEND & BACKEND INTEGRATION

🔸The frontend was successfully integrated with the backend APIs. The application was tested to ensure smooth data flow between the user interface and the database, providing a fully functional system.



## FINAL TESTING & BUG FIXING

🔸The complete application was tested to verify the functionality of all modules. Minor issues identified during testing were fixed to ensure the system performs reliably and all features work as expected.




