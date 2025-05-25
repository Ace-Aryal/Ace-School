import ViewUsers from "@/components/Templates/ViewUsersTemplate";
import React, { useEffect, useState } from "react";
import { studentColumns } from "@/components/Organisms/Datatable/Columns";
import { showErrorToast } from "@/components/Templates/toast";
import databaseService from "@/appwrite/Database/database";
import LoadingPage from "./LoadingPage";
const ViewStudents = () => {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    try {
      const response = await databaseService.getAllStudentsDocs();
      console.log(response);
      const data = [];
      setData(response);
    } catch (error) {
      console.error(error);
      showErrorToast("Failed to fetch data");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (!data) {
    return <LoadingPage />;
  }
  return (
    <div className="w-full flex justify-center m-0 p-0">
      <ViewUsers role="student" columns={studentColumns} data={data} />
    </div>
  );
};

export default ViewStudents;
