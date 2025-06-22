import React from "react";
import { Button } from "../ui/button";
import { Eye, Link, Plus } from "lucide-react";
import { NavLink } from "react-router";
import { QueryClient, useQuery } from "@tanstack/react-query";
import databaseService from "@/appwrite/Database/database";
import config from "@/appwrite";
import NepaliDate from "nepali-datetime";
import { catchError } from "@/utils/catchError";
import LoadingPage from "@/pages/LoadingPage";
import ErrorPage from "@/pages/ErrorPage";
const queryClient = new QueryClient();
const AttendenceViewCard = ({ userRole, ...className }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [userRole],
    queryFn: async () => {
      const now = new NepaliDate().toString().trim().slice(0, 10);
      let collectionId;
      console.log(userRole);
      if (userRole.toLowerCase() === "staff") {
        collectionId = config.staffAttendenceCollectionId;
      }
      if (userRole.toLowerCase() === "student") {
        collectionId = config.studentAttendenceCollectionId;
      }
      if (userRole.toLowerCase() === "teacher") {
        collectionId = config.teacherAttendenceCollectionId;
      }
      const respone = await databaseService.getAttendanceStats(
        collectionId,
        now,
        userRole.toLowerCase()
      );
      return (
        respone || {
          present: 0,
          absent: 0,
          onleave: 0,
        }
      );
    },
  });
  if (isLoading) {
    return (
      <div className="  w-full  myshadow-sm border  border-gray-200 p-6 bg-gray-300 rounded-xl  ">
        <div className=" min-w-40 min-h-60 bg-gray-300 rounded-lg   animate-pulse  lg:min-w-64"></div>
      </div>
    );
  }
  if (isError) {
    return <ErrorPage />;
  }
  return (
    <div className=" entryAnimation w-full  myshadow-sm border  border-gray-200 p-6 hover:bg-gray-100  rounded-xl  ">
      <div className=" min-w-40  lg:min-w-64">
        <h2 className="text-2xl font-semibold"> {userRole} Attendence</h2>
        <p className="text-sm text-gray-500">
          Manage attendence of {userRole.toLowerCase()}s
        </p>
      </div>
      <div className="flex flex-col my-1.5 px-1 text font-medium">
        <div className="text text-zinc-600 ">present : {data.present}</div>
        <div className="text text-zinc-600">Absent : {data.absent}</div>
        <div className="text text-zinc-600">On Leave : {data.onleave}</div>
      </div>
      <div className="my-1.5">
        <NavLink to={`/view-${userRole.toLowerCase()}s`}>
          <Button className=" p-0 text-indigo-800  cursor-pointer">
            <Link className="mx-0" /> View individual reports
          </Button>
        </NavLink>
      </div>
      <div className="my-2">
        <NavLink state={{ userRole }} to="/attendance/add-attendance">
          {" "}
          <Button className="bg-blue-100 hover:bg-blue-200 text-blue-600 cursor-pointer">
            Add new Attendence <Plus />
          </Button>
        </NavLink>
      </div>
      <div className="my-1.5">
        <NavLink state={{ userRole }} to="/attendance/view-records">
          <Button
            className="bg-orange-100 hover:bg-orange-200 text-orange-600 cursor-pointer"
            variant="filled"
          >
            View {userRole}s Attendence <Eye />
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default AttendenceViewCard;
