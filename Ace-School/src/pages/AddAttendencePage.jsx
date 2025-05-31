import databaseService from "@/appwrite/Database/database";
import { AttendanceDatatable } from "@/components/Organisms/Datatable/AttendanceDatatable";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLocation } from "react-router";

const AddAttendencePage = () => {
  const [grade, setGrade] = useState("nursery");

  const location = useLocation();
  const userRole = location.state?.userRole || null;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["studentAttendenceData", grade],
    queryFn: async () => await databaseService.getAllStudentsDocs(grade),
  });
  if (!userRole) {
    return (
      <div className="w-full h-[90vh] flex justify-center items-center">
        <p>Please Navigte through buttons not via url</p>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="sm:w-9/10 w-full md:w-4/5">
        <AttendanceDatatable
          attendeesRole={userRole}
          setGrade={setGrade}
          data={data}
        />
      </div>
    </div>
  );
};

export default AddAttendencePage;
