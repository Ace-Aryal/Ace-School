import React, { useEffect, useState } from "react";
import AuthenticatedContainer from "../components/Templates/AuthenticatedContainer";
import { useQuery } from "@tanstack/react-query";
import { NavLink, useLocation, useNavigate } from "react-router";
import databaseService from "../appwrite/Database/database";
import config from "../appwrite";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import { FeeCatagoryBarChart } from "@/components/Templates/FeeCatBarChartHorizontal";
import StudentCharts from "@/components/Molecules/StudentCharts";
import { Button } from "@/components/Atoms/button";
import { ArrowLeft } from "lucide-react";
import PenaltyTableModal from "./PenaltiesViewPage";
import BillingDialog from "@/components/Organisms/BillingDialog";
import StudentSelfStatements from "@/components/Molecules/StudentSelfStatements";
export default function StudentSelfBillingViewPage() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  if (!location.state) {
    return (
      <div className="w-full h-full grow grid place-items-center">
        Pelase navigate via buttons
      </div>
    );
  }

  const { feeDocumentId } = location.state;
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

  if (isError || FeeDocumet === 404) {
    return <ErrorPage />;
  }
  if (isLoading) {
    return <LoadingPage />;
  }
  const monthlyRecords = JSON.parse(FeeDocumet.monthlyRecords);

  const statementsRecord =
    FeeDocumet.transactionsRecord.length > 0
      ? JSON.parse(FeeDocumet.transactionsRecord[0])
      : [];
  const statements = statementsRecord.statements;
  console.log(statements, "sts");
  const {
    admissionFees,
    disc,
    examinationFees,
    hostelFees,
    labFees,
    miscellenous,
    penalties,
    registrationFees,
    scholarship,
    transportationFees,
    tuitionFees,
    uniform,
  } = FeeDocumet;
  const chartData = [
    { feeCategory: "Admission ", amount: admissionFees, fill: "#4ade80" }, // green-400
    {
      feeCategory: "Examination ",
      amount: examinationFees,
      fill: "#60a5fa",
    }, // blue-400
    { feeCategory: "Tuition ", amount: tuitionFees, fill: "#f472b6" }, // pink-400
    {
      feeCategory: "Registration ",
      amount: registrationFees,
      fill: "#facc15",
    }, // yellow-400
    { feeCategory: "Lab ", amount: labFees, fill: "#a78bfa" }, // purple-400
    { feeCategory: "Uniform", amount: uniform, fill: "#f87171" }, // red-400
    {
      feeCategory: "Transportation ",
      amount: transportationFees,
      fill: "#34d399",
    }, // emerald-400
    { feeCategory: "Hostel ", amount: hostelFees, fill: "#fb923c" }, // orange-400
    { feeCategory: "Miscellaneous", amount: miscellenous, fill: "#38bdf8" }, // sky-400
    { feeCategory: "Penalties", amount: penalties, fill: "#c084fc" }, // violet-400
    { feeCategory: "Scholarship(%)", amount: scholarship, fill: "#f97316" }, // orange-500
    { feeCategory: "Discount", amount: disc, fill: "#e879f9" }, // fuchsia-400
  ];
  // setChartData()

  const chartConfig = {
    amount: {
      label: "Total Amount :",
    },
    admissionFees: {
      label: "Admission ",
      color: "#4ade80", // green-400
    },
    examinationFees: {
      label: "Examination ",
      color: "#60a5fa", // blue-400
    },
    tuitionFees: {
      label: "Tuition ",
      color: "#f472b6", // pink-400
    },
    registrationFees: {
      label: "Registration ",
      color: "#facc15", // yellow-400
    },
    labFees: {
      label: "Lab ",
      color: "#a78bfa", // purple-400
    },
    uniform: {
      label: "Uniform",
      color: "#f87171", // red-400
    },
    transportationFees: {
      label: "Transportation ",
      color: "#34d399", // emerald-400
    },
    hostelFees: {
      label: "Hostel ",
      color: "#fb923c", // orange-400
    },
    miscellenous: {
      label: "Miscellaneous",
      color: "#38bdf8", // sky-400
    },
    penalties: {
      label: "Penalties",
      color: "#c084fc", // violet-400
    },
    scholarship: {
      label: "Scholarship",
      color: "#f97316", // orange-500
    },
    disc: {
      label: "Discount",
      color: "#e879f9", // fuchsia-400
    },
  };

  return (
    <AuthenticatedContainer classnames="px-0 sm:px-4 ">
      <div className="w-full flex flex-col sm:flex-row gap-4">
        <section id="charts-section" className="sm:w-3/5 py-2 ">
          <div>
            <FeeCatagoryBarChart
              chartData={chartData}
              chartConfig={chartConfig}
            />
          </div>
          <div>
            <div className="flex w-full mt-3 mb-2 gap-2">
              {" "}
              <h2 className="text-2xl font-semibold">Fees Overview</h2>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {monthlyRecords.map((monthData, index) => (
                <div
                  key={index}
                  className=" bg-purple-100   rounded-xl p-2 shadow flex flex-col gap-0.5"
                >
                  <div className="font-semibold ">{monthData.month}</div>
                  <div className="text-sm font-medium text-blue-600">
                    Total: ₹{monthData.totalPayable}
                  </div>
                  <div className="text-green-600 text-sm font-medium">
                    Paid: ₹{monthData.paid}
                  </div>
                  <div className="text-red-600 text-sm font-medium">
                    Due: ₹{monthData.due}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="details-section" className="w-full sm:w-2/5 p-2 ">
          <div className="w-full ">
            <NavLink to={-1} className="hidden sm:block">
              <Button className="w-fit cursor-pointer  text-blue-600 ">
                <ArrowLeft /> Back
              </Button>
            </NavLink>
            <StudentCharts noLabels={true} feeDocumentId={feeDocumentId} />
          </div>
          <div id="statement area flex flex-col">
            <div className="flex justify-between items-center p-4 mt-3 border border-gray-300 rounded-lg">
              <p>penalty: Rs. {FeeDocumet.penalties.toLocaleString("en-NP")}</p>
              <div>
                <Button
                  onClick={() => setOpen(true)}
                  className="bg-blue-100 text-blue-600 hover:bg-blue-200 font-semibold w-full"
                >
                  View Penalties
                </Button>

                <PenaltyTableModal
                  open={open}
                  onOpenChange={setOpen}
                  penalties={JSON.parse(FeeDocumet.penaltiesRecord[0])}
                  studentDoc={FeeDocumet}
                />
              </div>
            </div>
            <div className=" items-center p-4 mt-3 border border-gray-300 rounded-lg w-full">
              <BillingDialog
                dialogTitle="Your fee statements"
                triggerText="View fee statements"
              >
                <StudentSelfStatements transactionsArray={statements} />
              </BillingDialog>
            </div>
          </div>
        </section>
      </div>
    </AuthenticatedContainer>
  );
}
