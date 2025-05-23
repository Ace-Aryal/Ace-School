"use client";

// import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const studentColumns = [
  {
    accessorKey: "grade",
    header: "Grade",
  },
  {
    accessorKey: "rollNo",
    header: "Roll",
  },
  {
    accessorKey: "studentName",
    header: "Name",
  },
  {
    accessorKey: "DOB",
    header: "DOB",
  },
  {
    accessorKey: "stream",
    header: "Stream",
  },
  {
    accessorKey: "phoneNumber",
    header: "Contact No",
  },
  {
    accessorKey: "email",
    header: "Email", // emailRequired
  },
  {
    accessorKey: "sex",
    header: "Sex",
  },
  {
    accessorKey: "guardianName",
    header: "Guardian",
  },
  {
    accessorKey: "guardianPhone",
    header: "Contact No",
  },
  {
    accessorKey: "relation",
    header: "Relation",
  },
  {
    accessorKey: "medicalInfo",
    header: "Medical Info",
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
  },
  {
    accessorKey: "attendance",
    header: "Attendance",
  },
  {
    accessorKey: "attendanceRecord",
    header: "Attendence Records", // this will be link to a long table with date and true or false can add filter by date bte with date picker (later)
  },
  {
    accessorKey: "scholarship",
    header: "Scholarship",
  },
  {
    accessorKey: "discount",
    header: "Discount",
  },
];

export const staffColumns = [
  {
    accessorKey: "staffId",
    header: "Staff ID", // staffIdRequired
  },
  {
    accessorKey: "fullName",
    header: "Full Name", // fullNameRequired
  },
  {
    accessorKey: "email",
    header: "Email", // emailRequired
  },
  {
    accessorKey: "phoneNumber",
    header: "Contact No.", // phoneNumberRequired
  },
  {
    accessorKey: "DOB",
    header: "DOB", // DOBRequired
  },
  {
    accessorKey: "gender",
    header: "Gender", // genderRequired
  },
  {
    accessorKey: "address",
    header: "Address", // addressRequired
  },
  {
    accessorKey: "joiningDate",
    header: "Joining Date", // joiningDateRequired
  },
  {
    accessorKey: "role",
    header: "Role", // roleRequired
  },
  {
    accessorKey: "status",
    header: "Status", // statusRequired (e.g., Active, On Leave, Resigned)
  },
  {
    accessorKey: "attendance",
    header: "Attendance", // attendance
  },
  {
    accessorKey: "attendanceRecord",
    header: "Attendance Records", // attendanceRecordRequired (Link to detailed table)
  },
];
export const teacherColumns = [
  {
    accessorKey: "teacherId",
    header: "Teacher ID", // teacherIdRequired
  },
  {
    accessorKey: "teacherName",
    header: "Teacher Name", // teacherNameRequired
  },
  {
    accessorKey: "email",
    header: "Email", // emailRequired
  },
  {
    accessorKey: "teacherPhone",
    header: "Contact No.", // teacherPhoneRequired
  },
  {
    accessorKey: "sex",
    header: "Sex", // sexRequired (Using 'sex' as per your studentColumns)
  },
  {
    accessorKey: "DOB",
    header: "DOB", // DOBRequired
  },
  {
    accessorKey: "address",
    header: "Address", // addressRequired
  },
  {
    accessorKey: "qualification",
    header: "Qualification", // qualificationRequired
  },
  {
    accessorKey: "jobType",
    header: "Job Type", // jobTypeRequired (e.g., Full-time, Part-time)
  },
  {
    accessorKey: "joiningDate",
    header: "Joining Date", // joiningDateRequired
  },
  {
    accessorKey: "role",
    header: "Role", // role (e.g., Teacher, Head of Department)
  },
  {
    accessorKey: "status",
    header: "Status", // statusRequired (e.g., Active, On Leave)
  },
  {
    accessorKey: "subjectsTaught",
    header: "Subjects Taught", // subjectsTaughtRequired (Could be an array or comma-separated string)
  },
  {
    accessorKey: "classes",
    header: "Classes", // classesRequired (e.g., Grade 10, Grade 12 Science)
  },
  {
    accessorKey: "attendance",
    header: "Attendance", // attendance
  },
  {
    accessorKey: "attendanceRecord",
    header: "Attendance Records", // attendanceRecordRequired (Link to detailed table)
  },
];
