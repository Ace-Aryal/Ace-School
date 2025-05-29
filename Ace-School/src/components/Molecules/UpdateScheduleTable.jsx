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
import { Controller, useForm } from "react-hook-form";

import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import databaseService from "@/appwrite/Database/database";
import LoadingPage from "@/pages/LoadingPage";
import ErrorPage from "@/pages/ErrorPage";
import AlertDialogComponent from "./AlertDialog";
import { emptyTableData, subjects } from "@/utils/scheduleConstants";
import Select from "react-select";
const gradeArray = Array.from(
  { length: 9 },
  (_, index) => `Grade ${index + 1}`
);
export function UpdateScheduleTable() {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["scheduleData"],
    queryFn: async () => {
      return await databaseService.getClassSchedule();
    },
  });
  const handleUpdate = async (data) => {
    console.log(data);
    // const updatedData = ""
    //     await databaseService.updateClassSchedule(updatedData)
  };
  const year = new Date().getFullYear();
  if (isLoading) {
    return <LoadingPage />;
  }
  if (isError) {
    return <ErrorPage />;
  }

  return (
    <form className="flex flex-col justify-center items-center gap-2">
      <Table className="border w-full border-gray-500 table-auto ">
        <TableHeader>
          <TableRow>
            <TableHead className="border-r"></TableHead>

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
          {data.map((period, index) => (
            <TableRow key={period.period} className="">
              <TableCell className="border-r">{period.period}</TableCell>
              <TableCell
                key={`nursery${index + 1}`}
                className="font-medium border-r text-sm "
              >
                <Controller
                  name={`nursery-${index + 1}`}
                  control={control}
                  defaultValue={period?.nursery?.map((subject) => ({
                    value: subject?.toLowerCase(),
                    label: period?.nursery,
                  }))}
                  render={({ field }) => (
                    <Select
                      className="border w-48 text-md  rounded bg-gray-100 shadow focus:outline-gray-700"
                      isMulti
                      options={subjects}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
              </TableCell>
              <TableCell className="border-r">
                {" "}
                <Controller
                  name={`LKG-${index + 1}`}
                  control={control}
                  defaultValue={period?.lkg?.map((subject) => ({
                    value: subject.toLowerCase(),
                    label: period?.lkg,
                  }))}
                  render={({ field }) => (
                    <Select
                      className="border text-md w-48  rounded bg-gray-100 shadow focus:outline-gray-700"
                      isMulti
                      options={subjects}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
              </TableCell>
              <TableCell className="border-r">
                {" "}
                <Controller
                  name={`UKG-${index + 1}`}
                  control={control}
                  defaultValue={period?.ukg?.map((subject) => ({
                    value: subject?.toLowerCase(),
                    label: period?.ukg,
                  }))}
                  render={({ field }) => (
                    <Select
                      className="border text-md w-48 rounded bg-gray-100 shadow focus:outline-gray-700"
                      isMulti
                      options={subjects}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
              </TableCell>
              {gradeArray.map((grade) => (
                <TableCell key={grade} className="border-r ">
                  <Controller
                    name={`${grade}-${index + 1}`}
                    control={control}
                    defaultValue={period[
                      grade.toLowerCase().replaceAll(" ", "")
                    ]?.map((subject) => ({
                      value: subject?.toLowerCase(),
                      label: period[grade.toLowerCase().replaceAll(" ", "")],
                    }))}
                    render={({ field }) => (
                      <Select
                        className="border  text-md w-48 rounded bg-gray-100 shadow focus:outline-gray-700"
                        isMulti
                        defaultValue=""
                        options={subjects}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                      />
                    )}
                  />
                </TableCell>
              ))}
              <TableCell className="">
                {" "}
                <Controller
                  name={`Grade 10-${index + 1}`}
                  control={control}
                  defaultValue={period?.grade10?.map((subject) => ({
                    value: subject?.toLowerCase(),
                    label: period?.grade10,
                  }))}
                  render={({ field }) => (
                    <Select
                      className="border text-md w-48  rounded bg-gray-100 shadow focus:outline-gray-700"
                      isMulti
                      defaultValue=""
                      options={subjects}
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AlertDialogComponent
        title="Are you sure you want to update schedule?"
        description="This action will permanently update the timetable "
        buttonText="Update Schedule"
        classNames="bg-red-500 w-fit"
        onContinueFn={handleSubmit(handleUpdate)}
        params={null}
      ></AlertDialogComponent>
    </form>
  );
}
