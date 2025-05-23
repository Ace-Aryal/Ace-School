import React from "react";
import { Button } from "../Atoms/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import ErrorPage from "@/pages/ErrorPage";
import { DataTable } from "../Organisms/Datatable/Datatable";

const ViewUsers = ({ role, data, columns }) => {
  const navigate = useNavigate();
  const { roles } = useSelector((state) => state?.auth?.user);
  const roleObject = {
    teacher: "Teacher",
    student: "Student",
    staff: "Staff",
    getRole: (role) => {
      return roleObject[role];
    },
  };
  if (roles.some((role) => role !== "teacher" && role !== "admin")) {
    return <ErrorPage />;
  }

  return (
    <main className="container mx-auto flex flex-col items-center m-2 p-5 w-full">
      <section id="top" className="flex justify-between items-center w-full">
        <h2 className="text-3xl font-semibold text-indigo-600">{`${roleObject.getRole(
          role
        )}s`}</h2>

        {/* { conditional rendering to add student page for access control} */}

        {(role.toLowerCase() === "student" &&
          roles.some((role) => role === "account" || role === "admin")) ||
        roles.includes("admin") ? (
          <Button
            onClick={() => {
              navigate(`/view-${role}s/add-${role}`);
            }}
            className="w-fit self-end hover:bg-orange-600 text-gray-50 bg-red-500 cursor-pointer my-3"
          >
            Add new {roleObject.getRole(role)}
            <Plus />
          </Button>
        ) : (
          ""
        )}
      </section>
      <section
        id="data-table-container"
        className="max-w-full overflow-x-scroll"
      >
        <DataTable data={data} columns={columns} role={role} />
      </section>
    </main>
  );
};

export default ViewUsers;
