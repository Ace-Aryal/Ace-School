import React, { useState } from "react";
import { Button } from "../Atoms/button";
import { NavLink, Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import authService from "@/appwrite/auth/auth";
import { clearUser } from "@/features/authSlice";
function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth.user.isLoggedIn);
  const [isloading, setIsLoading] = useState(false);
  console.log(isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navElememts = [
    { nav: "Home", requireAuthentication: false },
    { nav: "Services", requireAuthentication: false },
    { nav: "About", requireAuthentication: false },
    { nav: "Contact", requireAuthentication: false },
    { nav: "Gallary", requireAuthentication: false },
    { nav: "Notice", requireAuthentication: true },
    { nav: "Billing", requireAuthentication: true },
    { nav: "Timetable", requireAuthentication: true },
    { nav: "Attendance", requireAuthentication: true },
  ];

  async function handleLogout() {
    const response = await authService.logout();
    if (!response) {
      alert("Error Logging Out");
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    dispatch(clearUser());
    navigate("/");
  }
  return (
    <header className="antialiased bg-[#175676] shadow-lg fixed top-0 z-10 w-screen ">
      <nav className="lg:px-16 px-6  flex flex-wrap items-center lg:py-0 py-2">
        <div className="flex-1 flex justify-between items-center">
          <Link to="/">
            <img
              src="https://lubhupathshala.edu.np/images/front-images/logo.png"
              className="h-13"
              alt="School Logo "
            />
          </Link>
        </div>

        <label htmlFor="menu-toggle" className="pointer-cursor lg:hidden block">
          <svg
            className="fill-current text-gray-50"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />

        <div
          className="hidden lg:flex lg:items-center lg:w-auto w-full"
          id="menu"
        >
          <nav>
            <ul className="lg:flex items-center justify-between text-base text-gray-50 pt-4 lg:pt-0">
              {navElememts.map((element) => {
                if (element.requireAuthentication && !isAuthenticated) return;
                if (!element.requireAuthentication && isAuthenticated) return;

                return (
                  <li key={element.nav}>
                    <NavLink
                      className={({ isActive }) =>
                        `  lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:text-yellow-300  hover:border-indigo-400 ${
                          isActive ? "text-indigo-300" : ""
                        }`
                      }
                      to={
                        element.nav !== "Home" ? element.nav.toLowerCase() : "/"
                      }
                    >
                      {element.nav}
                    </NavLink>
                  </li>
                );
              })}

              <Button
                onClick={(e) => {
                  e.preventDefault();

                  if (!isAuthenticated) {
                    navigate("/login");
                    return;
                  }
                  setIsLoading(true);
                  handleLogout();
                }}
                className={`${
                  isAuthenticated ? "text-red-500" : "text-blue-300"
                }  hover:text-white cursor-pointer `}
                variant="destructive"
              >
                {isloading
                  ? "logging out"
                  : isAuthenticated
                  ? "Logout →"
                  : "Login →"}
              </Button>
            </ul>
          </nav>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
