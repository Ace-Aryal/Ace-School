import config from "@/appwrite";
import databaseService from "@/appwrite/Database/database";
import AuthenticatedContainer from "@/components/Templates/AuthenticatedContainer";
import { useQuery } from "@tanstack/react-query";
import NepaliDate from "nepali-datetime";
import React, { useState } from "react";
import { useLocation } from "react-router";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import NepaliDatePicker from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
function ViewAttendancePage() {
  const location = useLocation();
  const userRole = location.state?.userRole.toLowerCase() || null;
  const now = new NepaliDate().toString().trim().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(now);

  let { reportData, isReportLoading, isReportError } = useAttendenceReportQuery(
    userRole,
    selectedDate,
    [selectedDate]
  );
  console.log(reportData);
  const orderedGrades = [
    "nursery",
    "lkg",
    "ukg",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];
  if (isReportError) {
    return <ErrorPage />;
  }
  if (isReportLoading) {
    return <LoadingPage />;
  }
  const attendanceStats = {
    absent: 0,
    present: 0,
    onLeave: 0,
    getPercentage() {
      const total = this.absent + this.present + this.onLeave;
      if (total < 1) {
        return "N/A";
      }
      return ((this.present / total) * 100).toFixed(2);
    },
  };
  if (userRole.toLowerCase() !== "student") {
    console.log(reportData);
    reportData = JSON.parse(reportData.Report);
  } else {
    reportData = JSON.parse(reportData.Report);

    reportData = orderedGrades.map((grade) => {
      if (reportData[grade]) {
        return reportData[grade];
      }
      return [];
    });
  }
  console.log("transformed", reportData);
  return (
    <AuthenticatedContainer>
      <h1 className="text-2xl sm:text-3xl font-semibold">
        View Attendance Records
      </h1>

      <section className="w-full mt-4">
        <div id="date" className="w-full fixed">
          <div className="flex items-center gap-2">
            <NepaliDatePicker
              language="en"
              id="date"
              defaultDate={selectedDate}
              value={selectedDate}
              className=" bg-gray-200   px-2 py-0.5 w-fit rounded-lg "
              onChange={(value) => {
                setSelectedDate(value.bsDate);
              }}
            />
          </div>
        </div>
        <div id="main">
          {userRole.toLowerCase() === "student" ? (
            reportData.map((grade, index) => {
              return (
                <div className="w-full mb-16">
                  <div className="w-full  flex justify-center">
                    <h2 className="text-xl max-w-lg  w-full  font-semibold mt-5">{`Grade ${orderedGrades[index]}`}</h2>
                  </div>
                  <div className="w-full  flex justify-center">
                    <table className="border w-full max-w-lg ">
                      <thead>
                        <tr className="text-sm  ">
                          <th className="border font-medium p-1 px-2 ">
                            Roll No
                          </th>
                          <th className="border p-1 px-2">Name</th>
                          <th className="border p-1 px-2">Attendance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {grade.map((attendee, index) => {
                          if (attendee.att === "present") {
                            attendanceStats.present++;
                          }
                          if (attendee.att === "onleave") {
                            attendanceStats.onLeave++;
                          }
                          if (
                            attendee.att === "absent" ||
                            attendee.att === "noattendance"
                          ) {
                            attendanceStats.absent++;
                          }
                          return (
                            <tr
                              className={`text-sm text-zinc-700 ${
                                index % 2 === 0 ? "" : "bg-gray-100"
                              } `}
                              key={attendee.roll}
                            >
                              <td className="border px-1">{attendee.roll}</td>
                              <td className="border px-1">{attendee.name}</td>
                              <td className="border px-1">{attendee.att}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <ul className="w-full  flex gap-3 justify-center">
                    <li className="text-green-600 font-semibold">
                      Present: {attendanceStats.present}
                    </li>
                    <li className="text-red-600 font-semibold">
                      Absent : {attendanceStats.absent}
                    </li>
                    <li className="text-blue-600 font-semibold">
                      On leave : {attendanceStats.onLeave}
                    </li>
                    <li className="font-semibold">
                      Percentage : {attendanceStats.getPercentage()}%
                    </li>
                  </ul>
                </div>
              );
            })
          ) : (
            <div className="w-full mb-16">
              <div className="w-full  flex justify-center">
                <h2 className="text-xl max-w-lg  w-full  font-semibold mt-5">
                  {userRole} Attendance
                </h2>
              </div>
              <div className="w-full  flex justify-center">
                <table className="border w-full max-w-lg ">
                  <thead>
                    <tr className="text-sm  ">
                      <th className="border font-medium p-1 px-2 ">ID</th>
                      <th className="border p-1 px-2">Name</th>
                      <th className="border p-1 px-2">Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.map((attendee, index) => {
                      if (attendee.att === "present") {
                        attendanceStats.present++;
                      }
                      if (attendee.att === "onleave") {
                        attendanceStats.onLeave++;
                      }
                      if (
                        attendee.att === "absent" ||
                        attendee.att === "noattendance"
                      ) {
                        attendanceStats.absent++;
                      }
                      return (
                        <tr
                          className={`text-sm text-zinc-700 ${
                            index % 2 === 0 ? "" : "bg-gray-100"
                          } `}
                          key={attendee.roll}
                        >
                          <td className="border px-1">{attendee.id}</td>
                          <td className="border px-1">{attendee.name}</td>
                          <td className="border px-1">{attendee.att}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <ul className="w-full  flex gap-3 justify-center">
                <li className="text-green-600 font-semibold">
                  Present: {attendanceStats.present}
                </li>
                <li className="text-red-600 font-semibold">
                  Absent : {attendanceStats.absent}
                </li>
                <li className="text-blue-600 font-semibold">
                  On leave : {attendanceStats.onLeave}
                </li>
                <li className="font-semibold">
                  Percentage : {attendanceStats.getPercentage()}%
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </AuthenticatedContainer>
  );
}
export function useAttendenceReportQuery(attendeesRole, documentId, queryKeys) {
  // to update report

  if (attendeesRole?.toLowerCase() === "staff") {
    const { data, isLoading, isError } = useQuery({
      queryKey: ["staffAtt", "staffAttendenceReportData", ...queryKeys],
      queryFn: async () =>
        await databaseService.getDocument(
          config.staffAttendenceCollectionId,
          documentId
        ),
    });
    console.log(data);
    // const formattedData = data?.sort((a, b) => a.staffId - b.staffId);
    return {
      reportData: data,
      isReportLoading: isLoading,
      isReportError: isError,
    };
  }

  if (attendeesRole?.toLowerCase() === "student") {
    console.log(attendeesRole, documentId);

    const { data, isLoading, isError } = useQuery({
      queryKey: ["studentAtt", "studentAttendenceReportData", ...queryKeys],
      queryFn: async () =>
        await databaseService.getDocument(
          config.studentAttendenceCollectionId,
          documentId
        ),
    });
    console.log(data);
    // const formattedData = data?.sort((a, b) => a.staffId - b.staffId);
    return {
      reportData: data,
      isReportLoading: isLoading,
      isReportError: isError,
    };
  }
  if (attendeesRole?.toLowerCase() === "teacher") {
    const { data, isLoading, isError } = useQuery({
      queryKey: ["teacherAtt", "teacherAttendenceReportData", ...queryKeys],
      queryFn: async () =>
        await databaseService.getDocument(
          config.teacherAttendenceCollectionId,
          documentId
        ),
    });
    console.log(data);
    // const formattedData = data?.sort((a, b) => a.staffId - b.staffId);
    return {
      reportData: data,
      isReportLoading: isLoading,
      isReportError: isError,
    };
  }
  return {
    reportData: {
      Report: "ntg",
    },
    isReportLoading: false,
    isReportError: false,
  };
}

export default ViewAttendancePage;
