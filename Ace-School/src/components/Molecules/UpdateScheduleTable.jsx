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
const UpdateScheduleTable = React.memo(() => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["scheduleData"],
    queryFn: async () => {
      return await databaseService.getClassSchedule();
    },
  });
  const handleUpdate = async (data) => {
    try {
      let updatedData = [];
      let period1 = {
        period: "Period 1",
      };
      let period2 = {
        period: "Period 2",
      };
      let period3 = {
        period: "Period 3",
      };
      let period4 = {
        period: "Period 4",
      };
      let period5 = {
        period: "Period 5",
      };
      let period6 = {
        period: "Period 6",
      };
      let period7 = {
        period: "Period 7",
      };

      for (const element in data) {
        // formats our formdata into tabular data to store into database
        const splittedKey = element.split("-");

        const [grade, period] = splittedKey;
        const key = grade.toLowerCase().replaceAll(" ", "");
        switch (period) {
          case "1":
            {
              console.log(key, data[element]);

              const subjectArray = data[element];
              period1 = {
                ...period1,
                [key]: subjectArray.map((subject) => subject.label) || [],
              };
            }

            break;
          case "2":
            {
              const subjectArray = data[element];
              period2 = {
                ...period2,
                [key]: subjectArray.map((subject) => subject.label) || [],
              };
            }

            break;
          case "3":
            {
              const subjectArray = data[element];
              period3 = {
                ...period3,
                [key]: subjectArray.map((subject) => subject.label) || [],
              };
            }

            break;
          case "4":
            {
              const subjectArray = data[element];
              period4 = {
                ...period4,
                [key]: subjectArray.map((subject) => subject.label) || [],
              };
            }

            break;
          case "5":
            {
              const subjectArray = data[element];
              period5 = {
                ...period5,
                [key]: subjectArray.map((subject) => subject.label) || [],
              };
            }

            break;
          case "6": {
            const subjectArray = data[element];
            period6 = {
              ...period6,
              [key]: subjectArray.map((subject) => subject.label) || [],
            };
          }
          case "7":
            {
              const subjectArray = data[element];
              period7 = {
                ...period7,
                [key]: subjectArray.map((subject) => subject.label) || [],
              };
            }

            break;

          default:
            break;
        }
      }
      updatedData = [
        period1,
        period2,
        period3,
        period4,
        period5,
        period6,
        period7,
      ];
      console.log("updated", updatedData);

      await databaseService.updateClassSchedule(updatedData);
    } catch (error) {
      console.error(error);
    }
  };

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
                  defaultValue={period?.nursery?.map((subject, index) => ({
                    value: subject?.toLowerCase(),
                    label: period?.nursery[index],
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
                  defaultValue={period?.lkg?.map((subject, index) => ({
                    value: subject.toLowerCase(),
                    label: period?.lkg[index],
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
                  defaultValue={period?.ukg?.map((subject, index) => ({
                    value: subject?.toLowerCase(),
                    label: period?.ukg[index],
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
                    ]?.map((subject, index) => ({
                      value: subject?.toLowerCase(),
                      label:
                        period[grade.toLowerCase().replaceAll(" ", "")][index],
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
                  defaultValue={period?.grade10?.map((subject, index) => ({
                    value: subject?.toLowerCase(),
                    label: period?.grade10[index],
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
        refetch={refetch}
      ></AlertDialogComponent>
    </form>
  );
});
