"use client";

import {
  ArrowUpDown,
  Link2,
  MoreHorizontal,
  PenSquare,
  Trash2,
} from "lucide-react";
import { Link, NavLink } from "react-router";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Spinner from "@/components/Atoms/Spinner";
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
import { Navigate } from "react-router";
import { capitalize } from "@/utils/capitalize";
import { handleDocumentDelete } from "@/utils/handleDocumentDelete";
import { setLoading } from "@/features/loadingStateTrackerSlice";

export const studentColumns = [
  {
    id: "actions",
    cell: ({ row }) => {
      const { email, $collectionId, $id, loading, dispatch, refetch } =
        row.original;
      const originalData = JSON.parse(JSON.stringify(row.original));
      delete originalData.dispatch;
      delete originalData.refetch;
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
            <NavLink
              className="my-1"
              to="/view-students/update-student"
              state={{ originalData }}
            >
              <DropdownMenuItem className="bg-blue-100 hover:bg-blue-200 text-blue-600 gap-1 justify-center flex items-center">
                <PenSquare /> <p>Update</p>
              </DropdownMenuItem>
            </NavLink>{" "}
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
              }}
              onClick={async () => {
                console.log(row.original);
                dispatch(setLoading());
                handleDocumentDelete({
                  documentId: $id,
                  collectionId: $collectionId,
                  email,
                  refetch,
                });
              }}
              className="my-1 bg-red-100 hover:bg-red-200 text-red-600 gap-1 justify-center flex items-center"
            >
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <Trash2 /> <span>Delete</span>
                </>
              )}
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "attendance",
    header: "Attendance",
    cell: ({ row }) => {
      console.log(row.original);
      const attendance = row
        .getValue("attendance")
        ?.toLowerCase()
        .trim()
        .replaceAll(" ", "");
      const classNames =
        attendance === "present"
          ? "text-green-600"
          : attendance === "absent"
          ? "text-red-600"
          : attendance === "onleave"
          ? "text-blue-600"
          : "text-gray-700";
      const FormattedAttendence = row.getValue("attendance");
      return (
        <div>
          <span className={classNames}>{FormattedAttendence}</span>
        </div>
      ); // attendanceRecordRequired (Link to detailed table)
    },
  },
  {
    accessorKey: "attendanceRecord",
    header: "Attendence Records",
    cell: ({ row }) => {
      const attendanceRecord = JSON.parse(row.original.attendanceRecord);
      const { studentName, rollNo, grade } = row.original;
      return (
        <NavLink
          state={{
            attendanceRecord: attendanceRecord,
            personInfo: {
              name: studentName,
              roll: rollNo,
              grade,
            },
          }}
          className="text-blue-600 flex items-center gap-1  w-full justify-center "
          to="/attendance/view-individual-records"
        >
          View
          <Link2 />
        </NavLink>
      );
    }, // this will be link to a long table with date and true or false can add filter by date bte with date picker (later)
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
    accessorKey: "DOB",
    header: "DOB",
  },
  {
    accessorKey: "stream",
    header: "Stream",
  },
  {
    accessorKey: "sex",
    header: "Sex",
    cell: ({ row }) => {
      const sex = row.getValue("sex");

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
    id: "actions",
    cell: ({ row }) => {
      const { email, $collectionId, $id, loading, dispatch, refetch } =
        row.original;
      const originalData = JSON.parse(JSON.stringify(row.original));
      delete originalData.dispatch;
      delete originalData.refetch;
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
            <NavLink
              className="my-1r"
              to="/view-staffs/update-staff"
              state={{ originalData }}
            >
              <DropdownMenuItem className="my-1 bg-blue-100 hover:bg-blue-200 text-blue-600 justify-center gap-1  flex items-center">
                {" "}
                <PenSquare /> <p>Update</p>
              </DropdownMenuItem>
            </NavLink>{" "}
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
              }}
              onClick={async () => {
                console.log(row.original);
                dispatch(setLoading());
                handleDocumentDelete({
                  documentId: $id,
                  collectionId: $collectionId,
                  email,
                  refetch,
                });
              }}
              className="my-1 bg-red-100 hover:bg-red-200 text-red-600  justify-center gap-1 flex items-center"
            >
              {" "}
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <Trash2 /> <span>Delete</span>
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "staffId",
    header: "Staff ID", // staffIdRequired
  },
  {
    accessorKey: "fullName",
    header: "Full Name", // fullNameRequired
  },
  {
    accessorKey: "attendance",
    header: "Attendance", // attendance
    cell: ({ row }) => {
      const attendance = row.getValue("attendance");
      return (
        <div>
          {attendance ? (
            <span className="text-green-500"> Present </span>
          ) : (
            <span className="text-red-500">Absent</span>
          )}
        </div>
      ); // attendanceRecordRequired (Link to detailed table)
    },
  },
  {
    accessorKey: "attendanceRecord",
    header: "Attendance Records",
    cell: ({ row }) => {
      const attendanceRecord = JSON.parse(row.original.attendanceRecord);
      const { fullName, staffId } = row.original;
      return (
        <NavLink
          state={{
            attendanceRecord: attendanceRecord,
            personInfo: {
              name: fullName,
              id: staffId,
            },
          }}
          className="text-blue-600 flex items-center gap-1  w-full justify-center "
          to="/attendance/view-individual-records"
        >
          View
          <Link2 />
        </NavLink>
      );
    },
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
    cell: ({ row }) => {
      const sex = row.getValue("gender");

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
];
export const teacherColumns = [
  {
    id: "actions",
    cell: ({ row }) => {
      const { email, $collectionId, $id, loading, dispatch, refetch } =
        row.original;
      const originalData = JSON.parse(JSON.stringify(row.original));
      delete originalData.dispatch;
      delete originalData.refetch;
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
            <NavLink
              className="my-1   text-white"
              to="/view-teachers/update-teacher"
              state={{ originalData }}
            >
              <DropdownMenuItem className=" flex items-center justify-center gap-1  bg-blue-100 hover:bg-blue-200 text-blue-600">
                {" "}
                <PenSquare /> <p>Update</p>
              </DropdownMenuItem>
            </NavLink>{" "}
            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
              }}
              onClick={async () => {
                console.log(row.original);
                dispatch(setLoading());
                handleDocumentDelete({
                  documentId: $id,
                  collectionId: $collectionId,
                  email,
                  refetch,
                });
              }}
              className="my-1 w-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center gap-1 justify-center"
            >
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <Trash2 /> <span>Delete</span>
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "teacherId",
    header: "Teacher ID", // teacherIdRequired
  },
  {
    accessorKey: "teacherName",
    header: "Teacher Name", // teacherNameRequired
  },
  {
    accessorKey: "attendance",
    header: "Attendance", // attendance
    cell: ({ row }) => {
      const attendance = row.getValue("attendance");
      return (
        <div>
          {attendance ? (
            <span className="text-green-500"> Present </span>
          ) : (
            <span className="text-red-500">Absent</span>
          )}
        </div>
      ); // attendanceRecordRequired (Link to detailed table)
    },
  },
  {
    accessorKey: "attendanceRecord",
    header: "Attendance Records",
    cell: ({ row }) => {
      const attendanceRecord = JSON.parse(row.original.attendanceRecord);
      const { teacherName, teacherId } = row.original;
      return (
        <NavLink
          state={{
            attendanceRecord: attendanceRecord,
            personInfo: {
              name: teacherName,
              id: teacherId,
            },
          }}
          className="text-blue-600 flex items-center gap-1  w-full justify-center "
          to="/attendance/view-individual-records"
        >
          View
          <Link2 />
        </NavLink>
      );
    },
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
    header: "Sex",
    cell: ({ row }) => {
      const sex = row.getValue("sex");

      if (sex === "male") {
        return <p>M</p>;
      }
      if (sex === "female") {
        return <p>F</p>;
      }
      return <p>O</p>;
    }, // sexRequired (Using 'sex' as per your studentColumns)
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
    cell: ({ row }) => {
      const qualification = row.getValue("qualification") || "null";
      console.log(qualification);

      const capitalized = capitalize(qualification);
      return <span>{capitalized}</span>; // attendanceRecordRequired (Link to detailed table)
    },
  },
  {
    accessorKey: "jobType",
    header: "Job Type", // jobTypeRequired (e.g., Full-time, Part-time)
    cell: ({ row }) => {
      const jobType = row.getValue("jobType") || "null";

      const capitalized = capitalize(jobType);
      return <span>{capitalized}</span>; // attendanceRecordRequired (Link to detailed table)
    },
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
    header: "Subjects Taught",
    cell: ({ row }) => {
      const subjectsObject = JSON.parse(row.getValue("subjectsTaught") || "{}");

      return (
        <div className="flex gap-2">
          {subjectsObject.map((subject) => (
            <span key={subject.abbreviation}>{subject.abbreviation}</span>
          ))}
        </div>
      );
    }, // subjectsTaughtRequired (Could be an array or comma-separated string)
  },
  {
    accessorKey: "classes",
    header: "Classes", // classesRequired (e.g., Grade 10, Grade 12 Science)
    cell: ({ row }) => {
      const classesObject = JSON.parse(row.getValue("classes") || "{}");

      return (
        <div className="flex gap-2">
          {classesObject.map((grade) => (
            <span key={grade.abbreviation}>{grade.abbreviation}</span>
          ))}
        </div>
      );
    },
  },
];
