"use client";

import { Link2, MoreHorizontal, PenSquare, Trash2 } from "lucide-react";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const studentColumns = [
  {
    id: "actions",
    cell: ({ row }) => {
      console.log(row.original);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-100" align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(original.email)}
            >
              Copy Email Address
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="my-1 bg-blue-500 text-white flex items-center">
              {" "}
              // onclick handle update
              <PenSquare /> Update
            </DropdownMenuItem>
            <DropdownMenuItem className="my-1 bg-red-500 text-white flex items-center">
              {" "}
              // onClick handle delete
              <Trash2 /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
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
    cell: ({ row }) => {
      const sex = row.getValue("sex");
      console.log(sex);

      if (sex === "male") {
        return <p>M</p>;
      }
      if (sex === "female") {
        return <p>F</p>;
      }
      return <p>O</p>;
    },
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
    header: "Attendence Records",
    cell: ({ row }) => {
      return (
        <Link className="text-blue-600 flex items-center gap-1" to="#">
          View
          <Link2 />
        </Link>
      );
    }, // this will be link to a long table with date and true or false can add filter by date bte with date picker (later)
  },
  {
    accessorKey: "scholarship",
    header: "Scholarship(%)",
  },
  {
    accessorKey: "discount",
    header: "Discount(Rs)",
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
