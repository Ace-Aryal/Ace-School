import React from "react";
import { LockOpen } from "lucide-react";
import { useForm } from "react-hook-form";
import authService from "@/appwrite/auth/auth";
import { toast } from "sonner";

const ChangePasswordPage = () => {
  const {
    handleSubmit,
    watch,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const handlePasswordChange = async (formData) => {
    const { oldPassword, newPassword } = formData;
    const success = await authService.changePassword(oldPassword, newPassword);
    reset();

    if (success === true) {
      // Success toast
      toast.custom(() => (
        <div className="px-4 py-2 rounded bg-green-600 text-white text-sm flex items-center gap-2 shadow">
          ✅ Password changed!
        </div>
      ));
      return;
    }

    // Error toast
    toast.custom(() => (
      <div className="px-4 py-2 rounded bg-red-600 text-white text-sm flex items-center gap-2 shadow">
        ❌ Error changing password {success}.
      </div>
    ));
  };
  return (
    <div class="min-h-screen bg-gray-100 text-gray-900 w-full flex justify-center p-16 px-20">
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
              <input
                class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="password"
                placeholder="Old Password"
                title="old password"
                {...register("oldPassword", {
                  required: "Old password is required",
                })}
              />
              {errors.oldPassword && (
                <p className="text-red-500 text-sm">
                  {errors.oldPassword.message}
                </p>
              )}
              <input
                class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="password"
                placeholder="Password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  validate: (value) =>
                    value !== watch("oldPassword") ||
                    "New password cannot be current password",
                })}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </p>
              )}
              <input
                class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="password"
                placeholder="Confirm Password"
                {...register("confirmatoryPassword", {
                  required: "Confirmatory password is required",
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                })}
              />
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

export default ChangePasswordPage;
