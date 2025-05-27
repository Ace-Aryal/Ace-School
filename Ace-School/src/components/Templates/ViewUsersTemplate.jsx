import React from "react";
import { Button } from "../Atoms/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import ErrorPage from "@/pages/ErrorPage";
import { DataTable } from "../Organisms/Datatable/Datatable";

const ViewUsers = ({
  role,
  columns,
  data,
  isLoading,

  error,

  setGrade,
}) => {
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
    <main className="container  flex flex-col items-center  p-5 w-full">
      <section id="top" className="flex justify-between items-center w-full">
        <h2 className="text-3xl font-semibold text-zinc-800">{`${roleObject.getRole(
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
            className=" self-end hover:bg-zinc-600 text-gray-50 bg-zinc-800 cursor-pointer my-3"
          >
            Add new {roleObject.getRole(role)}
            <Plus />
          </Button>
        ) : (
          ""
        )}
      </section>
      <section className="w-full m-0 p-0 overflow-x-auto">
        <DataTable
          columns={columns}
          role={role}
          data={data}
          isLoading={isLoading}
          error={error}
          setGrade={setGrade}
        />
      </section>
    </main>
  );
};

export default ViewUsers;
