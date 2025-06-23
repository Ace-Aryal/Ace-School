import databaseService from "@/appwrite/Database/database";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PieCharComponent from "../Templates/PieChart";

function ClassFeeStatDisplay({ grade, month }) {
  //   const { data, isLoading, isError } = useQuery({
  //     queryKey: ["classFeeStat", grade],
  //     queryFn: async () => {
  //       console.log(grade);
  //       const response = await databaseService.getClassFeeStats(grade);
  //       return response;
  //     },
  //   });
  //   if (isError) {
  //     return <p>Error</p>;
  //   }
  //   if (isLoading) {
  //     return <p>Is Loading...</p>;
  //   }
  //   console.log(data);
  const chartData = [
    { status: "paid", amount: 275, fill: "var(--color-paid)" }, // green-500
    { status: "due", amount: 300, fill: "var(--color-due)" }, // red-500
  ];
  const statObject = {
    paidStudents: 0,
    dueStudents: 0,
    paidFees: 0,
    dueFees: 0,
  };
  return (
    <div className="w-full">
      <PieCharComponent
        data={statObject}
        chartData={chartData}
        month={"Baisakh"}
      />
    </div>
  );
}

export default ClassFeeStatDisplay;
