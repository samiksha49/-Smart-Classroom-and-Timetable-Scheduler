export const DepartmentTableColumns = [
  {
    accessor: "serial",
    title: "S.No",
    type: "serial",
  },
  {
    accessor: "name",
    title: "Department Name",
    type: "text",
  },
  {
    accessor: "code",
    title: "Code",
    type: "text",
  },
  {
    accessor: "description",
    title: "Description",
    type: "text",
  },
  {
    accessor: "status",
    title: "Status",
    type: "badge",
    badges: {
      true: {
        label: "ACTIVE",
        color: "green",
      },
      false: {
        label: "INACTIVE",
        color: "red",
      },
    },
  },
];

export const BatchTableColumns = [
  {
    accessor: "serial",
    title: "S.No",
    type: "serial",
  },
  {
    accessor: "department_name",
    title: "Department",
    type: "text",
  },
  {
    accessor: "year",
    title: "Year",
    type: "number",
  },
  {
    accessor: "section",
    title: "Section",
    type: "text",
  },
  {
    accessor: "strength",
    title: "Strength",
    type: "number",
  },
];

export const FacultyTableColumns = [
  {
    accessor: "serial",
    title: "S.No",
    type: "serial",
  },
  {
    accessor: "name",
    title: "Faculty Name",
    type: "text",
  },
  {
    accessor: "employee_code",
    title: "Employee Code",
    type: "text",
  },
  {
    accessor: "department_name",
    title: "Department",
    type: "text",
  },
  {
    accessor: "designation",
    title: "Designation",
    type: "text",
  },
  {
    accessor: "email",
    title: "Email",
    type: "text",
  },
  {
    accessor: "status",
    title: "Status",
    type: "badge",
    badges: {
      true: {
        label: "ACTIVE",
        color: "green",
      },
      false: {
        label: "INACTIVE",
        color: "red",
      },
    },
  },
];

export const SubjectTableColumns = [
  {
    accessor: "serial",
    title: "S.No",
    type: "serial",
  },
  {
    accessor: "subject_code",
    title: "Code",
    type: "text",
  },
  {
    accessor: "subject_name",
    title: "Subject Name",
    type: "text",
  },
  {
    accessor: "department_name",
    title: "Department",
    type: "text",
  },
  {
    accessor: "faculty_name",
    title: "Faculty",
    type: "text",
  },
  {
    accessor: "hours_per_week",
    title: "Hours / Week",
    type: "number",
  },
  {
    accessor: "status",
    title: "Status",
    type: "badge",
    badges: {
      true: {
        label: "ACTIVE",
        color: "green",
      },
      false: {
        label: "INACTIVE",
        color: "red",
      },
    },
  },
];

export const TIMETABLE_FORM_FIELDS = [
  {
    name: "department_id",
    label: "Department",
    type: "select",
    tableName: "departments",
    labelField: "name",
    valueField: "id",
    required: true,
  },
  {
    name: "batch_id",
    label: "Batch",
    type: "select",
    tableName: "batches",
    labelField: "section",
    valueField: "id",
    required: true,
  },
];

export const TimetableTableColumns = [
  {
    accessor: "serial",
    title: "S.No",
    type: "serial",
  },
  {
    accessor: "day",
    title: "Day",
    type: "text",
  },
  {
    accessor: "period",
    title: "Period",
    type: "number",
  },
  {
    accessor: "subject_name",
    title: "Subject",
    type: "text",
  },
  {
    accessor: "faculty_name",
    title: "Faculty",
    type: "text",
  },
  {
    accessor: "room_number",
    title: "Room",
    type: "text",
  },
];

export const FACULTY_SUBJECT_MAPPING_COLUMNS = [
  {
    accessor: "serial_no",
    title: "S.No",
    type: "serial",
  },
  {
    accessor: "faculty_name",
    title: "Faculty",
    type: "text",
  },
  {
    accessor: "subject_name",
    title: "Subject",
    type: "text",
  },
];
