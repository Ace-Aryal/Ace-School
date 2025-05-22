import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import authService from "@/appwrite/auth/auth";
import { setUser } from "@/features/authSlice";

import { showErrorToast } from "@/components/Templates/toast";
import databaseService from "@/appwrite/Database/database";
import { Eye, EyeOff } from "lucide-react";
function LoginPage(props) {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logging, setLogging] = useState(false);
  const [isShowingPassword, setIshowingPassword] = useState(false);
  const login = async (data) => {
    setLogging(true);

    try {
      let isStillLoggedIn = (await authService.getCurrentUser()) || null;
      if (isStillLoggedIn) {
        // covering edge case for bug
        await authService.logout();
      }

      const userSession = await authService.login({ ...data });
      const currentuser = await authService.getCurrentUser();

      console.log(userSession, currentuser);

      if (!(userSession || currentuser)) {
        throw new Error("Failed to log in");
      }
      // others than admin dont have labels so we need to find role for them with their document
      let currentUserDocument;
      let roles = currentuser.labels;
      if (currentuser.labels.length === 0) {
        currentUserDocument = await databaseService.getUserDocument(
          currentuser.email
        );
        roles = [currentUserDocument.documents[0].role];
      }
      if (
        userSession.current &&
        (currentuser.labels || currentUserDocument.total)
      ) {
        console.log(currentUserDocument);

        dispatch(
          setUser({
            isLoggedIn: true,
            username: currentuser.name,
            email: currentuser.email,
            roles,
            phone: currentuser.phone,
            createdAt: currentuser.$createdAt,
          })
        );

        navigate("/");
        return;
      }
      showErrorToast("Error logging in");
    } catch (error) {
      console.error(error);
      showErrorToast("Error logging in");
    } finally {
      setLogging(false);
    }
  };

  return (
    <section className="mb-20">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 ">
        <Link
          href="#"
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img
            class="w-12 mr-2"
            src="https://symbolikon.com/wp-content/uploads/edd/2022/11/Shatkona-hindu-bold.png"
            alt="logo"
          />
          <h2 className="font-bold text-2xl ">Birendra Secondary School</h2>
        </Link>
        <div class="w-full bg-blue-100 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 border-gray-400">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form
              id="form"
              class="space-y-2 md:space-y-4"
              onSubmit={handleSubmit(login)}
              action="#"
            >
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium  text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  {...register("email", {
                    required: true,
                  })}
                  className={`  border  rounded-lg   block w-full p-2  border-gray-500 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="user@example.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 text-text-900"
                >
                  Password
                </label>
                <div className="mt-2 flex items-center relative">
                  <input
                    type={isShowingPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    {...register("password", {
                      required: true,
                    })}
                    class=" border rounded-lg block w-full p-2.5  border-gray-500 placeholder-gray-400 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                    required=""
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
              </div>

              <div class="flex items-center justify-between">
                <Link
                  to="/recover-password-initiation"
                  class="text-sm font-medium text-indigo-600 hover:underline "
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                class="w-full text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-800"
              >
                {logging ? "Logging in" : "Login"}
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-800">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  class="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                >
                  Signup
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
