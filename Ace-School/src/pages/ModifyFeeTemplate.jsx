import databaseService from "@/appwrite/Database/database";
import FeeTempleteModifyClassForm from "@/components/Molecules/FeeTempleteModifyClassForm";
import AuthenticatedContainer from "@/components/Templates/AuthenticatedContainer";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import { useForm } from "react-hook-form";
import Spinner from "@/components/Atoms/Spinner";
import { catchError } from "@/utils/catchError";
import { showErrorToast, showSuccessToast } from "@/components/Templates/toast";

function ModifyFeeTemplate() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["fee-template"],
    queryFn: databaseService.getFeeTemplate,
  });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const grades = [
    "pg",
    "nursery",
    "lkg",
    "ukg",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
  ];
  const updateFeeTemplate = async (formData) => {
    let adjustData = {};
    let grade;
    if (!formData.grade && !formData.miscellenous) {
      return showErrorToast("Something went wrong");
    }
    if (formData.grade) {
      grade = formData.grade;
      delete formData["grade"];
      adjustData = {
        [grade]: [JSON.stringify(formData)],
      };
    }
    if (formData.miscellenous) {
      adjustData = {
        miscellenous: parseFloat(formData.miscellenous),
      };
    }
    console.log(adjustData, "adjust");
    const { response } = await catchError(() =>
      databaseService.modifyFeeTemplate(adjustData)
    );

    if (!response) {
      return showErrorToast(
        `Error modifying fee template for ${
          grade ? `grade ${grade}` : "miscellenous"
        }`
      );
    }
    return showSuccessToast(
      `Sucessfull updated fee template for ${
        grade ? `grade ${grade}` : "miscellenous"
      }`
    );
  };
  // const {}

  console.log(data);

  return (
    <AuthenticatedContainer classnames="pl-8">
      <div id="top" className="p-3  flex justify-between items-center">
        <h1 className="sm:text-3xl text-2xl font-medium">Fee Template</h1>

        <NavLink to="/billing">
          {" "}
          <Button
            className="bg-blue-100 text-blue-600 hover:bg-blue-200 *:"
            variant="filled"
          >
            <ArrowLeft /> Go Back
          </Button>
        </NavLink>
      </div>
      {isLoading ? (
        <LoadingPage />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <div className="grow  w-full place-items-center rounded-lg gap-3  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {/* <FeeTempleteModifyClassForm fees={}/> */}
          {grades.map((grade) => (
            <FeeTempleteModifyClassForm
              fees={JSON.parse(data[grade])}
              grade={grade}
              updateFn={updateFeeTemplate}
              key={grade}
            />
          ))}

          <form
            className="h-full w-full  bg-blue-200 flex flex-col justify-between p-2 rounded-lg"
            onSubmit={handleSubmit(updateFeeTemplate)}
            action=""
          >
            <h3 className="font-medium">Miscellenous</h3>
            <div className="w-full">
              <label
                htmlFor="miscellenous"
                className="block text-xs font-medium text-blue-600 capitalize"
              >
                Miscellenous
              </label>
              <input
                {...register("miscellenous", {
                  required: "This field is required",
                  validate: (value) => {
                    return value >= 0 || "Fee must be a positive number";
                  },
                })}
                defaultValue={data.miscellenous}
                id="miscellenous"
                name="miscellenous"
                type="number"
                placeholder={`Enter miscellenous Fees`}
                className="px-1 h-8 capitalize w-full border text-sm border-gray-400 rounded"
              />
              {errors.miscellenous && (
                <p className="text-xs text-red-500">
                  {errors.miscellenous.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full  bg-blue-500 shadow  hover:bg-blue-600 mt-2 text-white"
            >
              {isSubmitting ? <Spinner /> : "Update"}
            </Button>
          </form>
        </div>
      )}
    </AuthenticatedContainer>
  );
}

export default ModifyFeeTemplate;
