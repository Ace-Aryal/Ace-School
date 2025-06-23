"use client";

import React, { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
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

const data = [
  {
    name: "Dipesh Aryal",
    grade: "1",
    rollNo: "3",
    monthDue: 100,
    monthPaid: 100,
    totalDue: 5000,
    totalPaid: 2000,
  },
  {
    name: "Sita Sharma",
    grade: "2",
    rollNo: "5",
    monthDue: 150,
    monthPaid: 150,
    totalDue: 4500,
    totalPaid: 4500,
  },
  {
    name: "Ram Thapa",
    grade: "3",
    rollNo: "2",
    monthDue: 200,
    monthPaid: 0,
    totalDue: 6000,
    totalPaid: 3000,
  },
  {
    name: "Anjali Gurung",
    grade: "1",
    rollNo: "8",
    monthDue: 100,
    monthPaid: 50,
    totalDue: 4000,
    totalPaid: 3500,
  },
  {
    name: "Bikash Karki",
    grade: "2",
    rollNo: "1",
    monthDue: 120,
    monthPaid: 120,
    totalDue: 3600,
    totalPaid: 3600,
  },
];

const columns = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "grade",
    header: "Grade",
    cell: ({ row }) => (
      <div className="capitalize text-center  font-medium">
        {row.getValue("grade")}
      </div>
    ),
  },
  {
    accessorKey: "rollNo",
    header: ({ column }) => (
      <Button className="p-0" variant="ghost">
        Roll
      </Button>
    ),
    cell: ({ row }) => (
      <div className="lowercase text-center font-medium">
        {row.getValue("rollNo")}
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="">Name</div>,
    cell: ({ row }) => {
      return <div className="p-2 font-medium">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "monthDue",
    header: () => <div className="">Month Due</div>,
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-IN").format(
        row.getValue("monthDue")
      );
      return (
        <div className=" bg-rose-100 p-2 text-red-700 font-medium">
          रु {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "monthPaid",
    header: () => <div className="">Month Paid</div>,
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-IN").format(
        row.getValue("monthPaid")
      );
      return (
        <div className=" bg-green-100 p-2 text-green-700 font-medium">
          रु {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "totalDue",
    header: () => <div className="">Total Due</div>,
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-IN").format(
        row.getValue("totalDue")
      );
      return (
        <div className=" bg-red-100 p-2 text-red-700 font-medium">
          रु {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "totalPaid",
    header: () => <div className="">Total Paid</div>,
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-IN").format(
        row.getValue("totalPaid")
      );
      return (
        <div className=" font-medium bg-green-100 p-2 text-green-700">
          रु {formatted}
        </div>
      );
    },
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

export default function DataTableDemo() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: 0,
        pageSize: 10, // 👈 number of rows per page
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={table.getColumn("email")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table className="text-sm ">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    className="border  border-gray-400"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
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
                    <TableCell
                      className="border p-0 border-gray-400"
                      key={cell.id}
                    >
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
