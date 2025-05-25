import { staffColumns } from "@/components/Organisms/Datatable/Columns";
import ViewUsers from "@/components/Templates/ViewUsersTemplate";
import React from "react";

const ViewStaffsPage = () => {
  return <ViewUsers role="staff" columns={staffColumns} />;
};

export default ViewStaffsPage;
