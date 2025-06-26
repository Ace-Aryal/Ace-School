import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import NepaliDatePicker from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { todayDate } from "@/utils/datetime";
import { useQuery } from "@tanstack/react-query";
import databaseService from "@/appwrite/Database/database";
import config from "@/appwrite";

export default function ActivityLogPage() {
  const [selectedDate, setSelectedDate] = useState(todayDate);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Activity Log</h1>

      <NepaliDatePicker
        theme="blue"
        language="en"
        id="date"
        dateFormat="YYYY-MM-DD"
        defaultDate={selectedDate}
        value={selectedDate}
        className="bg-white  text-center border border-zinc-300 px-4 py-2 rounded-md shadow-sm"
        onChange={(value) => setSelectedDate(value.bsDate)}
      />

      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px]">Date</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <ActivityTableList selectedDate={selectedDate} />
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function ActivityTableList({ selectedDate }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["activity", selectedDate],
    queryFn: async () => {
      try {
        const response = await databaseService.listDoc(
          config.activityLogId,
          selectedDate,
          String(selectedDate)
        );
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  });
  if (isError) {
    return (
      <TableRow>
        <TableCell colSpan={4} className="text-center py-4">
          Error finding data
        </TableCell>
      </TableRow>
    );
  }
  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={4} className="text-center py-4">
          Fetching data...
        </TableCell>
      </TableRow>
    );
  }

  return (
    <React.Fragment>
      {data.total > 0 ? (
        data.documents.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.date}</TableCell>
            <TableCell>{item.authorInfo}</TableCell>
            <TableCell>{item.activity}</TableCell>
            <TableCell>{item.description}</TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={4} className="text-center py-4">
            No activity found for selected date.
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
}
