import { useCallback, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeClosed, EyeOff } from "lucide-react";

export default function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowingPassword, setIshowingPassword] = useState(false);
  async function handleSignup(e) {}

  return (
    <div className=" my-10 min-h-screen w-full  flex justify-center items-center">
      <div className="flex  border-1rounded-xl py-2 px-1 flex-1 flex-col justify-center ">
        <div className=" sm:w-full flex justify-center ">
          <img
            alt="Your Company"
            src="https://logosandtypes.com/wp-content/uploads/2024/12/xsplit.svg"
            className="mx-2 h-10 w-auto"
          />
          <h2 className="text-2xl font-bold text-cyan-600"> Xpenso</h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-[35vw] rounded-lg px-12 py-5 border-1 border-gray-400 shadow-lg   bg-blue-100">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create an account
          </h2>
          <form
            action="#"
            method="POST"
            onSubmit={handleSignup}
            className="space-y-6 "
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
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  placeholder="eg. ace_404"
                  type="text"
                  required
                  autoComplete="current-username"
                  className="block  w-full rounded-md  px-1 py-2 text-base text-gray-900 outline-1  -outline-offset-1 outline-gray-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2 ">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="block  w-full rounded-md  px-1 py-2 text-base text-gray-900 outline-1  -outline-offset-1 outline-gray-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="eg. ace@dev.mail.np"
                  required
                  autoComplete="email"
                />
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
              <div className="mt-2 flex items-center relative">
                <input
                  id="password"
                  name="password"
                  type={isShowingPassword ? "text" : "password"}
                  minLength="6"
                  placeholder="••••••••"
                  required
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2 flex items-center relative">
                <input
                  id="password"
                  name="password"
                  type={isShowingPassword ? "text" : "password"}
                  minLength="6"
                  placeholder="••••••••"
                  required
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
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {"Signup"}
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
