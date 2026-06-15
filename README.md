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

### USER

🔸Admin

🔸Faculty

🔸Student

### MODULES

🔸Login

🔸Faculty Management

🔸 Subject Management

🔸 Timetable Generation

🔸 Conflict Detection

🔸 Timetable View

## USE CASE DIAGRAM

This diagram illustrates the system’s overall use case structure.

![Use Case Diagram](./file_0000000047a0720ba47f8fcd0bf30db7.png)

## TABLE LIST

The following tables are used in the system database design:

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

This diagram represents the database structure and relationships between entities.

![ER Diagram](./file_00000000d748720bbe92bd0fd23f3205.png)
