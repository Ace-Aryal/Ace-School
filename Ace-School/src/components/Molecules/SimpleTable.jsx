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
import { useQuery } from "@tanstack/react-query";
import databaseService from "@/appwrite/Database/database";
import LoadingPage from "@/pages/LoadingPage";
import ErrorPage from "@/pages/ErrorPage";
import AlertDialogComponent from "./AlertDialog";
import { emptyTableData } from "@/utils/scheduleConstants";

const gradeArray = Array.from(
  { length: 9 },
  (_, index) => `Grade ${index + 1}`
);
export function SimpleTable() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["scheduleData"],
    queryFn: async () => {
      return await databaseService.getClassSchedule();
    },
  });
  const year = new Date().getFullYear();
  if (isLoading) {
    return <LoadingPage />;
  }
  if (isError) {
    return <ErrorPage />;
  }
  console.log(data);
  return (
    <Table className="border w-full border-gray-500 ">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] border-r"></TableHead>

          <TableHead className="border-r">Nursery</TableHead>
          <TableHead className="border-r">LKG</TableHead>
          <TableHead className="border-r">UKG</TableHead>
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
            <TableCell className="font-medium border-r">
              {period.period}
            </TableCell>
            <TableCell className="border-r">
              {period.nursery.join(",")}
            </TableCell>
            <TableCell className="border-r">{period.lkg.join(",")}</TableCell>
            <TableCell className="border-r">{period.ukg.join(",")}</TableCell>
            {gradeArray.map((grade) => (
              <TableCell key={grade} className="border-r">
                {period[grade.toLowerCase().replaceAll(" ", "")].join(",")}
              </TableCell>
            ))}
            <TableCell className="">{period.grade10.join(",")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>
            <div className="w-full flex ">
              <AlertDialogComponent
                title="Are you sure you want to reset schedule?"
                description="This action will permanently reset the timetable "
                buttonText="Reset Schedule"
                classNames="bg-red-500"
                onContinueFn={databaseService.updateClassSchedule}
                params={emptyTableData}
              ></AlertDialogComponent>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
