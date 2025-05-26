import databaseService from "@/appwrite/Database/database";
import { teacherColumns } from "@/components/Organisms/Datatable/Columns";
import ViewUsers from "@/components/Templates/ViewUsersTemplate";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ViewTeachers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      try {
        return await databaseService.getAllTeachersDocument();
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <ViewUsers
      role="teacher"
      columns={teacherColumns}
      data={data}
      isLoading={isLoading}
      error={error}
      setGrade={null}
      key="teacher"
    />
  );
};

export default ViewTeachers;
