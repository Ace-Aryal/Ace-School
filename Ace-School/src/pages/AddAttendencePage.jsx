import databaseService from "@/appwrite/Database/database";
import { AttendanceDatatable } from "@/components/Organisms/Datatable/AttendanceDatatable";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLocation } from "react-router";
import LoadingPage from "./LoadingPage";
import config from "@/appwrite";

const AddAttendencePage = () => {
  const [grade, setGrade] = useState("nursery");
  const location = useLocation();
  const userRole = location.state?.userRole.toLowerCase() || null;
  const { data, isLoading, isError } = useAttendenceQuery(userRole, grade);
  const { reportData, isReportLoading, isReportError } =
    useAttendenceReportQuery(userRole);
  if (!userRole) {
    return (
      <div className="w-full h-[90vh] flex justify-center items-center">
        <p>Please Navigte through buttons not via url</p>
      </div>
    );
  }

  if (isError || isReportError) {
    return (
      <div className="h-[90vh w-full grid place-items-center">
        <p>Error Fetching data from database, try refreshing</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="sm:w-9/10 w-full md:w-4/5">
        <AttendanceDatatable
          attendeesRole={userRole}
          setGrade={setGrade}
          data={data || []}
          grade={grade}
          isLoading={isLoading}
          reportData={reportData}
        />
      </div>
    </div>
  );
};

export function useAttendenceReportQuery(attendeesRole) {
  // to update report

  // if (attendeesRole?.toLowerCase() === "staff") {
  //   const { data, isLoading, isError } = useQuery({
  //     queryKey: ["studentAtt", "studentAttendenceReportData", grade],
  //     queryFn: async () => await databaseService.getAllStudentsDocs(grade),
  //   });
  //   const formattedData = data?.sort((a, b) => a.rollNo - b.rollNo);
  //   return { data: formattedData, isLoading, isError };
  // }

  // if (attendeesRole?.toLowerCase() === "student") {
  //   {
  //     const { data, isLoading, isError } = useQuery({
  //       queryKey: ["staffAtt", "staffAttendenceReportData"],
  //       queryFn: async () =>
  //         await databaseService.getDocument(
  //           config.studentAttendenceCollectionId,
  //           config.studentAttendenceDocummentId
  //         ),
  //     });
  //     console.log(data);
  //     // const formattedData = data?.sort((a, b) => a.staffId - b.staffId);
  //     return {
  //       reportData: data,
  //       isReportLoading: isLoading,
  //       isReportError: isError,
  //     };
  //   }
  // }
  // if (attendeesRole?.toLowerCase() === "teacher") {
  //   {
  //     const { data, isLoading, isError } = useQuery({
  //       queryKey: ["teacherAtt", "teacherAttendenceReportData"],
  //       queryFn: async () => await databaseService.getAllTeachersDocument(),
  //     });
  //     const formattedData = data?.sort((a, b) => a.teacherId - b.teacherId);
  //     return { data: formattedData, isLoading, isError };
  //   }
  // }
  return {
    reportData: {
      report: "ntg",
    },
    isReportLoading: false,
    isReportError: false,
  };
}

export function useAttendenceQuery(attendeesRole, grade) {
  if (attendeesRole?.toLowerCase() === "student") {
    {
      const { data, isLoading, isError } = useQuery({
        queryKey: ["studentAtt", "studentAttendenceData", grade],
        queryFn: async () => await databaseService.getAllStudentsDocs(grade),
      });
      const formattedData = data?.sort((a, b) => a.rollNo - b.rollNo);
      return { data: formattedData, isLoading, isError };
    }
  }
  if (attendeesRole?.toLowerCase() === "staff") {
    {
      const { data, isLoading, isError } = useQuery({
        queryKey: ["staffAtt", "staffAttendenceData"],
        queryFn: async () => await databaseService.getAllStaffsDocument(),
      });
      const formattedData = data?.sort((a, b) => a.staffId - b.staffId);
      return { data: formattedData, isLoading, isError };
    }
  }
  if (attendeesRole?.toLowerCase() === "teacher") {
    {
      const { data, isLoading, isError } = useQuery({
        queryKey: ["teacherAtt", "teacherAttendenceData"],
        queryFn: async () => await databaseService.getAllTeachersDocument(),
      });
      const formattedData = data?.sort((a, b) => a.teacherId - b.teacherId);
      console.log(formattedData);
      return { data: formattedData, isLoading, isError };
    }
  }
  return { data: false, isLoading: false, isError: true };
}

export default AddAttendencePage;
