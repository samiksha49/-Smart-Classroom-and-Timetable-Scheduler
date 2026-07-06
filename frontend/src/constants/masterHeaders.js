export const DEPARTMENT_FORM_FIELDS = [
  {
    name: "name",
    label: "Department Name",
    type: "text",
    required: true,
  },
  {
    name: "code",
    label: "Department Code",
    type: "text",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    required: true,
  },
  {
    name: "status",
    label: "Status",
    type: "switch",
    required: true,
    fullWidth: true,
  },
];

export const BATCH_FORM_FIELDS = [
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
    name: "year",
    label: "Year",
    type: "number",
    required: true,
  },
  {
    name: "section",
    label: "Section",
    type: "text",
    required: true,
  },
  {
    name: "strength",
    label: "Strength",
    type: "number",
    required: true,
  },
];

export const FACULTY_FORM_FIELDS = [
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
    name: "name",
    label: "Faculty Name",
    type: "text",
    required: true,
  },
  {
    name: "employee_code",
    label: "Employee Code",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    name: "designation",
    label: "Designation",
    type: "text",
    required: true,
  },
  {
    name: "status",
    label: "Active",
    type: "switch",
    fullWidth: true,
  },
];

export const SUBJECT_FORM_FIELDS = [
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
    filterKey: "department_id",
    filterValue: "department_id",
  },
  {
    name: "faculty_id",
    label: "Faculty",
    type: "select",
    tableName: "faculties",
    labelField: "name",
    valueField: "id",
    required: true,
  },
  {
    name: "subject_code",
    label: "Subject Code",
    type: "text",
    required: true,
  },
  {
    name: "subject_name",
    label: "Subject Name",
    type: "text",
    required: true,
  },
  {
    name: "hours_per_week",
    label: "Hours Per Week",
    type: "number",
    required: true,
  },
  {
    name: "status",
    label: "Active",
    type: "switch",
    fullWidth: true,
  },
];

export const FACULTY_SUBJECT_MAPPING_FORM_FIELDS = [
  {
    name: "faculty_id",
    label: "Faculty",
    type: "select",
    tableName: "faculties",
    labelField: "name",
    valueField: "id",
    required: true,
  },
  {
    name: "subject_id",
    label: "Subject",
    type: "select",
    tableName: "subjects",
    labelField: "subject_name",
    valueField: "id",
    required: true,
  },
];
