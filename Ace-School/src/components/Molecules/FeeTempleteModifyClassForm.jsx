import React from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import Spinner from "../Atoms/Spinner";

function FeeTempleteModifyClassForm({ fees, grade, updateFn }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  return (
    <div className="w-full rounded-lg h-full bg-blue-200 p-2">
      <h3 className="font-medium">Grade-{grade}</h3>
      <form action="" onSubmit={handleSubmit(updateFn)}>
        {Object.keys(fees).map((key) => (
          <div key={key}>
            <input
              {...register("grade", {})}
              defaultValue={grade}
              id={key}
              name={key}
              type="text"
              className="px-1 h-8  hidden capitalize w-full border text-sm border-gray-400 rounded"
            />
            <label
              htmlFor={key}
              className="block text-xs font-medium text-blue-600 capitalize"
            >
              {key.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              {...register(key, {
                required: "This field is required",
                validate: (value) => {
                  return value >= 0 || "Fee must be a positive number";
                },
              })}
              defaultValue={fees[key]}
              id={key}
              name={key}
              type="number"
              placeholder={`Enter ${key.replace(/([A-Z])/g, " $1")} Fee`}
              className="px-1 h-8 capitalize w-full border text-sm border-gray-400 rounded"
            />
            {errors[key] && (
              <p className="text-xs text-red-500">{errors[key].message}</p>
            )}
          </div>
        ))}

        <Button
          disabled={isSubmitting}
          className="w-full bg-blue-500 shadow  hover:bg-blue-600 mt-2 text-white"
        >
          {isSubmitting ? <Spinner /> : "Update"}
        </Button>
      </form>
    </div>
  );
}

export default FeeTempleteModifyClassForm;
