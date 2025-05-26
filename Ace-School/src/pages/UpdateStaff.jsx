import AuthenticatedContainer from "@/components/Templates/AuthenticatedContainer";
import NepaliDatePicker from "@zener/nepali-datepicker-react";
import "@zener/nepali-datepicker-react/index.css";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useStaffFormField } from "@/hooks/useFormFields";
import { Button } from "@/components/ui/button";
import { useRegisterUser } from "@/hooks/useRegisterUser";
import databaseService from "@/appwrite/Database/database";
import { useSelector } from "react-redux";
import ErrorPage from "./ErrorPage";
const UpdateStaffPage = ({ orignialData }) => {
  const staffsFormField = useStaffFormField();
  const { roles } = useSelector((state) => state?.auth?.user);
  const { getStaffsDocument, createStaffsDocument } = databaseService;
  const [errorDeletingDuplicate, setErrorDeletingDuplicate] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  if (!roles.includes("admin")) {
    return <ErrorPage />;
  }
  return (
    <AuthenticatedContainer classnames="items-center min-h-[105vh]">
      <h2 className="text-2xl text-indigo-500 font-bold text-center">
        Update Staff Info
      </h2>
      <form
        onSubmit={handleSubmit((data) => {
          // update hook
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

export default UpdateStaffPage;
