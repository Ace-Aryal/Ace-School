import { useCallback, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeClosed, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import databaseService from "@/appwrite/Database/database";
import { showErrorToast, showSuccessToast } from "@/components/Templates/toast";
import authService from "@/appwrite/auth/auth";
import Spinner from "@/components/Atoms/Spinner";

export default function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const [isShowingPassword, setIshowingPassword] = useState(false);
  const password = watch("password");
  async function handleSignup(data) {
    console.log(data);
    try {
      const isRegistered = await databaseService.getUserDocument(data.email);
      if (!isRegistered || isRegistered?.total === 0) {
        showErrorToast("Sorry, this email is not registered into our database");
        return;
      }

      const { email, password } = data;
      const response = await authService.signup({
        username: isRegistered.documents[0].name,
        email,
        password,
      });
      if (response) {
        showSuccessToast("Account created sucesfully ! Login to continue");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      showErrorToast(error.message);
    }
  }

  return (
    <div className=" grow py-3 my-3  w-full  flex justify-center items-center">
      <div className="flex  border-1rounded-xl py-2 px-1 flex-1 flex-col justify-center ">
        <div className=" sm:w-full flex justify-center ">
          <img
            alt="Your Company"
            src="https://symbolikon.com/wp-content/uploads/edd/2022/11/Shatkona-hindu-bold.png"
            className="mx-2 h-12 w-auto"
          />
          <h2 className="text-2xl font-bold text-cyan-600"> </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-[35vw] rounded-lg px-12 py-5 border-1 border-gray-400 shadow-lg   bg-blue-100">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create an account
          </h2>
          <form
            action="#"
            method="POST"
            onSubmit={handleSubmit(handleSignup)}
            className="space-y-2 "
          >
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Username
                </label>
              </div>
              <div className="mt-1">
                <input
                  {...register("username", {
                    required: "Username is required",
                  })}
                  id="username"
                  name="username"
                  placeholder="eg. ace_404"
                  type="text"
                  autoComplete="current-username"
                  className="block  w-full rounded-md  px-1 py-2 text-base text-gray-900 outline-1  
                  -outline-offset-1 outline-gray-500 placeholder:text-gray-500 focus:outline-2 
                  focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.username && (
                  <p className="text-sm text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-1 ">
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter valid email",
                    },
                  })}
                  id="email"
                  name="email"
                  type="email"
                  className="block  w-full rounded-md  px-1 py-2 text-base text-gray-900 outline-1  -outline-offset-1 outline-gray-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="eg. ace@dev.mail.np"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-1 flex items-center relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
                      message:
                        "Password must be at least 8 characters long and include at least one letter and one number. ",
                    },
                  })}
                  id="password"
                  name="password"
                  type={isShowingPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="block w-full outline-1 rounded-md bg-[#c3d7f1]px-3 py-2 px-1 text-base text-gray-900  -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />

                <button
                  type="button"
                  onClick={() => {
                    setIshowingPassword((prev) => !prev);
                  }}
                  className="absolute right-2  text-gray-500 hover:text-gray-700"
                >
                  {isShowingPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-0 mb-2">
                  {errors.password.message}
                </p>
              )}
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-1  flex items-center relative">
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => {
                      return value === password || "Passwords do not match";
                    },
                  })}
                  id="confirmPassword"
                  name="confirmPassword"
                  type={isShowingPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="block w-full outline-1 rounded-md bg-[#c3d7f1]px-3 py-2 px-1 text-base text-gray-900  -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />

                <button
                  type="button"
                  onClick={() => {
                    setIshowingPassword((prev) => !prev);
                  }}
                  className="absolute right-2  text-gray-500 hover:text-gray-700"
                >
                  {isShowingPassword ? <Eye /> : <EyeOff />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-0 mb-2">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex mt-4 w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm/6 font-semibold text-white shadow-xs
                 hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isSubmitting ? <Spinner /> : "Signup"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an Account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
