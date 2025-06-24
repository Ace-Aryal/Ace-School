import React from "react";
import config from "@/appwrite";
import { useQuery } from "@tanstack/react-query";
import databaseService from "@/appwrite/Database/database";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import PieDonut from "./PieOnly";
import UnscrambleGame from "../Organisms/ScrambleGame";
import LoadingPage from "@/pages/LoadingPage";
import { Button } from "../Atoms/button";
import StudentCharts from "./StudentCharts";

function PersonalInfo() {
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
    return (
      <div className="w-full h-full grow grid place-items-center">
        <LoadingPage />
      </div>
    );
  }
  if (!data.total) {
    return null;
  }

  const selfDocument = data.documents[0];
  let classes = "";
  let subjects = "";
  const { sex, DOB, attendance, gender } = selfDocument;
  if (selfDocument.classes) {
    classes = JSON.parse(selfDocument.classes)
      .map((grade) => grade.label)
      .join(",");
  }
  if (selfDocument.subjectsTaught) {
    subjects = JSON.parse(selfDocument.subjectsTaught)
      .map((subject) => subject.label)
      .join(",");
  }
  console.log("self data", selfDocument);
  return (
    <section
      className="flex flex-wrap flex-col sm:flex-row gap-8 sm:flex-nowrap mt-5 w-full sm:mt-8"
      id="main-content"
    >
      <div id="personal-info" className="space-y-4 w-full sm:w-9/20  ">
        <div>
          {selfDocument.teacherName && (
            <h2 className="capitalize text-4xl font-bold text-gray-800">
              Hello, {selfDocument.teacherName}
            </h2>
          )}
          {selfDocument.studentName && (
            <h2 className="capitalize text-4xl font-bold text-gray-800">
              Hello, {selfDocument.studentName}
            </h2>
          )}
          {selfDocument.fullName && (
            <h2 className="capitalize text-4xl font-bold text-gray-800">
              Hello, {selfDocument.fullName}
            </h2>
          )}
          <h3 className="text-lg text-gray-600 mt-2">
            Wishing you a meaningful day of learning and growth
          </h3>
          <p className="mt-2 hidden sm:block text-base text-gray-500 max-w-xl">
            Let's make today productive, connected, and impactful. Together, we
            build a better learning environment — one action, one lesson, one
            moment at a time.
          </p>
        </div>

        <div className="rounded-lg  bg-white w-full text-sm text-gray-700 space-y-2">
          <p>
            <span className="font-semibold text-gray-800">Email:</span> {email}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Date of Birth:</span>{" "}
            {DOB}
          </p>
          <p className="capitalize">
            <span className=" capitalize font-semibold text-gray-800">
              Gender:
            </span>{" "}
            {sex || gender}
          </p>
          {selfDocument.grade && (
            <p>
              <span className="font-semibold text-gray-800">Grade:</span>{" "}
              {selfDocument.grade}
            </p>
          )}
          {selfDocument.teacherId && (
            <p>
              <span className="font-semibold text-gray-800">ID:</span>{" "}
              {selfDocument.teacherId}
            </p>
          )}
          {selfDocument.rollNo && (
            <p>
              <span className="font-semibold text-gray-800">Roll No:</span>{" "}
              {selfDocument.rollNo}
            </p>
          )}
          {selfDocument.scholarship && (
            <p>
              <span className="font-semibold text-gray-800">Scholarship:</span>{" "}
              {selfDocument.scholarship}%
            </p>
          )}
          {selfDocument.discount && (
            <p>
              <span className="font-semibold text-gray-800">Discount:</span> Rs.
              {selfDocument.discount}
            </p>
          )}
          {selfDocument.stream && (
            <p>
              <span className="font-semibold text-gray-800">Stream:</span>{" "}
              {selfDocument.stream}
            </p>
          )}
          {selfDocument.stream && (
            <p>
              <span className="font-semibold text-gray-800">Stream:</span>{" "}
              {selfDocument.stream}
            </p>
          )}

          {selfDocument.subjectsTaught && (
            <p>
              <span className="font-semibold text-gray-800">Subjects:</span>{" "}
              {subjects}
            </p>
          )}
          {selfDocument.classes && (
            <p>
              <span className="font-semibold text-gray-800">Classes:</span>{" "}
              {classes}
            </p>
          )}
          {selfDocument.role && (
            <p>
              <span className="font-semibold text-gray-800">Role:</span>{" "}
              {selfDocument.role}
            </p>
          )}
        </div>
      </div>

      <div id="actions" className="flex w-full flex-col sm:w-11/20">
        <div
          id="top"
          className="h-1/3 bg-gray-100 p-4 shadow-md flex flex-col justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome Back 👋
            </h1>
            <p className="text-sm text-gray-500">
              Here's your attendance summary for today
            </p>
          </div>

          {/* Attendance Info */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              <p className="font-medium">Attendance:</p>
              <p
                className={` capitalize ${
                  attendance === "present"
                    ? " text-green-600"
                    : attendance === "onleave"
                    ? " text-blue-600 "
                    : " text-red-600"
                }  font-semibold`}
              >
                {selfDocument.attendance === "noattendance"
                  ? "N/A"
                  : selfDocument.attendance}
              </p>
            </div>
            <NavLink to="/attendance " stat>
              <button className="bg-blue-200 text-blue-600 px-4 py-2 rounded-lg hover:bg-indigo-200 transition">
                View Full Attendance
              </button>
            </NavLink>
          </div>
        </div>
        {roles.includes("student") ? (
          <StudentCharts feeDocumentId={selfDocument.feeDocumentId} />
        ) : (
          <UnscrambleGame />
        )}
      </div>
    </section>
  );
}

export default PersonalInfo;
