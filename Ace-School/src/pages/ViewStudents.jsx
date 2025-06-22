import ViewUsers from "@/components/Templates/ViewUsersTemplate";
import { studentColumns } from "@/components/Organisms/Datatable/Columns";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import databaseService from "@/appwrite/Database/database";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
const ViewStudents = () => {
  const [grade, setGrade] = useState(null);
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["students", grade],
    queryFn: async () => {
      try {
        return await databaseService.getAllStudentsDocs(grade);
      } catch (error) {
        console.error(error);
      }
    },
  });

  if (isLoading) {
    return <LoadingPage />;
  }
  if (isError) {
    return <ErrorPage />;
  }

  return (
    <div className="w-full flex justify-center m-0 p-0">
      <ViewUsers
        role="student"
        columns={studentColumns}
        data={data}
        isLoading={isLoading}
        error={error}
        setGrade={setGrade}
        refetch={refetch}
        grade={grade}
      />
    </div>
  );
};

export default ViewStudents;
