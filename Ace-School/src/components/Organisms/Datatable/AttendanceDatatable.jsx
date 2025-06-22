"use client";

import * as React from "react";
import { useState } from "react";
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
import { Controller, useForm } from "react-hook-form";
import AlertDialogComponent from "@/components/Molecules/AlertDialog";
import databaseService from "@/appwrite/Database/database";
import NepaliDate from "nepali-datetime";
import { showErrorToast, showSuccessToast } from "@/components/Templates/toast";
import { catchError } from "@/utils/catchError";
import config from "@/appwrite";
import { useQueryClient } from "@tanstack/react-query";

export function AttendanceDatatable({ attendeesRole, setGrade, data, grade }) {
  const {
    _register,
    handleSubmit,
    control,
    formState: { _isSubmitting, errors },
  } = useForm();
  const [_userData, setUserData] = useState([]);
  const queryClient = useQueryClient();
  const studentColumns = [
    {
      id: "select",
      header: "Attendence",
      cell: ({ row }) => {
        const { $id } = row.original;
        let attendance = row.original?.attendance
          ?.toLowerCase()
          .replaceAll(" ", "");
        if (
          attendance !== "present" &&
          attendance !== "absent" &&
          attendance !== "onleave"
        ) {
          attendance = "noattendance";
        }

        return (
          <div className="flex justify-center flex-col items-center">
            <Controller
              name={$id}
              control={control}
              defaultValue={attendance}
              rules={{
                required: "Attendence id required for every student",

                validate: (value) =>
                  value !== "noattendance" || "Attendence Missed",
              }}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(data) => {
                    field.onChange(data);
                  }}
                  className="w-[130px]"
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Attendence" />
                  </SelectTrigger>
                  <SelectContent className="bg-white ">
                    <SelectItem
                      className="bg-green-100 text-green-600 my-1"
                      value="present"
                    >
                      <Dot className="bg-green-600 text-green-600 rounded-full" />{" "}
                      Present
                    </SelectItem>
                    <SelectItem
                      className="bg-red-100 text-red-600"
                      value="absent"
                    >
                      {" "}
                      <Dot className="bg-red-600 text-red-600 rounded-full" />{" "}
                      Absent
                    </SelectItem>
                    <SelectItem
                      className="bg-blue-100 text-blue-600 my-1"
                      value="onleave"
                    >
                      {" "}
                      <Dot className="bg-blue-500 text-blue-500 rounded-full" />{" "}
                      On Leave
                    </SelectItem>
                    <SelectItem
                      className="bg-yellow-100 text-yellow-600 my-1"
                      value="noattendance"
                      disabled
                    >
                      {" "}
                      <Dot className="bg-yellow-600 text-yellow-700 rounded-full" />{" "}
                      No Attendence
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
        // const grade = parseFloat(row.getValue("grade"));

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
      header: "Attendance",
      cell: ({ row }) => {
        const { $id } = row.original;
        let attendance = row?.original?.attendance
          ?.toLowerCase()
          .replaceAll(" ", "");
        if (
          attendance !== "present" &&
          attendance !== "absent" &&
          attendance !== "onleave"
        ) {
          attendance = "noattendance";
        }

        return (
          <div className="flex justify-center flex-col items-center">
            <Controller
              name={$id}
              control={control}
              defaultValue={attendance}
              rules={{
                required: "Attendence id required for every teacher",

                validate: (value) =>
                  value !== "noattendance" || "Attendence Missed",
              }}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(data) => {
                    field.onChange(data);
                  }}
                  className="w-[130px]"
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Attendence" />
                  </SelectTrigger>
                  <SelectContent className="bg-white ">
                    <SelectItem
                      className="bg-green-100 text-green-600 my-1"
                      value="present"
                    >
                      <Dot className="bg-green-600 text-green-600 rounded-full" />{" "}
                      Present
                    </SelectItem>
                    <SelectItem
                      className="bg-red-100 text-red-600"
                      value="absent"
                    >
                      {" "}
                      <Dot className="bg-red-600 text-red-600 rounded-full" />{" "}
                      Absent
                    </SelectItem>
                    <SelectItem
                      className="bg-blue-100 text-blue-600 my-1"
                      value="onleave"
                    >
                      {" "}
                      <Dot className="bg-blue-500 text-blue-500 rounded-full" />{" "}
                      On Leave
                    </SelectItem>
                    <SelectItem
                      className="bg-yellow-100 text-yellow-600 my-1"
                      value="noattendance"
                      disabled
                    >
                      {" "}
                      <Dot className="bg-yellow-600 text-yellow-700 rounded-full" />{" "}
                      No Attendence
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        );
      },
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
      header: "Attendance",
      cell: ({ row }) => {
        const { $id } = row.original;
        let attendance = row.original?.attendance
          ?.toLowerCase()
          .replaceAll(" ", "");
        if (
          attendance !== "present" &&
          attendance !== "absent" &&
          attendance !== "onleave"
        ) {
          attendance = "noattendance";
        }
        return (
          <div className="flex justify-center flex-col items-center">
            <Controller
              name={$id}
              control={control}
              defaultValue={attendance}
              rules={{
                required: "Attendence id required for every staff",

                validate: (value) =>
                  value !== "noattendance" || "Attendence Missed",
              }}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(data) => {
                    field.onChange(data);
                  }}
                  className="w-[130px]"
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Attendence" />
                  </SelectTrigger>
                  <SelectContent className="bg-white ">
                    <SelectItem
                      className="bg-green-100 text-green-600 my-1"
                      value="present"
                    >
                      <Dot className="bg-green-600 text-green-600 rounded-full" />{" "}
                      Present
                    </SelectItem>
                    <SelectItem
                      className="bg-red-100 text-red-600"
                      value="absent"
                    >
                      {" "}
                      <Dot className="bg-red-600 text-red-600 rounded-full" />{" "}
                      Absent
                    </SelectItem>
                    <SelectItem
                      className="bg-blue-100 text-blue-600 my-1"
                      value="onleave"
                    >
                      {" "}
                      <Dot className="bg-blue-500 text-blue-500 rounded-full" />{" "}
                      On Leave
                    </SelectItem>
                    <SelectItem
                      className="bg-yellow-100 text-yellow-600 my-1"
                      value="noattendance"
                      disabled
                    >
                      {" "}
                      <Dot className="bg-yellow-600 text-yellow-700 rounded-full" />{" "}
                      No Attendence
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        );
      },
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
        pageSize: 30, // ✅ Default rows per page
      },
    },
  });

  const grades = Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`);
  const handleAttendence = async (data) => {
    console.log("attendance data", data);
    const now = new NepaliDate().toString().trim().slice(0, 10);
    //handle attendances
    function createBatchAttendencePromise(data) {
      const promises = [];
      for (const id in data) {
        const attendanceData = {
          documentId: id,
          attendance: data[id],
          date: now,
        };
        promises.push(
          databaseService.batchUpdateDocument(attendanceData, attendeesRole)
        );
      }
      return promises;
    }
    async function retryPosting(failedPromises) {
      let isFailed = true;
      let count = 0;
      while (count < 5 && isFailed) {
        console.log(count);
        let data = {};
        failedPromises.forEach((promise) => {
          data = { ...data, ...promise.value?.sentData };
        });

        if (Object.keys(data).length === 0) {
          isFailed = false;
        }
        count++;
      }
    }
    async function getOrCreateAttendenceDocument(collectionID, data) {
      const { response: getResponse, error: _getError } = await catchError(() =>
        databaseService.getDocument(collectionID, now)
      );
      if (getResponse && getResponse !== 404) {
        const Report = JSON.parse(getResponse.Report);
        if (attendeesRole.toLowerCase() === "student") {
          data = { ...JSON.parse(getResponse.Report), ...data };
          console.log("resp", JSON.parse(getResponse.Report));
        }
        console.log("data", data);
        const { response, _error } = await catchError(() =>
          databaseService.updateAttendenceRecords(collectionID, now, data)
        );
        if (!response) {
          return showErrorToast("Error in database, retry");
        }
        showSuccessToast("Attendence record added sucessfully");
        return;
      }

      const { response, error } = await catchError(() =>
        databaseService.createDocument(collectionID, now, {
          Report: JSON.stringify(data),
        })
      );
      console.log(response, error);
      if (!response) {
        return showErrorToast("Couldn't add to today record! Retry");
      }
      return showSuccessToast("Attendence record added sucessfully");
    }

    async function getDataForAttendance() {
      if (attendeesRole.toLowerCase() === "student" && !grade) {
        console.error("student without grade");
      }
      if (attendeesRole.toLowerCase() === "student" && grade) {
        const { response, error } = await catchError(() =>
          databaseService.getAllStudentsDocs(grade)
        );
        if (error || !response?.length) {
          showErrorToast("Error ferching data");
          return;
        }
        const classAttendenceRecordArray = response.map((studentRecord) => ({
          name: studentRecord.studentName,
          roll: studentRecord.rollNo,
          att: studentRecord.attendance,
        }));
        const classesAttendanceObject = {
          [grade]: classAttendenceRecordArray,
        };
        console.log("obj", classesAttendanceObject);
        const collectionId = config.studentAttendenceCollectionId;
        getOrCreateAttendenceDocument(collectionId, classesAttendanceObject);
      }
      if (attendeesRole.toLowerCase() === "staff") {
        const { response, error } = await catchError(
          databaseService.getAllStaffsDocument
        );
        if (error || !response?.length) {
          showErrorToast("Error ferching data");
          return;
        }
        const staffAttendenceRecordArray = response.map((staffRecord) => ({
          name: staffRecord.fullName,
          id: staffRecord.staffId,
          att: staffRecord.attendance,
        }));
        console.log(staffAttendenceRecordArray);
        const collectionId = config.staffAttendenceCollectionId;
        getOrCreateAttendenceDocument(collectionId, staffAttendenceRecordArray);
      }
      if (attendeesRole.toLowerCase() === "teacher") {
        const { response, error } = await catchError(
          databaseService.getAllTeachersDocument
        );
        if (error || !response?.length) {
          showErrorToast("Error ferching data");
          return;
        }
        const teacherAttendenceRecordArray = response.map((teacherRecord) => ({
          name: teacherRecord.teacherName,
          id: teacherRecord.teacherId,
          att: teacherRecord.attendance,
        }));
        console.log(teacherAttendenceRecordArray);
        const collectionId = config.teacherAttendenceCollectionId;
        getOrCreateAttendenceDocument(
          collectionId,
          teacherAttendenceRecordArray
        );
      }
    }

    const promises = createBatchAttendencePromise(data);
    const { response, error } = await catchError(() =>
      Promise.allSettled(promises)
    );
    if (error) {
      showErrorToast("Error during attendance");
      return;
    }
    const failedPromises = response?.filter(
      (promise) => promise.value?.status === "rejected"
    );

    if (failedPromises.length > 0) {
      await retryPosting(failedPromises);
    } else {
      showSuccessToast("All  attendence registered");
    }

    // create attendance record
    const querykey =
      attendeesRole.toLowerCase() === "student"
        ? "studentAtt"
        : attendeesRole.toLowerCase() === "staff"
        ? "staffAtt"
        : "teacherAtt";
    await getDataForAttendance();
    queryClient.invalidateQueries({
      queryKey: [querykey],
    });

    // let attendanceReport = JSON.parse(reportData?.Report) || {};

    // // const { $id: reportDocumentId, $collectionId: reportCollectionId } =
    // //   reportData;
    // let attendanceReportKey = now;
    // let queryKey;
    // if (attendeesRole.toLowerCase() === "student") {
    //   attendanceReportKey = `${now}-${grade.toLowerCase().replaceAll(" ", "")}`;
    //   attendanceReport = { ...attendanceReport, [attendanceReportKey]: [] };
    // }

    // if (attendeesRole.toLowerCase() === "staff") {
    //   attendanceReport = { ...attendanceReport, [attendanceReportKey]: [] };
    // }
    // if (attendeesRole.toLowerCase() === "teacher") {
    //   attendanceReport = { ...attendanceReport, [attendanceReportKey]: [] };
    // }

    // async function promiseCreator(userData) {
    //   return userData.map((user) => {
    //     let { documentId, attendanceRecord, $collectionId } = user;
    //     let userIdentifier;
    //     attendanceRecord = JSON.parse(attendanceRecord);

    //     const adjustDocument = {
    //       attendance: data[documentId],
    //       attendanceRecord: JSON.stringify({
    //         ...attendanceRecord,
    //         [now]: data[documentId],
    //       }),
    //     };

    //     if (attendeesRole.toLowerCase() === "student") {
    //       userIdentifier = `Roll ${user.rollNo}`;
    //       attendanceReport[attendanceReportKey].push({
    //         studentName: user.studentName,
    //         rollNo: user.rollNo,
    //         attendence: data[documentId],
    //       });
    //       queryKey = ["studentAtt"];
    //     }
    //     if (attendeesRole.toLowerCase() === "staff") {
    //       userIdentifier = `Roll ${user.staffId}`;
    //       attendanceReport[attendanceReportKey].push({
    //         staffId: user.staffId,
    //         attendence: data[documentId],
    //       });
    //       queryKey = ["staffAtt"];
    //     }
    //     if (attendeesRole.toLowerCase() === "teacher") {
    //       userIdentifier = `Roll ${user.teacherId}`;
    //       attendanceReport[attendanceReportKey].push({
    //         teacherId: user.teacherId,
    //         attendence: data[documentId],
    //       });
    //       queryKey = ["teacherAtt"];
    //     }
    //     return databaseService.batchUpdateDocument(
    //       $collectionId,
    //       documentId,
    //       adjustDocument,
    //       userIdentifier
    //     );
    //   });
    // }

    // try {
    //   let promises = await promiseCreator(userData); // also creates promise framework for AttendenceReport
    //   let failedTimes = 0;
    //   let iterationCount = 0;
    //   let failedUsers = [];
    //   do {
    //     const response = await Promise.all(promises);
    //     failedUsers = [];
    //     let failedResult = response.filter(
    //       (result) => result.status === "rejected"
    //     );
    //     console.log(failedResult);

    //     promises = failedResult.map((result) => {
    //       const { collectionId, documentId, adjustDocument, userIdentifier } =
    //         result.sentData;
    //       failedUsers.push(userIdentifier);
    //       return databaseService.batchUpdateDocument(
    //         collectionId,
    //         documentId,
    //         adjustDocument,
    //         userIdentifier
    //       );
    //     });
    //     failedTimes = failedResult.length;
    //     iterationCount++;
    //   } while (failedTimes > 0 && iterationCount < 5);
    //   if (failedTimes > 0) {
    //     showErrorToast(
    //       `Couldn't register all attendence retry for ${failedUsers.join(",")}`
    //     );
    //   }
    // console.log(attendanceReport, "att rep");
    // const updatedReport = JSON.stringify(attendanceReport);
    // console.log(reportCollectionId, reportDocumentId);
    // const reportResult = await databaseService.updateAttendenceRecords(
    //   reportCollectionId,
    //   reportDocumentId,
    //   { Report: updatedReport }
    // );
    // if (reportResult) {
    // }
    //   showSuccessToast("Attendence Sucessful");
    // } catch (error) {
    //   console.error(error);
    //   showErrorToast("Error submitting attendence ");
    // } finally {
    // }
    // queryClient.invalidateQueries({ queryKey: queryKey });
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {attendeesRole.toLowerCase() === "student" && (
          <select
            value={grade || table.getColumn("grade")?.getFilterValue()}
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
            continueButtonColor="bg-blue-100 text-blue-600 hover:bg-blue-200"
            cancelButtonColor="bg-red-100 text-red-600 hover:bg-red-200"
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
