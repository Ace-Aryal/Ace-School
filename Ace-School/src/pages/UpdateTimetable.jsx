import { UpdateScheduleTable } from "@/components/Molecules/UpdateScheduleTable";
import AuthenticatedContainer from "@/components/Templates/AuthenticatedContainer";
import React from "react";

const UpdateTimetable = () => {
  return (
    <AuthenticatedContainer classnames="flex flex-col gap-8 items-center min-h-[105vh]">
      <h2 className="text-3xl text-zinc-800 w-full font-semibold md:max-w-[70vw] ">
        Update Timetable
      </h2>
      <div className="w-full sm:w-9/10">
        <UpdateScheduleTable />
      </div>
    </AuthenticatedContainer>
  );
};

export default UpdateTimetable;
