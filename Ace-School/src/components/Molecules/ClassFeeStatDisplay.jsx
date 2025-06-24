import databaseService from "@/appwrite/Database/database";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PieCharComponent from "../Templates/PieChart";

function ClassFeeStatDisplay({ grade, month }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["classFeeStat", grade],
    queryFn: async () => {
      const response = await databaseService.getClassFeeStats(grade);
      return response;
    },
  });
  if (isError) {
    return <p>Error</p>;
  }
  if (isLoading) {
    return <p>Is Loading...</p>;
  }
  let chartData = [
    { status: "paid", amount: 0, fill: "var(--color-paid)" }, // green-500
    { status: "due", amount: 0, fill: "var(--color-due)" }, // red-500
  ];
  const statObject = {
    paidStudents: 0,
    dueStudents: 0,
    paidFees: 0,
    dueFees: 0,
  };

  if (data.documents.length > 0) {
    const monthlyRecords = data.documents.map((document) =>
      JSON.parse(document.monthlyRecords)
    );

    monthlyRecords.forEach((student) => {
      for (let index = 0; index < student.length; index++) {
        const recordMonth = student[index];
        if (recordMonth.month.toLowerCase() === month.toLowerCase()) {
          statObject.dueFees += recordMonth.due;
          statObject.paidFees += recordMonth.paid;
          if (recordMonth.due === 0) {
            return statObject.paidStudents++;
          }
          statObject.dueStudents++;
          break;
        }
      }
    });
    chartData = [
      {
        status: "paid",
        amount: statObject.paidFees,
        fill: "var(--color-paid)",
      }, // green-500
      { status: "due", amount: statObject.dueFees, fill: "var(--color-due)" },
    ]; // red-500
  }

  return (
    <div className="w-full">
      <PieCharComponent data={statObject} chartData={chartData} month={month} />
    </div>
  );
}

export default ClassFeeStatDisplay;
