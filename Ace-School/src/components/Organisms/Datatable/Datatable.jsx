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

import { showErrorToast } from "@/components/Templates/toast";
import databaseService from "@/appwrite/Database/database";
import LoadingPage from "@/pages/LoadingPage";
import ErrorPage from "@/pages/ErrorPage";
import { useQuery } from "@tanstack/react-query";
// to delete

export function DataTable({ columns, role }) {
  const [grade, setGrade] = useState("");
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const roleObject = {
    teacher: "teacherName",
    student: "studentName",
    staffs: "fullName",
    getFilterAttriute: (role) => {
      return roleObject[role];
    },
  };
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      if (role.toLowerCase() === "student") {
        return await databaseService.getAllStudentsDocs(grade);
      }
      if (role.toLowerCase() === "teacher") {
        return await databaseService.getAllTeachersDocument();
      }
      if (role.toLowerCase() === "staff") {
        return await databaseService.getAllStaffsDocument();
      }
    },
  });

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
    initialState: {
      pagination: {
        pageSize: 15, // ⬅️ Set your pagination size here
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const grades = Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`);

  useEffect(() => {
    if (role.toLowerCase() === "student") {
      refetch();
    }
  }, [grade]);

  if (isLoading) {
    return <LoadingPage />;
  }
  if (error) {
    return <ErrorPage />;
  }

  return (
    <div className="w-full bg-gray-100 shadow-xl shadow-gray-800 rounded-2xl  p-5 px-10 mt-4">
      <div className="flex w-full items-center py-4">
        <Input
          placeholder="Filter by name..."
          value={
            table
              .getColumn(roleObject.getFilterAttriute(role))
              ?.getFilterValue() ?? ""
          }
          onChange={(event) =>
            table
              .getColumn(roleObject.getFilterAttriute(role))
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        {role.toLowerCase() === "student" && (
          <select
            className="p-2 text-sm mx-2 border rounded-lg"
            name="filter"
            id="class"
            value={table.getColumn("grade")?.getFilterValue() ?? ""}
            onChange={(event) => {
              setGrade(event.target.value);

              table.getColumn("grade")?.setFilterValue(event.target.value);
            }}
          >
            <option value="">All</option>
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
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
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
      <div className="rounded-md border w-full">
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
                    <TableCell key={cell.id}>
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
