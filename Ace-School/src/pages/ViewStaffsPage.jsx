import databaseService from "@/appwrite/Database/database";
import { staffColumns } from "@/components/Organisms/Datatable/Columns";
import ViewUsers from "@/components/Templates/ViewUsersTemplate";
import { useQuery } from "@tanstack/react-query";
import React from "react";
const ViewStaffsPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["staffs"],
    queryFn: async () => {
      try {
        return await databaseService.getAllStaffsDocument();
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <ViewUsers
      role="staff"
      columns={staffColumns}
      data={data}
      isLoading={isLoading}
      error={error}
      setGrade={null}
      key="staff"
    />
  );
};

export default ViewStaffsPage;
