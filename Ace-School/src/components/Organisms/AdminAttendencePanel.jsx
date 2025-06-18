import React from "react";
import AttendenceViewCard from "../Molecules/AttendenceViewCard";
import SelfAttendenceView from "./SelfAttendenceView";
import { useSelector } from "react-redux";

const AdminAttendencePanel = () => {
  const roles = useSelector((state) => state.auth.user.roles);
  if (roles.includes("admin")) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-fit  space-y-5 md:space-y-0 md:flex-row justify-center gap-5 p-2  ">
        <AttendenceViewCard userRole="Teacher" />
        <AttendenceViewCard userRole="Staff" />
        <AttendenceViewCard userRole="Student" />
      </div>
    );
  }
  if (roles.includes("account") || roles.includes("teacher")) {
    return (
      <div className="flex w-full flex-col space-y-5 md:space-y-0 md:flex-row justify-center gap-2 p-2  ">
        <AttendenceViewCard userRole="Student" />
        <section className="w-full " id="user-own-attendence">
          <SelfAttendenceView isNotPriviligedUser={false} />
        </section>
      </div>
    );
  }
  return (
    <div className="flex w-fit flex-col space-y-5 md:space-y-0 md:flex-row justify-center gap-5 p-2  ">
      <section id="user-own-attendence">
        <SelfAttendenceView isNotPriviligedUser={true} className="lg:px-10" />
      </section>
    </div>
  );
};

export default AdminAttendencePanel;
