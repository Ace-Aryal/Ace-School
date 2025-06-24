import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { Button } from "../ui/button";
import PieDonut from "./PieOnly";
import { useQuery } from "@tanstack/react-query";
import databaseService from "@/appwrite/Database/database";
import config from "@/appwrite";
import { monthValue } from "@/utils/month";
import Spinner from "../Atoms/Spinner";

function StudentCharts({ feeDocumentId, noLabels }) {
  const [chartData1, setChartData1] = useState([
    { status: "paid", amount: 0, fill: "var(--color-paid)" }, // green-500
    { status: "due", amount: 1, fill: "var(--color-due)" }, // red-500
  ]);
  const [chartData2, setChartData2] = useState([
    { status: "paid", amount: 1, fill: "var(--color-paid)" }, // green-500
    { status: "due", amount: 0, fill: "var(--color-due)" }, // red-500
  ]);
  const {
    data: FeeDocumet,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["selfFeeData", feeDocumentId],
    queryFn: async () => {
      const response = await databaseService.getDocument(
        config.feeRecordColletionId,
        feeDocumentId
      );
      if (!response || response === 404) {
        return null;
      }
      return response;
    },
  });
  const statObject = {
    dueTotal: 0,
    paidTotal: 0,
    paidFees: 0,
    dueFees: 0,
  };

  useEffect(() => {
    if (FeeDocumet) {
      const monthlyRecords = JSON.parse(FeeDocumet.monthlyRecords);
      statObject.dueFees = 0;
      statObject.dueTotal = 0;
      statObject.paidFees = 0;
      statObject.paidTotal = 0;
      for (let index = 0; index < monthlyRecords.length; index++) {
        const month = monthlyRecords[index];
        statObject.dueTotal += month.due;
        statObject.paidTotal += month.paid;
        if (month.month.toLowerCase() === monthValue.toLowerCase()) {
          statObject.dueFees += month.due;
          statObject.paidFees += month.paid;

          break;
        }
      }
      setChartData1([
        {
          status: "paid",
          amount: statObject.paidFees,
          fill: "var(--color-paid)",
        }, // green-500
        { status: "due", amount: statObject.dueFees, fill: "var(--color-due)" }, // red-500
      ]);
      setChartData2([
        {
          status: "paid",
          amount: statObject.paidTotal,
          fill: "var(--color-paid)",
        }, // green-500
        {
          status: "due",
          amount: statObject.dueTotal,
          fill: "var(--color-due)",
        }, // red-500
      ]);
    }
  }, [isLoading, isError, FeeDocumet]);
  return (
    <div id="bottom" className="mt-3 pt-4 bg-gray-100 p-4 shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Your Fee Summary</h2>
        {!noLabels && (
          <NavLink
            state={{
              feeDocumentId,
            }}
            to="/student-self-billing-view"
          >
            <Button className="bg-blue-200 rounded-lg text-blue-600">
              View All Details
            </Button>
          </NavLink>
        )}
      </div>

      <div className="grid grid-cols-2 ">
        <div>
          <PieDonut chartData={chartData1} />
          <p className="text-center font-semibold">
            This Month {isLoading && <Spinner />}
          </p>
        </div>
        <div>
          <PieDonut chartData={chartData2} />
          <p className="text-center font-semibold">
            This Year {isLoading && <Spinner />}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentCharts;
