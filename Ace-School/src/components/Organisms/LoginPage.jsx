import React, { useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import authService from "@/appwrite/auth/auth";
import { setLoggedIn } from "@/features/authSlice";
function LoginPage(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logging, setLogging] = useState(false);
  const [error, setError] = useState("");
  const login = async (data) => {
    setLogging(true);

    const userSession = await authService.login({ ...data });

    if (userSession.current) {
      console.log("here");

      dispatch(setLoggedIn());
      navigate("/");
    }
    if (!userSession) {
      setError("Error Logging In");
    }
    setLogging(false);
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
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form
              id="form"
              class="space-y-4 md:space-y-6"
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
                  className={` bg-white border  rounded-lg   block w-full p-2  border-gray-500 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500`}
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
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: true,
                  })}
                  class=" border bg-white rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5  border-gray-500 placeholder-gray-400 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  required=""
                />
              </div>
              <p className="text-center text-red-500">{error && error}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded focus:ring-3 focus:ring-indigo-300 bg-gray-700   ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="remember" class="text-gray-500 ">
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  href="#"
                  class="text-sm font-medium text-indigo-600 hover:underline text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                class="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-800"
              >
                {logging ? "Logging in" : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
