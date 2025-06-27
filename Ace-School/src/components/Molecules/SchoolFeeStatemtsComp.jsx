import databaseService from "@/appwrite/Database/database";
import GeneralErrorPage from "@/pages/GeneralErrorPage";
import LoadingPage from "@/pages/LoadingPage";
import { todayDate } from "@/utils/datetime";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import NepaliDatePicker from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
import { Card } from "../ui/card";
function SchoolFeeStatemtsComp() {
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["schoolFeeStatement", selectedDate],
    queryFn: async () => {
      try {
        const response = await databaseService.listSchoolFeeStatements(
          selectedDate
        );
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  });
  if (isLoading) {
    return <LoadingPage />;
  }
  if (isError) {
    return <GeneralErrorPage />;
  }
  if (data.total === 0) {
    return <GeneralErrorPage message="No statements found for the given day" />;
  }
  const transactionsArray = data.documents;
  return (
    <div>
      <section id="top">
        <div className="sticky top-0 z-10 bg-white p-3  mb-6">
          <div className="flex justify-center">
            <NepaliDatePicker
              language="en"
              // maxDate={new NepaliDate().toString().trim().slice(0, 10)}
              id="date"
              defaultDate={selectedDate}
              value={selectedDate}
              className="bg-white text-center border border-zinc-300 px-4 py-2 rounded-md shadow-sm"
              onChange={(value) => setSelectedDate(value.bsDate)}
            />
          </div>
        </div>
      </section>

      <section id="botoom">
        <Card className="p-4">
          <div className="overflow-auto max-h-[400px] max-w-full border rounded-md">
            <table className="min-w-[800px] text-sm w-full text-left border-collapse">
              <thead className="bg-muted sticky top-0 z-10">
                <tr>
                  <th className="p-2 border-b">Date</th>
                  <th className="p-2 border-b">Roll No</th>
                  <th className="p-2 border-b">Grade</th>
                  <th className="p-2 border-b">Name</th>
                  <th className="p-2 border-b">Amount</th>
                  <th className="p-2 border-b">Method</th>
                  <th className="p-2 border-b">Accountant</th>
                  <th className="p-2 border-b">Payer</th>
                </tr>
              </thead>
              <tbody>
                {transactionsArray.map((entry, idx) => (
                  <tr key={idx} className="hover:bg-muted/50">
                    <td className="p-2 border-b">{entry.date.slice(0, 10)}</td>
                    <td className="p-2 border-b">{entry.roll}</td>
                    <td className="p-2 border-b">{entry.grade}</td>
                    <td className="p-2 border-b">{entry.studentName}</td>
                    <td className="p-2 border-b">
                      Rs. {entry.amount.toLocaleString("en-NP")}
                    </td>
                    <td className="p-2 border-b">{entry.method}</td>
                    <td className="p-2 border-b">{entry.accountant}</td>
                    <td className="p-2 border-b">{entry.payer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  );
}

export default SchoolFeeStatemtsComp;
