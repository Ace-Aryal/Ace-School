import ViewUsers from "@/components/Templates/ViewUsersTemplate";
import { studentColumns } from "@/components/Organisms/Datatable/Columns";
import React, { useEffect, useState } from "react";

const ViewStudents = () => {
  return (
    <div className="w-full flex justify-center m-0 p-0">
      <ViewUsers role="student" columns={studentColumns} />
    </div>
  );
};

export default ViewStudents;
