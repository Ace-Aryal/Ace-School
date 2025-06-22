import config from "@/appwrite";
import databaseService from "@/appwrite/Database/database";
import AuthenticatedContainer from "@/components/Templates/AuthenticatedContainer";
import { useQuery, QueryClient } from "@tanstack/react-query";
import NepaliDate from "nepali-datetime";
import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import LoadingPage from "./LoadingPage";
import NepaliDatePicker from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
import GeneralErrorPage from "./GeneralErrorPage";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

function ViewAttendancePage() {
  const location = useLocation();
  const queryClinet = new QueryClient();
  const userRole = location.state?.userRole.toLowerCase() || null;
  const now = new NepaliDate().toString().trim().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(now);
  const [retry, setRetry] = useState(0);
  let { reportData, isReportLoading, isReportError } = useAttendenceReportQuery(
    userRole,
    selectedDate,
    [selectedDate]
  );
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
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

  if (isReportError)
    return (
      <GeneralErrorPage message="Internal server error or attendance hasn't been submitted yet" />
    );
  if (isReportLoading)
    return (
      <AuthenticatedContainer>
        <h1
          id="top"
          className="text-3xl font-bold text-center text-zinc-800 border-b border-zinc-200 pb-4 mb-6"
        >
          View Attendance Records
        </h1>

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
        <LoadingPage />
      </AuthenticatedContainer>
    );

  if (reportData === 404) {
    return (
      <AuthenticatedContainer>
        <h1
          id="top"
          className="text-3xl font-bold text-center text-zinc-800 border-b border-zinc-200 pb-4 mb-6"
        >
          View Attendance Records
        </h1>

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
        <GeneralErrorPage message=" Attendance not available" />
      </AuthenticatedContainer>
    );
  }

  const attendanceStats = {
    absent: 0,
    present: 0,
    onLeave: 0,
    getPercentage() {
      const total = this.absent + this.present + this.onLeave;
      return total < 1 ? "0.00" : ((this.present / total) * 100).toFixed(2);
    },
    resetStats() {
      this.absent = 0;
      this.present = 0;
      this.onLeave = 0;
    },
  };

  if (userRole !== "student") {
    reportData = JSON.parse(reportData.Report).sort((a, b) => a.id - b.id);
  } else {
    reportData = JSON.parse(reportData.Report);
    reportData = orderedGrades.map((grade) => reportData[grade] || []);
    reportData = reportData.map((grade) =>
      grade.sort((a, b) => a.roll - b.roll)
    );
  }

  return (
    <AuthenticatedContainer>
      <h1
        id="top"
        className="text-3xl font-bold text-center text-zinc-800 border-b border-zinc-200 pb-4 mb-6"
      >
        View Attendance Records
      </h1>

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

      <section className="w-full flex flex-col items-center gap-10">
        {userRole === "student" ? (
          reportData.map((grade, index) => {
            attendanceStats.resetStats();
            return (
              <div key={index} className="w-full max-w-3xl space-y-4">
                <h2 className="text-2xl font-semibold text-zinc-700 text-center">
                  Grade {orderedGrades[index]}
                </h2>

                <div className="overflow-x-auto rounded-md shadow border border-zinc-200">
                  <table className="w-full text-sm text-zinc-800">
                    <thead className="bg-zinc-100 text-zinc-700 font-semibold">
                      <tr>
                        <th className="p-2 border">Roll No</th>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Attendance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grade.map((attendee, idx) => {
                        const att = attendee.att;
                        if (att === "present") attendanceStats.present++;
                        else if (att === "onleave") attendanceStats.onLeave++;
                        else if (att === "absent" || att === "noattendance")
                          attendanceStats.absent++;

                        return (
                          <tr
                            key={attendee.roll}
                            className={`${
                              idx % 2 === 0 ? "bg-white" : "bg-zinc-50"
                            } border-b`}
                          >
                            <td className="p-2 border text-center">
                              {attendee.roll}
                            </td>
                            <td className="p-2 border">{attendee.name}</td>
                            <td
                              className={`${
                                att === "present"
                                  ? "bg-green-100 text-green-600"
                                  : att === "absent"
                                  ? "bg-red-100 text-red-600"
                                  : att === "onleave"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-yellow-100 text-yellow-600"
                              } p-2 border capitalize`}
                            >
                              {att}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <ul className="flex flex-wrap justify-center gap-4 mt-3 text-sm sm:text-base">
                  <li className="text-green-600 bg-green-100 px-3 py-1 rounded shadow">
                    Present: {attendanceStats.present}
                  </li>
                  <li className="text-red-600 bg-red-100 px-3 py-1 rounded shadow">
                    Absent: {attendanceStats.absent}
                  </li>
                  <li className="text-blue-600 bg-blue-100 px-3 py-1 rounded shadow">
                    On Leave: {attendanceStats.onLeave}
                  </li>
                  <li className="text-zinc-700 bg-zinc-100 px-3 py-1 rounded shadow">
                    Percentage: {attendanceStats.getPercentage()}%
                  </li>
                </ul>
              </div>
            );
          })
        ) : (
          <div className="w-full max-w-3xl space-y-4">
            <h2 className="text-2xl font-semibold text-zinc-700 text-center">
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Attendance
            </h2>

            <div className="overflow-x-auto rounded-md shadow border border-zinc-200">
              <table className="w-full text-sm text-zinc-800">
                <thead className="bg-zinc-100 text-zinc-700 font-semibold">
                  <tr>
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((attendee, idx) => {
                    const att = attendee.att;
                    if (att === "present") attendanceStats.present++;
                    else if (att === "onleave") attendanceStats.onLeave++;
                    else if (att === "absent" || att === "noattendance")
                      attendanceStats.absent++;

                    return (
                      <tr
                        key={attendee.id}
                        className={`${
                          idx % 2 === 0 ? "bg-white" : "bg-zinc-50"
                        } border-b`}
                      >
                        <td className="p-2 border text-center">
                          {attendee.id}
                        </td>
                        <td className="p-2 border">{attendee.name}</td>
                        <td
                          className={`${
                            att === "present"
                              ? "bg-green-100 text-green-600"
                              : att === "absent"
                              ? "bg-red-100 text-red-600"
                              : att === "onleave"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-yellow-100 text-yellow-600"
                          } p-2 border capitalize`}
                        >
                          {att}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <ul className="flex flex-wrap justify-center gap-4 mt-3 text-sm sm:text-base">
              <li className="text-green-600 bg-green-100 px-3 py-1 rounded shadow">
                Present: {attendanceStats.present}
              </li>
              <li className="text-red-600 bg-red-100 px-3 py-1 rounded shadow">
                Absent: {attendanceStats.absent}
              </li>
              <li className="text-blue-600 bg-blue-100 px-3 py-1 rounded shadow">
                On Leave: {attendanceStats.onLeave}
              </li>
              <li className="text-zinc-700 bg-zinc-100 px-3 py-1 rounded shadow">
                Percentage: {attendanceStats.getPercentage()}%
              </li>
            </ul>
          </div>
        )}
      </section>
      <div className="w-full flex bottom-5 mt-5 fixed ">
        <Button
          onClick={scrollToTop}
          className="rounded-full  bg-orange-100 text-orange-700"
        >
          {" "}
          <ArrowUp />{" "}
        </Button>
      </div>
    </AuthenticatedContainer>
  );
}

export function useAttendenceReportQuery(attendeesRole, documentId, queryKeys) {
  if (attendeesRole?.toLowerCase() === "staff") {
    const { data, isLoading, isError } = useQuery({
      queryKey: ["staffAtt", "staffAttendenceReportData", ...queryKeys],
      queryFn: async () =>
        await databaseService.getDocument(
          config.staffAttendenceCollectionId,
          documentId
        ),
    });
    return {
      reportData: data,
      isReportLoading: isLoading,
      isReportError: isError,
    };
  }

  if (attendeesRole?.toLowerCase() === "student") {
    const { data, isLoading, isError } = useQuery({
      queryKey: ["studentAtt", "studentAttendenceReportData", ...queryKeys],
      queryFn: async () =>
        await databaseService.getDocument(
          config.studentAttendenceCollectionId,
          documentId
        ),
    });
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
    return {
      reportData: data,
      isReportLoading: isLoading,
      isReportError: isError,
    };
  }

  return {
    reportData: { Report: "ntg" },
    isReportLoading: false,
    isReportError: false,
  };
}

export default ViewAttendancePage;
