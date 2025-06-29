import databaseService from "@/appwrite/Database/database";
import { teacherColumns } from "@/components/Organisms/Datatable/Columns";
import ViewUsers from "@/components/Templates/ViewUsersTemplate";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
const ViewTeachers = () => {
  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      try {
        return await databaseService.getAllTeachersDocument();
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
  console.log(data, "data");

  return (
    <ViewUsers
      role="teacher"
      columns={teacherColumns}
      data={data}
      isLoading={isLoading}
      error={error}
      setGrade={null}
      key="teacher"
      refetch={refetch}
    />
  );
};

export default ViewTeachers;
