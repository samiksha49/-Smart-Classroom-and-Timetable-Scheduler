import {
  IconLayoutDashboard,
  IconUsers,
  IconBuilding,
  IconSchool,
  IconBook,
  IconCalendarEvent,
  // IconChalkboard,
  IconMap2,
} from "@tabler/icons-react";

export const SIDEBAR_CONFIG = {
  ADMIN: [
    {
      label: "Dashboard",
      path: "/",
      icon: IconLayoutDashboard,
    },

    {
      label: "Master",
      icon: IconUsers,
      children: [
        {
          label: "Departments",
          path: "/master/departments",
          icon: IconBuilding,
        },

        {
          label: "Batches",
          path: "/master/batches",
          icon: IconSchool,
        },

        {
          label: "Faculties",
          path: "/master/faculties",
          icon: IconUsers,
        },

        {
          label: "Subjects",
          path: "/master/subjects",
          icon: IconBook,
        },
        {
          label: "Faculty Subject Mapping",
          path: "/master/faculty-subject-mapping",
          icon: IconMap2,
        },
      ],
    },

    {
      label: "Timetable",
      path: "/timetable",
      icon: IconCalendarEvent,
    },

    // {
    //   label: "Classroom Schedule",
    //   path: "/classroom-schedule",
    //   icon: IconChalkboard,
    // },
  ],

  FACULTY: [
    {
      label: "Dashboard",
      path: "/",
      icon: IconLayoutDashboard,
    },

    {
      label: "My Timetable",
      path: "/my-timetable",
      icon: IconCalendarEvent,
    },
  ],
};
