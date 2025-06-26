import AuthenticatedContainer from "@/components/Templates/AuthenticatedContainer";
import NepaliDatePicker from "@sbmdkl/nepali-datepicker-reactjs";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { getStudentFormFiled } from "@/utils/formFields";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import ErrorPage from "./ErrorPage";
import { useLocation, useNavigate } from "react-router";
import { updateUser } from "@/utils/handleUpdateUser";
import Spinner from "@/components/Atoms/Spinner";

AuthenticatedContainer;
const UpdateStudentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { originalData } = location.state;
  const originalEmail = originalData.email;
  const collectionID = originalData.$collectionId;
  const documentID = originalData.$id;
  const originalDOB = originalData.DOB;
  const originalJoiningDate = "";
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      ["DOB"]: originalData.DOB || " ", // e.g. new Date() or a formatted date string
    },
  });

  const { roles, username, email } = useSelector((state) => state?.auth?.user);

  const studentsFormFields = getStudentFormFiled();

  if (
    roles.some(
      (role) =>
        role.toLowerCase() !== "account" && role.toLowerCase() !== "admin"
    )
  ) {
    return <ErrorPage />;
  }

  return (
    <AuthenticatedContainer classnames="items-center min-h-[105vh]">
      <h2 className="text-3xl text-zinc-800 w-full font-semibold md:max-w-[70vw]  ">
        Update Student Info
      </h2>
      <form
        onSubmit={handleSubmit(async (data) =>
          updateUser(data, {
            reset: reset,
            collectionID,
            navigate,
            originalEmail,
            originalDOB,
            originalJoiningDate,
            documentID,
            userRole: "student",
            authorInfo: `${username}, Role:${roles[0]}`,
          })
        )}
        className="grid my-5 gap-x-10 gap-y-1.5 mt-10 grid-cols-1 sm:grid-cols-2 w-full md:max-w-[70vw]"
      >
        {studentsFormFields.map((formField) => {
          if (
            formField.type === "number" ||
            formField.type === "text" ||
            formField.type === "email"
          ) {
            return (
              <div key={formField.name} className="flex flex-col">
                <label
                  className={
                    formField.required &&
                    "after:content-['*'] after:ml-1 after:text-red-500"
                  }
                  htmlFor={formField.name.replaceAll(" ", "")}
                >
                  {formField.label}
                </label>
                <input
                  step="0.01"
                  disabled={
                    formField.name === "studentName" ||
                    formField.name === "rollNo" ||
                    formField.name === "discount" ||
                    formField.name === "scholarship"
                  }
                  type={formField.type}
                  id={formField.name}
                  defaultValue={originalData[formField.name]}
                  {...register(formField.name, {
                    required:
                      formField.required && `${formField.name} is required`,
                    pattern: formField?.isPhoneNumber
                      ? {
                          value: /^(97|98)\d{8}$/,
                          message: "Enter valid nepali phone number",
                        }
                      : formField?.isEmail
                      ? {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter valid email",
                        }
                      : formField.name === "rollNo"
                      ? {
                          value: /^[1-9]\d*$/,
                          message: "Enter valid Roll No",
                        }
                      : formField.name === "scholarship"
                      ? {
                          value: /^(100|(\d{1,2})(\.\d{1,2})?)$/,
                          message: "Enter valid value",
                        }
                      : formField.type === "number"
                      ? {
                          value: /^(?:0|[1-9]\d*)(?:\.\d+)?$/,
                          message: "Enter valid value",
                        }
                      : {
                          value: /^.*\S.*$/,
                          message: "This field cannot be empty",
                        },
                  })}
                  className="px-2 py-1.5 border disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-500 rounded bg-gray-100 shadow outline-gray-700"
                />
                {errors[formField.name] && (
                  <p className="text-sm text-red-500">
                    {errors[formField.name].message}
                  </p>
                )}
              </div>
            );
          }
          if (formField.type === "select") {
            return (
              <div key={formField.name} className="flex flex-col">
                <label
                  className={
                    formField.required &&
                    "after:content-['*'] after:ml-1 after:text-red-500"
                  }
                  htmlFor={formField.name}
                >
                  {formField.label}
                </label>
                <select
                  disabled={
                    formField.name === "grade" || formField.name === "admission"
                  }
                  defaultChecked={originalData[formField.name]}
                  defaultValue={originalData[formField.name]}
                  {...register(formField.name, {
                    required:
                      formField.required && `${formField.name} is required`,
                  })}
                  className="px-2 py-1.5 border disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-500  rounded bg-gray-100 shadow outline-gray-700"
                >
                  {formField?.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors[formField.name] && (
                  <p className="text-sm text-red-500">
                    {errors[formField.name].message}
                  </p>
                )}
              </div>
            );
          }

          if (formField.type === "date") {
            return (
              <div key={formField.name} className="flex flex-col">
                <label
                  className={
                    formField.required &&
                    "after:content-['*'] after:ml-1 after:text-red-500"
                  }
                  htmlFor={formField.name}
                >
                  {formField.label}
                </label>
                <Controller
                  name={formField.name}
                  control={control}
                  rules={{ required: "Date of birth is required" }}
                  render={({ field }) => {
                    return (
                      <NepaliDatePicker
                        language="en"
                        className="px-2 w-full py-1.5 border rounded bg-gray-100 shadow outline-gray-700"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    );
                  }}
                />
                {errors[formField.name] && (
                  <p className="text-sm text-red-500">
                    {errors[formField.name].message}
                  </p>
                )}
              </div>
            );
          }
        })}
        <div className="sm:col-span-2 flex justify-center my-4 ">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-24 text-lg bg-blue-100 hover:bg-blue-200 text-blue-600"
          >
            {isSubmitting ? <Spinner /> : "Update"}
          </Button>
        </div>
      </form>
    </AuthenticatedContainer>
  );
};

export default UpdateStudentPage;
