import AuthenticatedContainer from "@/components/Templates/AuthenticatedContainer";
import NepaliDatePicker from "@zener/nepali-datepicker-react";
import "@zener/nepali-datepicker-react/index.css";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useStudentFormFields } from "@/hooks/useFormFields";

AuthenticatedContainer;
const AddStudentsPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const studentsFormFields = useStudentFormFields();
  console.log(studentsFormFields);

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <AuthenticatedContainer classnames="items-center min-h-[105vh]">
      <h2 className="text-2xl text-indigo-500 font-bold text-center">
        Add Student
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid my-5 gap-x-10 gap-y-1.5 mt-10 grid-cols-1 sm:grid-cols-2 w-full md:max-w-[70vw]"
      >
        {studentsFormFields.map((formField) => {
          if (
            formField.type === "number" ||
            formField.type === "text" ||
            formField.type === "email"
          ) {
            return (
              <div className="flex flex-col">
                <label htmlFor={formField.name}>{formField.label}</label>
                <input
                  type={formField.type}
                  id={formField.name}
                  {...register(formField.name, {
                    required:
                      formField.required && `${formField.name} is required`,
                    pattern: formField?.isPhoneNumber
                      ? { value: /^(97|98)\d{8}$/ }
                      : formField?.isEmail
                      ? { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
                      : {},
                  })}
                  className="px-2 py-1.5 border rounded bg-gray-100 shadow outline-gray-700"
                />
                {errors[formField.name] && (
                  <p className="text-sm text-red-500">
                    {errors.formField.name.message}
                  </p>
                )}
              </div>
            );
          }
        })}
      </form>
    </AuthenticatedContainer>
  );
};

export default AddStudentsPage;
