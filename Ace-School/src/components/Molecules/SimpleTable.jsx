import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "../ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import databaseService from "@/appwrite/Database/database";
import LoadingPage from "@/pages/LoadingPage";
import ErrorPage from "@/pages/ErrorPage";
import AlertDialogComponent from "./AlertDialog";
import { emptyTableData } from "@/utils/scheduleConstants";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const gradeArray = Array.from(
  { length: 9 },
  (_, index) => `Grade ${index + 1}`
);
export function SimpleTable() {
  const queryClient = useQueryClient();
  const roles = useSelector((state) => state.auth.user.roles);
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["scheduleData"],
    queryFn: async () => {
      return await databaseService.getClassSchedule();
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const handleReset = async (data) => {
    await databaseService.updateClassSchedule(emptyTableData);
  };
  if (isLoading) {
    return <LoadingPage />;
  }
  if (isError) {
    return <ErrorPage />;
  }
  return (
    <Table className="border  w-full border-gray-500 ">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] border-r "></TableHead>

          <TableHead className="border-r ">Nursery</TableHead>
          <TableHead className="border-r ">LKG</TableHead>
          <TableHead className="border-r ">UKG</TableHead>
          {gradeArray.map((grade) => (
            <TableHead key={grade} className="border-r">
              {grade}
            </TableHead>
          ))}
          <TableHead className="">Grade 10</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((period) => (
          <TableRow key={period.period}>
            <TableCell className="font-medium border-r ">
              {period.period}
            </TableCell>
            <TableCell className="border-r statEntry">
              {period.nursery.join(",")}
            </TableCell>
            <TableCell className="border-r statEntry">
              {period.lkg.join(",")}
            </TableCell>
            <TableCell className="border-r statEntry">
              {period.ukg.join(",")}
            </TableCell>
            {gradeArray.map((grade) => (
              <TableCell key={grade} className="border-r statEntry">
                {period[grade.toLowerCase().replaceAll(" ", "")].join(",")}
              </TableCell>
            ))}
            <TableCell className="statEntry">
              {period.grade10.join(",")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {roles.includes("admin") && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              <div className="w-full flex ">
                <AlertDialogComponent
                  title="Are you sure you want to reset schedule?"
                  description="This action will permanently reset the timetable "
                  buttonText="Reset Schedule"
                  onContinueFn={handleReset}
                  invalidate={() =>
                    queryClient.invalidateQueries(["scheduleData"])
                  }
                ></AlertDialogComponent>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}
