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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

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

const data = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
];

export const studentColumns = [
  {
    id: "select",
    header: "Attendence",
    cell: ({ row }) => (
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Attendence " />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="light">Present</SelectItem>
          <SelectItem value="dark">Absent</SelectItem>
          <SelectItem value="system">On leave</SelectItem>
        </SelectContent>
      </Select>
    ),
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
    header: () => <div className="text-right">Grade</div>,
    cell: ({ row }) => {
      const grade = parseFloat(row.getValue("grade"));

      // Format the amount as a dollar amount

      return <div className="text-right font-medium">1</div>;
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
export const teacherColumns = [
  {
    id: "select",
    header: "Attendence",
    cell: ({ row }) => (
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Attendence " />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="light">Present</SelectItem>
          <SelectItem value="dark">Absent</SelectItem>
          <SelectItem value="system">On leave</SelectItem>
        </SelectContent>
      </Select>
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
export const staffColumns = [
  {
    id: "select",
    header: "Attendence",
    cell: ({ row }) => (
      <Select>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Attendence " />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="light">Present</SelectItem>
          <SelectItem value="dark">Absent</SelectItem>
          <SelectItem value="system">On leave</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
  {
    accessorKey: "staffID",
    header: "Staff ID",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("staffID")}</div>
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

export function AttendanceDatatable({ attendeesRole, setGrade, data }) {
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
  });
  const grades = Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`);

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
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="statEntry">
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
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
