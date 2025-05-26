import ViewUsers from "@/components/Templates/ViewUsersTemplate";
import { studentColumns } from "@/components/Organisms/Datatable/Columns";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import databaseService from "@/appwrite/Database/database";
const ViewStudents = () => {
  const [grade, setGrade] = useState(null);
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      try {
        return await databaseService.getAllStudentsDocs(grade);
      } catch (error) {
        console.error(error);
      }
    },
  });
  useEffect(() => {
    refetch();
  }, [grade]);
  return (
    <div className="w-full flex justify-center m-0 p-0">
      <ViewUsers
        role="student"
        columns={studentColumns}
        data={data}
        isLoading={isLoading}
        error={error}
        setGrade={setGrade}
      />
    </div>
  );
};

export default ViewStudents;
