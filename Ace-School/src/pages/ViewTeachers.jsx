import { teacherColumns } from "@/components/Organisms/Datatable/Columns";
import ViewUsers from "@/components/Templates/ViewUsersTemplate";
import React from "react";

const ViewTeachers = () => {
  return <ViewUsers role="teacher" columns={teacherColumns} />;
};

export default ViewTeachers;
