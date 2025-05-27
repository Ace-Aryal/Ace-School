import databaseService from "@/appwrite/Database/database";
import { staffColumns } from "@/components/Organisms/Datatable/Columns";
import ViewUsers from "@/components/Templates/ViewUsersTemplate";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
const ViewStaffsPage = () => {
  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ["staffs"],
    queryFn: async () => {
      try {
        return await databaseService.getAllStaffsDocument();
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
    <ViewUsers
      role="staff"
      columns={staffColumns}
      data={data}
      isLoading={isLoading}
      error={error}
      setGrade={null}
      key="staff"
      refetch={refetch}
    />
  );
};

export default ViewStaffsPage;
