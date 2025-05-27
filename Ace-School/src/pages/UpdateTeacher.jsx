"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import AuthenticatedContainer from "@/components/Templates/AuthenticatedContainer";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import Select from "react-select";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import NepaliDatePicker from "@zener/nepali-datepicker-react";
import "@zener/nepali-datepicker-react/index.css";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import databaseService from "@/appwrite/Database/database";
import { showErrorToast, showSuccessToast } from "@/components/Templates/toast";
import { registerUser } from "@/utils/handleRegisterUser";
import ErrorPage from "./ErrorPage";
import { useLocation, useNavigate } from "react-router";
import { updateUser } from "@/utils/handleUpdateUser";
import Spinner from "@/components/Atoms/Spinner";

const classes = [
  { value: "nursery", label: "Nursery", abbreviation: "NRY" },
  { value: "lkg", label: "LKG", abbreviation: "LKG" },
  { value: "ukg", label: "UKG", abbreviation: "UKG" },
  { value: "grade-1", label: "Grade 1", abbreviation: "G1" },
  { value: "grade-2", label: "Grade 2", abbreviation: "G2" },
  { value: "grade-3", label: "Grade 3", abbreviation: "G3" },
  { value: "grade-4", label: "Grade 4", abbreviation: "G4" },
  { value: "grade-5", label: "Grade 5", abbreviation: "G5" },
  { value: "grade-6", label: "Grade 6", abbreviation: "G6" },
  { value: "grade-7", label: "Grade 7", abbreviation: "G7" },
  { value: "grade-8", label: "Grade 8", abbreviation: "G8" },
  { value: "grade-9", label: "Grade 9", abbreviation: "G9" },
  { value: "grade-10", label: "Grade 10", abbreviation: "G10" },
];

const sexes = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "others", label: "Others" },
];
const jobTypes = [
  {
    value: "parttime",
    label: "Part Time",
  },
  {
    value: "fulltime",
    label: "Full Time",
  },
  {
    value: "intern",
    label: "Intern",
  },
];
const qualifications = [
  {
    value: "bachelors",
    label: "Bachelors",
  },
  {
    value: "masters",
    label: "Masters",
  },
  {
    value: "mphil",
    label: "M.phil",
  },

  {
    value: "phd",
    label: "PHD",
  },

  {
    value: "plus2",
    label: "+2 / IA ",
  },
];
const status = [
  {
    value: "onLeave",
    label: "On Leave",
  },
  {
    value: "active",
    label: "Active",
  },
  {
    value: "resigned",
    label: "resigned",
  },
];
const subjects = [
  { value: "english", label: "English", abbreviation: "ENG" },
  { value: "nepali", label: "Nepali", abbreviation: "NEP" },
  { value: "math", label: "Mathematics", abbreviation: "MTH" },
  { value: "science", label: "Science", abbreviation: "SCI" },
  { value: "social", label: "Social Studies", abbreviation: "SST" },
  { value: "moral", label: "Moral Education", abbreviation: "MOR" },
  { value: "gk", label: "General Knowledge", abbreviation: "GK" },
  { value: "computer", label: "Computer Science", abbreviation: "CST" },
  {
    value: "health",
    label: "Health & Physical Education",
    abbreviation: "HPE",
  },
  { value: "environment", label: "Environmental Science", abbreviation: "ENV" },
  {
    value: "occupation",
    label: "Occupation, Business & Technology Education",
    abbreviation: "OBTE",
  },

  // Optional Subjects
  {
    value: "optional_math",
    label: "Optional Mathematics",
    optional: true,
    abbreviation: "O-MTH",
  },
  {
    value: "accountancy",
    label: "Accountancy",
    optional: true,
    abbreviation: "ACC",
  },
  {
    value: "office_management",
    label: "Office Management",
    optional: true,
    abbreviation: "OM",
  },
  {
    value: "education",
    label: "Education",
    optional: true,
    abbreviation: "EDU",
  },
  {
    value: "computer_optional",
    label: "Computer (Optional)",
    optional: true,
    abbreviation: "CST-O",
  },
  {
    value: "economics",
    label: "Economics",
    optional: true,
    abbreviation: "ECO",
  },
  {
    value: "english_advanced",
    label: "Advanced English",
    optional: true,
    abbreviation: "ENG-A",
  },
];

