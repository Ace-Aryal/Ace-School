import React, { useState } from "react";
import { Eye, EyeOff, LockOpen } from "lucide-react";
import { useForm } from "react-hook-form";
import authService from "@/appwrite/auth/auth";
import { toast } from "sonner";
import { useSearchParams } from "react-router";
import { showErrorToast, showSuccessToast } from "@/components/Templates/toast";

const RecoveryPage = () => {
  const {
    handleSubmit,
    watch,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [searchParams] = useSearchParams();
  const userID = searchParams.get("userId");
  const secretID = searchParams.get("secret");
  const handleToggle = () => {
    setIsPasswordHidden((prev) => !prev);
  };
  const handlePasswordChange = async (formData) => {
    const { newPassword: password } = formData;
    const success = await authService.recoverAccount({
      userID,
      secretID,
      password,
    });
    reset();

    if (success) {
      // Success toast
      showSuccessToast(" Password changed!");
      return;
    }

    // Error toast
    showErrorToast(" Error changing password , pease try again");
  };
  return (
    <div class="min-h-screen bg-gray-100 text-gray-900 w-full flex justify-center sm:p-16 sm:px-20">
      <div class="max-w-screen-xl  bg-white shadow -lg flex justify-center flex-1">
        <div class=" ">
          <div class="mt-12 flex flex-col items-center">
            <div class="my-12 border-b text-center">
              <div class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                Change Password
              </div>
            </div>

            <form
              onSubmit={handleSubmit(handlePasswordChange)}
              class="mx-auto max-w-xs"
            >
              <div className="relative mt-5 flex items-center p-0">
                <input
                  className="w-full  px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white "
                  type={isPasswordHidden ? "password" : "text"}
                  placeholder="Password"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    validate: (value) =>
                      value !== watch("oldPassword") ||
                      "New password cannot be current password ",
                  })}
                />
                {isPasswordHidden ? (
                  <EyeOff className="absolute right-2" onClick={handleToggle} />
                ) : (
                  <Eye className="absolute right-2" onClick={handleToggle} />
                )}
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </p>
              )}
              <div className="relative mt-5 flex items-center p-0">
                <input
                  className="w-full  px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type={isPasswordHidden ? "password" : "text"}
                  placeholder="Confirm Password"
                  {...register("confirmatoryPassword", {
                    required: "Confirmatory password is required",
                    validate: (value) =>
                      value === watch("newPassword") ||
                      "Passwords do not match",
                  })}
                />
                {isPasswordHidden ? (
                  <EyeOff className="absolute right-2" onClick={handleToggle} />
                ) : (
                  <Eye className="absolute right-2" onClick={handleToggle} />
                )}
              </div>
              {errors.confirmatoryPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmatoryPassword.message}
                </p>
              )}
              <button class="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                <LockOpen />
                <span class="ml-3">
                  {isSubmitting ? "...." : "Change Password"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="flex-1  bg-indigo-100  text-center hidden lg:flex">
        <div
          class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
          }}
        ></div>
      </div>
    </div>
  );
};

export default RecoveryPage;
