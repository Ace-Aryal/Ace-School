"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Dot, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import AlertDialogComponent from "@/components/Molecules/AlertDialog";
import databaseService from "@/appwrite/Database/database";
import NepaliDate from "nepali-datetime";
import { showErrorToast } from "@/components/Templates/toast";

export function AttendanceDatatable({
  attendeesRole,
  setGrade,
  data,
  grade,
  reportData,
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm();
  const [userData, setUserData] = useState([]);
  const studentColumns = [
    {
      id: "select",
      header: "Attendence",
      cell: ({ row }) => {
        const {
          $id,
          studentName,
          grade,
          rollNo,
          $collectionId,
          attendanceRecord,
        } = row?.original;
        console.log(row.original);
        return (
          <div className="flex justify-center flex-col items-center">
            <Controller
              name={$id}
              control={control}
              rules={{
                required: "Attendence id required for every student",
              }}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(data) => {
                    field.onChange(data);
                    setUserData((prevData) => {
                      if (
                        prevData.some((student) => student.documentId === $id)
                      ) {
                        return prevData;
                      }

                      return [
                        ...prevData,
                        {
                          documentId: $id,
                          studentName,
                          grade,
                          rollNo,
                          $collectionId,
                          attendanceRecord,
                        },
                      ];
                    });
                  }}
                  className="w-[130px]"
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Attendence " />
                  </SelectTrigger>
                  <SelectContent className="bg-white ">
                    <SelectItem
                      className="bg-green-500 text-white my-1"
                      value="present"
                    >
                      <Dot className="bg-green-500 text-green-500 rounded-full" />{" "}
                      Present
                    </SelectItem>
                    <SelectItem
                      className="bg-red-500 text-white"
                      value="absent"
                    >
                      {" "}
                      <Dot className="bg-red-500 text-red-500 rounded-full" />{" "}
                      Absent
                    </SelectItem>
                    <SelectItem
                      className="bg-blue-500 text-white my-1"
                      value="onLeave"
                    >
                      {" "}
                      <Dot className="bg-blue-500 text-blue-500 rounded-full" />{" "}
                      On Leave
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors[$id] && (
              <p className="text-sm text-red-500 ">{errors[$id].message}</p>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "rollNo",
      header: "Roll No",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("rollNo")}</div>
      ),
    },
    {
      accessorKey: "grade",
      header: () => <div className="t">Grade</div>,
      cell: ({ row }) => {
        const grade = parseFloat(row.getValue("grade"));

        // Format the amount as a dollar amount

        return <div className="">{row.getValue("grade")}</div>;
      },
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
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("studentName")}</div>
      ),
    },
  ];
  const teacherColumns = [
    {
      id: "select",
      header: "Attendence",
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <Select className="w-[130px]">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Attendence " />
            </SelectTrigger>
            <SelectContent className="bg-white ">
              <SelectItem
                className="bg-green-500 text-white my-1"
                value="present"
              >
                <Dot className="bg-green-500 text-green-500 rounded-full" />{" "}
                Present
              </SelectItem>
              <SelectItem className="bg-red-500 text-white" value="absent">
                {" "}
                <Dot className="bg-red-500 text-red-500 rounded-full" /> Absent
              </SelectItem>
              <SelectItem
                className="bg-blue-500 text-white my-1"
                value="onLeave"
              >
                {" "}
                <Dot className="bg-blue-500 text-blue-500 rounded-full" /> On
                Leave
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      accessorKey: "teacherId",
      header: "Teacher ID",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("teacherId")}</div>
      ),
    },

    {
      accessorKey: "teacherName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("teacherName")}</div>
      ),
    },
  ];
  const staffColumns = [
    {
      id: "select",
      header: "Attendence",
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <Select className="w-[130px]">
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Attendence " />
            </SelectTrigger>
            <SelectContent className="bg-white ">
              <SelectItem
                className="bg-green-500 text-white my-1"
                value="present"
              >
                <Dot className="bg-green-500 text-green-500 rounded-full" />{" "}
                Present
              </SelectItem>
              <SelectItem className="bg-red-500 text-white" value="absent">
                {" "}
                <Dot className="bg-red-500 text-red-500 rounded-full" /> Absent
              </SelectItem>
              <SelectItem
                className="bg-blue-500 text-white my-1"
                value="onLeave"
              >
                {" "}
                <Dot className="bg-blue-500 text-blue-500 rounded-full" /> On
                Leave
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      accessorKey: "staffId",
      header: "Staff ID",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("staffId")}</div>
      ),
    },

    {
      accessorKey: "fullName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("fullName")}</div>
      ),
    },
  ];
  const attenderRoles = useSelector((state) => state.auth.user.roles);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  let columns;
  if (attendeesRole.toLowerCase() === "student") {
    columns = studentColumns;
  }
  if (attendeesRole.toLowerCase() === "teacher") {
    columns = teacherColumns;
  }
  if (attendeesRole.toLowerCase() === "staff") {
    columns = staffColumns;
  }
  console.log(columns);
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 50, // ✅ Default rows per page
      },
    },
  });
  const grades = Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`);
  const handleAttendence = async (data) => {
    console.log(data, userData);
    const now = new NepaliDate().toString().trim().slice(0, 10);
    let attendanceReport = reportData;
    let attendanceReportKey = now;
    if (attendeesRole.toLowerCase() === "student") {
      attendanceReportKey = `${now}-${grade.toLowerCase().replaceAll(" ", "")}`;
      attendanceReport = { ...attendanceReport, [attendanceReportKey]: [] };
    }

    if (attendeesRole.toLowerCase() === "staff") {
      attendanceReport = { ...attendanceReport, [attendanceReportKey]: [] };
    }
    if (attendeesRole.toLowerCase() === "teacher") {
      attendanceReport = { ...attendanceReport, [attendanceReportKey]: [] };
    }

    const promises = userData.map((user) => {
      const { documentId, attendanceRecord, $collectionId } = data;
      const adjustDocument = {
        attendance: data[documentId],
        attendanceRecord: { ...attendanceRecord, [now]: data[documentId] },
      };

      if (attendeesRole.toLowerCase() === "student") {
        attendanceReport[attendanceReportKey].push({
          studentName: user.studentName,
          rollNo: user.rollNo,
          attendence: data[documentId],
        });
      }
      if (attendeesRole.toLowerCase() === "staff") {
        attendanceReport[attendanceReportKey].push({
          staffId: user.staffId,
          attendence: data[documentId],
        });
      }
      if (attendeesRole.toLowerCase() === "teacher") {
        attendanceReport[attendanceReportKey].push({
          teacherId: user.teacherId,
          attendence: data[documentId],
        });
      }
      return databaseService.batchUpdateDocumet(
        $collectionId,
        documentId,
        adjustDocument
      );
    });
    try {
      const response = await Promise.allSettled(promises);
    } catch (error) {
      showErrorToast("Error submitting attendence ", error.message);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {attendeesRole.toLowerCase() === "student" && (
          <select
            value={table.getColumn("grade")?.getFilterValue() ?? ""}
            onChange={(event) => {
              table.getColumn("grade")?.setFilterValue(event.target.value);
              setGrade(event.target.value);
            }}
            className="max-w-sm border-zinc-800 border p-2 rounded-lg"
          >
            <option value="nursery">Nursery</option>
            <option value="lkg">LKG</option>
            <option value="ukg">UKG</option>
            {grades.map((grade) => {
              return (
                <option key={grade} value={grade.substring(6)}>
                  {grade}
                </option>
              );
            })}
          </select>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="text-center" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-center" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="h-8 text-center"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="statEntry text-sm p-1">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="">
          <AlertDialogComponent
            buttonText="Submit"
            title="Sure want to submit the attendence ?"
            description="This will submit today attendence , it may take a few seconds to submit into database"
            classNames="bg-red-500 w-fit"
            onContinueFn={handleSubmit(handleAttendence)}
          />
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