export default function UpdateTeacherPage() {
  const location = useLocation();
  const { originalData } = location.state;
  const navigate = useNavigate();
  const { roles } = useSelector((state) => state?.auth?.user);
  const collectionID = originalData.$collectionId;
  const documentID = originalData.$id;

  const originalDOB = originalData.DOB;
  const originalEmail = originalData.email;
  const originalJoiningDate = originalData.joiningDate;
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      teacherId: originalData?.teacherId || "",
      teacherName: originalData?.teacherName || "",
      email: originalData?.email || "",
      teacherPhone: originalData?.teacherPhone || "",
      address: originalData?.address || "",
      DOB: originalData?.DOB || "", // Assuming DOB is stored in a format compatible with NepaliDatePicker
      sex: originalData?.sex || "",
      jobType: originalData?.jobType || "",
      qualification: originalData?.qualification || "",
      status: originalData?.status || "",
      classes: JSON.parse(originalData?.classes) || [], // Assuming classes is an array of objects {value, label}
      subjectsTaught: JSON.parse(originalData?.subjectsTaught) || [], // Assuming subjectsTaught is an array of objects {value, label}
      joiningDate: originalData?.joiningDate || "", // Assuming joiningDate is stored in a format compatible with NepaliDatePicker
    },
  });

  if (!roles.includes("admin")) {
    return <ErrorPage />;
  }

  return (
    <AuthenticatedContainer classnames="items-center min-h-[105vh]">
      <h2 className="text-3xl text-zinc-800 w-full font-semibold md:max-w-[70vw]">
        Update Teacher Info
      </h2>

      <form
        onSubmit={handleSubmit(async (data) => {
          await updateUser(data, {
            reset,
            collectionID,
            originalEmail,
            documentID,
            navigate,
            userRole: "teacher",
            originalDOB,
            originalJoiningDate,
          });
        })}
        className="grid my-5 gap-x-10 gap-y-1.5 mt-10 grid-cols-1 sm:grid-cols-2 w-full md:max-w-[70vw]"
      >
        <div className="flex flex-col">
          <label htmlFor="teacher-id" className="text-gray-600">
            Enter teacher's ID
          </label>
          <input
            id="teacher-id"
            type="text"
            {...register("teacherId", { required: "ID is required" })}
            className="px-2 border py-1.5 rounded bg-gray-100 shadow outline-gray-700"
          />
          {errors.teacherId && (
            <p className="text-sm text-red-500">{errors.teacherId.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="teacher-name" className="text-gray-600">
            Enter teacher's Name
          </label>
          <input
            id="teacher-name"
            type="text"
            {...register("teacherName", { required: "Name is required" })}
            className="px-2 border py-1.5 rounded bg-gray-100 shadow outline-gray-700"
          />
          {errors.teacherName && (
            <p className="text-sm text-red-500">{errors.teacherName.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="teacher-email" className="text-gray-600">
            Enter teacher's Email
          </label>
          <input
            id="teacher-email"
            type="email"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            className="px-2 py-1.5 border rounded bg-gray-100 shadow outline-gray-700"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="teacher-phone" className="text-gray-600">
            Enter teacher's Phone
          </label>
          <input
            id="teacher-phone"
            type="tel"
            {...register("teacherPhone", {
              required: "Phone is required",
              pattern: {
                value: /^(97|98)\d{8}$/,
                message: "Enter a valid Nepali phone number",
              },
            })}
            className="px-2 py-1.5 border rounded bg-gray-100 shadow outline-gray-700"
          />
          {errors.teacherPhone && (
            <p className="text-sm text-red-500">
              {errors.teacherPhone.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="flex flex-col">
          <label htmlFor="address" className="text-gray-600">
            Address
          </label>
          <input
            type="text"
            id="address"
            {...register("address", { required: "Address is required" })}
            rows={3}
            className="px-2 py-1.5 border rounded bg-gray-100 shadow outline-gray-700"
          />
          {errors.address && (
            <p className="text-sm text-red-500">{errors.address.message}</p>
          )}
        </div>

        {/* Date Picker */}
        <div className="flex flex-col">
          <label className="text-gray-600">Select DOB</label>
          <Controller
            name="DOB"
            control={control}
            rules={{ required: "Date of birth is required" }}
            render={({ field }) => {
              return (
                <NepaliDatePicker
                  lang="en"
                  className="px-2 py-1.5 border rounded bg-gray-100 shadow outline-gray-700"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select DOB"
                />
              );
            }}
          />
          {errors.DOB && (
            <p className="text-sm text-red-500">{errors.DOB.message}</p>
          )}
        </div>
        {/* Sex- ComboBox */}
        <div className="flex flex-col">
          <label className="text-gray-600">Select Sex</label>
          <Controller
            name="sex"
            control={control}
            rules={{ required: "Sex is required" }}
            render={({ field }) => {
              const selectedLabel =
                sexes.find((f) => f.value === field.value)?.label ||
                "Select  sex...";
              const [open, setOpen] = React.useState(false);

              return (
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild className="bg-gray-100 ">
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {selectedLabel}
                      <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command className="bg-gray-100">
                      <CommandInput placeholder="Search..." />
                      <CommandList>
                        <CommandEmpty>No option found.</CommandEmpty>
                        <CommandGroup>
                          {sexes.map((item) => (
                            <CommandItem
                              key={item.value}
                              value={item.value}
                              onSelect={(val) => {
                                field.onChange(val === field.value ? "" : val);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === item.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {item.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              );
            }}
          />
          {errors.sex && (
            <p className="text-sm text-red-500">{errors.sex.message}</p>
          )}
        </div>
        {/* Job- ComboBox */}
        <div className="flex flex-col">
          <label className="text-gray-600">Select Job Type</label>
          <Controller
            name="jobType"
            control={control}
            rules={{ required: "Job type is required" }}
            render={({ field }) => {
              const selectedLabel =
                jobTypes.find((f) => f.value === field.value)?.label ||
                "Select job type...";
              const [open, setOpen] = React.useState(false);

              return (
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild className="bg-gray-100 ">
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {selectedLabel}
                      <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command className="bg-gray-100">
                      <CommandInput placeholder="Search..." />
                      <CommandList>
                        <CommandEmpty>No option found.</CommandEmpty>
                        <CommandGroup>
                          {jobTypes.map((item) => (
                            <CommandItem
                              key={item.value}
                              value={item.value}
                              onSelect={(val) => {
                                field.onChange(val === field.value ? "" : val);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === item.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {item.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              );
            }}
          />
          {errors.jobType && (
            <p className="text-sm text-red-500">{errors.jobType.message}</p>
          )}
        </div>
        {/* Qualification- ComboBox */}
        <div className="flex flex-col">
          <label className="text-gray-600">Select Qualification</label>
          <Controller
            name="qualification"
            control={control}
            rules={{ required: "Qualification is required" }}
            render={({ field }) => {
              const selectedLabel =
                qualifications.find((f) => f.value === field.value)?.label ||
                "Select qualification...";
              const [open, setOpen] = React.useState(false);

              return (
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild className="bg-gray-100 ">
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {selectedLabel}
                      <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command className="bg-gray-100">
                      <CommandInput placeholder="Search..." />
                      <CommandList>
                        <CommandEmpty>No option found.</CommandEmpty>
                        <CommandGroup>
                          {qualifications.map((item) => (
                            <CommandItem
                              key={item.value}
                              value={item.value}
                              onSelect={(val) => {
                                field.onChange(val === field.value ? "" : val);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === item.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {item.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              );
            }}
          />
          {errors.qualification && (
            <p className="text-sm text-red-500">
              {errors.qualification.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-gray-600">Select Status</label>
          <Controller
            name="status"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => {
              const selectedLabel =
                status.find((f) => f.value === field.value)?.label ||
                "Select status...";
              const [open, setOpen] = React.useState(false);

              return (
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild className="bg-gray-100 ">
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {selectedLabel}
                      <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command className="bg-gray-100">
                      <CommandInput placeholder="Search..." />
                      <CommandList>
                        <CommandEmpty>No option found.</CommandEmpty>
                        <CommandGroup>
                          {status.map((item) => (
                            <CommandItem
                              key={item.value}
                              value={item.value}
                              onSelect={(val) => {
                                field.onChange(val === field.value ? "" : val);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === item.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {item.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              );
            }}
          />
          {errors.status && (
            <p className="text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>
        {/* {classes} */}
        <div className="flex flex-col">
          <label className="text-gray-600">Select assigned classes</label>
          <Controller
            name="classes"
            control={control}
            rules={{ required: "Classes are required" }}
            render={({ field }) => {
              return (
                <Select
                  className=" border text-md  rounded bg-gray-100 shadow focus:outline-gray-700"
                  isMulti
                  options={classes}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              );
            }}
          />
          {errors.classes && (
            <p className="text-sm text-red-500">{errors.classes.message}</p>
          )}
        </div>
        {/* {subjects} */}
        <div className="flex flex-col">
          <label className="text-gray-600">Select subjects taught</label>
          <Controller
            name="subjectsTaught"
            control={control}
            rules={{ required: "Subjects are required" }}
            render={({ field }) => {
              return (
                <Select
                  className=" border text-md  rounded bg-gray-100 shadow focus:outline-gray-700"
                  isMulti
                  options={subjects}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              );
            }}
          />
          {errors.subjects && (
            <p className="text-sm text-red-500">{errors.subjects.message}</p>
          )}
        </div>
        {/* Date Picker */}
        <div className="flex flex-col">
          <label className="text-gray-600">Select DOB</label>
          <Controller
            name="joiningDate"
            control={control}
            rules={{ required: "Date of birth is required" }}
            render={({ field }) => {
              return (
                <NepaliDatePicker
                  lang="en"
                  className="px-2 py-1.5 border rounded bg-gray-100 shadow outline-gray-700"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select Joining date"
                />
              );
            }}
          />
          {errors.DOB && (
            <p className="text-sm text-red-500">{errors.DOB.message}</p>
          )}
        </div>
        <div className="sm:col-span-2 flex justify-center my-4 ">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-24 text-lg bg-zinc-800 text-gray-100"
          >
            {isSubmitting ? <Spinner /> : "Update"}
          </Button>
        </div>
      </form>
    </AuthenticatedContainer>
  );
}
