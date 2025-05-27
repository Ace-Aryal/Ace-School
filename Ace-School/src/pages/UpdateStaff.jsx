import AuthenticatedContainer from "@/components/Templates/AuthenticatedContainer";
import NepaliDatePicker from "@zener/nepali-datepicker-react";
import "@zener/nepali-datepicker-react/index.css";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { getStaffFormField } from "@/utils/formFields";
import { Button } from "@/components/ui/button";

import databaseService from "@/appwrite/Database/database";
import { useSelector } from "react-redux";
import ErrorPage from "./ErrorPage";
import { useLocation, useNavigate } from "react-router";
import { updateUser } from "@/utils/handleUpdateUser";
import Spinner from "@/components/Atoms/Spinner";
const UpdateStaffPage = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { originalData } = location.state;
  const staffsFormField = getStaffFormField();
  const { roles } = useSelector((state) => state?.auth?.user);
  const originalEmail = originalData.email;
  const collectionID = originalData.$collectionId;
  const documentID = originalData.$id;
  const originalDOB = originalData.DOB;
  const originalJoiningDate = originalData.joiningDate;
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      ["DOB"]: originalData?.DOB || "",
      ["joiningDate"]: originalData?.joiningDate || "", // e.g. new Date() or a formatted date string
    },
  });

  if (!roles.includes("admin")) {
    return <ErrorPage />;
  }
  return (
    <AuthenticatedContainer classnames="items-center min-h-[105vh]">
      <h2 className="text-3xl text-zinc-800 w-full font-semibold md:max-w-[70vw]">
        Update Staff Info
      </h2>
      <form
        onSubmit={handleSubmit(async (data) => {
          await updateUser(data, {
            reset,
            collectionID,
            originalEmail,
            originalDOB,
            originalJoiningDate,
            documentID,
            navigate,
            userRole: "staff",
          });
        })}
        className="grid my-5 gap-x-10 gap-y-1.5 mt-10 grid-cols-1 sm:grid-cols-2 w-full md:max-w-[70vw]"
      >
        {staffsFormField.map((formField) => {
          if (
            formField.type === "number" ||
            formField.type === "text" ||
            formField.type === "email"
          ) {
            return (
              <div key={formField.name} className="flex flex-col">
                <label htmlFor={formField.name}>{formField.label}</label>
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
            disabled={isSubmitting}
            className=" w-24 text-lg bg-[#203047] text-gray-100"
          >
            {isSubmitting ? <Spinner /> : "Update"}
          </Button>
        </div>
      </form>
    </AuthenticatedContainer>
  );
};

export default UpdateStaffPage;
