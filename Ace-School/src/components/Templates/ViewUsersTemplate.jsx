import React from "react";
import { Button } from "../Atoms/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
const ViewUsers = ({ role, dataTable }) => {
  const navigate = useNavigate();
  const roleObject = {
    teacher: "Teacher",
    student: "Student",
    staff: "Staff",
    getRole: (role) => {
      return roleObject[role];
    },
  };
  return (
    <main className="container mx-auto flex flex-col items-center m-2 p-5 w-full">
      <section id="top" className="flex justify-between items-center w-full">
        <h2 className="text-3xl font-semibold text-indigo-600">{`${roleObject.getRole(
          role
        )}s`}</h2>
        {role === "Students" && (
          <select>
            <option value="Hello">Hi</option>
          </select>
        )}
        <Button
          onClick={() => {
            navigate(`/view-${role}s/add-${role}`);
          }}
          className="w-fit self-end hover:bg-orange-600 text-gray-50 bg-red-500 cursor-pointer my-3"
        >
          Add new {roleObject.getRole(role)}
          <Plus />
        </Button>
      </section>
    </main>
  );
};

export default ViewUsers;
