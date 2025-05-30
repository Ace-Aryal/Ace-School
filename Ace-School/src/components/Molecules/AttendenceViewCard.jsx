import React from "react";
import { Button } from "../ui/button";
import { Eye, Link, Plus } from "lucide-react";
import { NavLink } from "react-router";

const AttendenceViewCard = ({ userRole, ...className }) => {
  return (
    <div className=" entryAnimation  myshadow-sm border w-fit border-gray-200 p-6 hover:bg-gray-100  rounded-xl  ">
      <div className=" min-w-40  lg:min-w-64">
        <h2 className="text-2xl font-semibold"> {userRole} Attendence</h2>
        <p className="text-sm text-gray-500">
          Manage attendence of {userRole.toLowerCase()}s
        </p>
      </div>
      <div className="flex flex-col my-1.5 px-1 text font-medium">
        <div className="text text-zinc-600 ">present : 1</div>
        <div className="text text-zinc-600">Absent : 2</div>
        <div className="text text-zinc-600">On Leave : 3</div>
      </div>
      <div className="my-1.5">
        <NavLink to={`/view-${userRole.toLowerCase()}s`}>
          <Button className=" p-0 text-indigo-800  cursor-pointer">
            <Link className="mx-0" /> View individual reports
          </Button>
        </NavLink>
      </div>
      <div className="my-2">
        <Button className="bg-zinc-800 text-white cursor-pointer">
          Add new Attendence <Plus />
        </Button>
      </div>
      <div className="my-1.5">
        <Button className="text-zinc-800 cursor-pointer" variant="outline">
          View {userRole}s Attendence <Eye />
        </Button>
      </div>
    </div>
  );
};

export default AttendenceViewCard;
