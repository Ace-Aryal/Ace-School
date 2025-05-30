import AuthenticatedContainer from "@/components/Templates/AuthenticatedContainer";
import { showErrorToast, showSuccessToast } from "@/components/Templates/toast";
import React from "react";
import AdminAttendencePanel from "@/components/Organisms/AdminAttendencePanel";
import { useSelector } from "react-redux";
const AttendancePage = () => {
  const roles = useSelector((state) => state.auth.user.roles);
  return (
    <AuthenticatedContainer>
      <div
        className="w-full flex flex-col justify-center items-center"
        id="top"
      >
        <section
          className=" w-fit  flex flex-col justify-center items-center min-h-[80vh] "
          id="bottom"
        >
          <h2 className="text-3xl  w-[95%]  font-semibold text-zinc-800">
            Attendance
          </h2>
          <AdminAttendencePanel />
        </section>
      </div>
    </AuthenticatedContainer>
  );
};

export default AttendancePage;
