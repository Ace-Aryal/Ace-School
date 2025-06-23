import React from "react";
import AuthenticatedContainer from "../Templates/AuthenticatedContainer";
import { Dot } from "lucide-react";
import { Button } from "../ui/button";
import { NavLink } from "react-router";
import { useQuery } from "@tanstack/react-query";
import databaseService from "@/appwrite/Database/database";
import { useSelector } from "react-redux";
import config from "@/appwrite";
import GeneralErrorPage from "@/pages/GeneralErrorPage";

const SelfAttendenceView = ({ isNotPriviligedUser, className }) => {
  const { roles, email } = useSelector((state) => state.auth.user);
  const collectionId = roles.includes("student")
    ? config.appwritreStudentCollectionID
    : roles.includes("teacher")
    ? config.appwritreTeachersCollectionID
    : config.appwritreStaffsCollectionID;

  const { data, isError, isLoading } = useQuery({
    queryKey: ["selfInfo"],
    queryFn: async () => {
      const response = await databaseService.listAllUsersDocument(
        collectionId,
        email
      );
      return response;
    },
  });
  if (isError) {
    return <GeneralErrorPage />;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (data.total < 1) {
    return <p>Sorry, couldn,t find your data</p>;
  }
  const document = data.documents[0];
  const attendanceRecord = JSON.parse(data.documents[0].attendanceRecord);

  const attendanceSelfData = {
    name: document.fullName || document.studentName || document.teacherName,
    attendance: document.attendance,
    present: 0,
    absent: 0,
    onleave: 0,
    total: 0,
    getPerentage() {
      if (this.total === 0) {
        return "0";
      }
      return (this.present / this.total) * 100;
    },
  };
  for (const date in attendanceRecord) {
    const record = attendanceRecord[date];
    if (record === "present") {
      attendanceSelfData.present++;
    }
    if (record === "absent") {
      attendanceSelfData.absent++;
    }
    if (record === "onleave") {
      attendanceSelfData.onleave++;
    }
    attendanceSelfData.total++;
  }
  const { name, attendance, present, absent, onleave, total } =
    attendanceSelfData;
  return (
    <section
      className={`flex py-6 px-2  lg:p-6 w-full items-center justify-center"
      id="self-attendance-view ${className}`}
    >
      <div id="wrapper" className="w-full  ">
        <h2 className="text-zinc-800 text-2xl w-full font-semibold">
          Your Attendence
        </h2>
        <p className=" text-sm text-zinc-600">Track how you have been doing</p>
        <div className="flex  gap-5 font-medium  my-2">
          <span>{name}</span>
          <div
            className={`flex items-center gap-1 ${
              attendance === "present"
                ? "bg-green-200 text-green-600"
                : attendance === "onleave"
                ? "bg-blue-200 text-blue-600 "
                : "bg-red-200 text-red-600"
            }  rounded-full px-2 `}
          >
            <div
              className={` ${
                attendance === "present"
                  ? "bg-green-500"
                  : attendance === "onleave"
                  ? "bg-blue-500"
                  : "bg-red-500"
              } w-2.5 h-2.5 rounded-full `}
            ></div>
            <span className="capitalize">
              {attendance === "noattendance" ? "N/A" : attendance} Today
            </span>
          </div>
        </div>

        <div className="text-red-600 text-sm font-medium my-1">
          Days Absent : {absent}
        </div>

        <div className="text-green-600 text-sm font-medium my-1">
          Days Present : {present}
        </div>
        <div className="text-blue-600 text-sm font-medium my-1">
          Days on leave : {onleave}
        </div>
        <div>
          <NavLink
            state={{
              attendanceRecord,
              personInfo: {
                name: attendanceSelfData.name,
                grade: document.grade || null,
                roll: document.rollNo || null,
                id: document.teacherId || document.staffId || null,
              },
            }}
            to="/attendance/view-individual-records"
          >
            <Button className="bg-orange-100 text-orange-600 my-1.5">
              View Attendence Records
            </Button>
          </NavLink>
        </div>
        <div className="flex text-gray-500   gap-5 font-medium  my-2">
          <div>
            Attended : {present}/{total}
          </div>
          <div>Percetage : {attendanceSelfData.getPerentage()}%</div>
        </div>
      </div>
      {isNotPriviligedUser && (
        <div className={`w-full hidden md:block`}>
          <img
            src="https://fra.cloud.appwrite.io/v1/storage/buckets/682c752b002d9ec17d7b/files/6839cd8d0005359f11e6/view?project=682c6f8e0034a18f87ae&mode=admin"
            alt="filler photo in attendance page"
          />
        </div>
      )}
    </section>
  );
};

export default SelfAttendenceView;
