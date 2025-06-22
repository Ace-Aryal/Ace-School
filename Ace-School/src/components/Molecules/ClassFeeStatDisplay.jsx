import databaseService from "@/appwrite/Database/database";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PieCharComponent from "../Templates/PieChart";

function ClassFeeStatDisplay({ grade, month }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["classFeeStat", grade],
    queryFn: async () => {
      console.log(grade);
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
  console.log(data);
  return (
    <div className="w-full">
      <PieCharComponent month={month} />
    </div>
  );
}

export default ClassFeeStatDisplay;
