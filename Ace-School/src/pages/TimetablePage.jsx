import { Button } from "@/components/ui/button";
import { FilePenLine } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { SimpleTable } from "@/components/Molecules/SimpleTable";
import AlertDialogComponent from "@/components/Molecules/AlertDialog";
import { NavLink } from "react-router";

const TimetablePage = () => {
  const roles = useSelector((state) => state?.auth?.user?.roles);
  console.log(roles);

  return (
    <div className="w-full mt-14 flex flex-col gap-8 items-center px-2">
      <section id="top" className="flex w-full sm:w-9/10">
        <h2 className="w-full text-2xl sm:text-3xl font-semibold text-zinc-800">
          Class Schedule
        </h2>

        {roles?.includes("admin") && (
          <NavLink to="/timetable/modify-timetable">
            <Button className="bg-blue-100 hover:bg-blue-200 text-blue-600">
              Modify Schedule <FilePenLine />
            </Button>
          </NavLink>
        )}
      </section>
      <section id="bottom" className=" p-0  w-full sm:w-9/10">
        <SimpleTable />
      </section>
    </div>
  );
};

export default TimetablePage;
