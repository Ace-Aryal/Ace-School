import AuthenticatedContainer from "@/components/Templates/AuthenticatedContainer";
import NepaliDatePicker from "@zener/nepali-datepicker-react";
import "@zener/nepali-datepicker-react/index.css";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { getStudentFormFiled } from "@/utils/formFields";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import ErrorPage from "./ErrorPage";
import { useLocation } from "react-router";
import { updateUser } from "@/utils/handleUpdateUser";

AuthenticatedContainer;
const UpdateStudentPage = () => {
  const location = useLocation();
  const { originalData } = location.state;
  const originalEmail = originalData.email;
  const collectionID = originalData.$collectionId;
  const documentID = originalData.$documentId;
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

  const { roles } = useSelector((state) => state?.auth?.user);

  const studentsFormFields = getStudentFormFiled();

  if (
    roles.some(
      (role) =>
        role.toLowerCase() !== "teacher" && role.toLowerCase() !== "admin"
    )
  ) {
    return <ErrorPage />;
  }

  return (
    <AuthenticatedContainer classnames="items-center min-h-[105vh]">
      <h2 className="text-2xl text-indigo-500 font-bold text-center">
        Update Student Info
      </h2>
      <form
        onSubmit={handleSubmit((data) =>
          updateUser(data, {
            reset: reset,
            collectionID,
            originalEmail,
            originalDOB,
            originalJoiningDate,
            documentID,
            userRole: "student",
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
                <label htmlFor={formField.name.replaceAll(" ", "")}>
                  {formField.label}
                </label>
                <input
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
                      : {},
                  })}
                  className="px-2 py-1.5 border rounded bg-gray-100 shadow outline-gray-700"
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
                <label htmlFor={formField.name}>{formField.label}</label>
                <select
                  defaultChecked={originalData[formField.name]}
                  defaultValue={originalData[formField.name]}
                  {...register(formField.name, {
                    required:
                      formField.required && `${formField.name} is required`,
                  })}
                  className="px-2 py-1.5 border rounded bg-gray-100 shadow outline-gray-700"
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
                <label htmlFor={formField.name}>{formField.label}</label>
                <Controller
                  name={formField.name}
                  control={control}
                  rules={{ required: "Date of birth is required" }}
                  render={({ field }) => {
                    return (
                      <NepaliDatePicker
                        lang="en"
                        className="px-2 py-1.5 border rounded bg-gray-100 shadow outline-gray-700"
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
            className="w-fit text-lg bg-blue-500 text-gray-100"
          >
            {isSubmitting ? "Adding.." : "Add"}
          </Button>
        </div>
      </form>
    </AuthenticatedContainer>
  );
};

export default UpdateStudentPage;
