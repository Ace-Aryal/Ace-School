import React, { useState } from "react";
import { Button } from "../Atoms/button";
import { NavLink, Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import authService from "@/appwrite/auth/auth";
import { clearUser } from "@/features/authSlice";
import { SidebarTrigger } from "../ui/sidebar";
import Logo from "../Atoms/logo";
import { LogOut } from "lucide-react";
function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth.user.isLoggedIn);
  const roles = useSelector((state) => state.auth.user.roles);
  const [isloading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navElememts = [
    { nav: "Home", requireAuthentication: false },
    { nav: "Services", requireAuthentication: false },
    { nav: "About", requireAuthentication: false },
    { nav: "Contact", requireAuthentication: false },
    { nav: "Gallary", requireAuthentication: false },
    { nav: "Dashboard", requireAuthentication: true },
    { nav: "Notice", requireAuthentication: true },
    {
      nav: "Billing",
      requireAuthentication: true,
      readers: ["admin", "account"],
    },
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
    <header
      className={`antialiased w-[100vw] ${
        isAuthenticated
          ? "border-b navBarTransition border-gray-300 backdrop-blur-md bg-white"
          : "  bg-indigo-900  lg:h-[10vh]"
      } shadow-lg fixed top-0 z-1  `}
    >
      <nav
        className={`lg:px-16 px-6  flex flex-wrap items-center justify-between lg:py-0 py-2`}
      >
        <div className="flex-1 flex items-center">
          <Link to="/">
            <Logo
              className={isAuthenticated ? "text-zinc-800" : "text-gray-50"}
            />
          </Link>
        </div>

        {isAuthenticated ? (
          <SidebarTrigger className="lg:hidden text-zinc-800" />
        ) : (
          // hamburger
          <>
            <label
              htmlFor="menu-toggle"
              className="pointer-cursor lg:hidden block"
            >
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
          </>
        )}
        <div
          className="hidden lg:flex lg:items-center lg:w-auto w-full"
          id="menu"
        >
          <nav>
            <ul className="lg:flex items-center justify-between gap-1 text-base text-gray-50 pt-4 lg:pt-0">
              {navElememts.map((element) => {
                if (element.requireAuthentication && !isAuthenticated) return;
                if (
                  element.requireAuthentication &&
                  element?.readers?.some((reader) => !roles.includes(reader))
                )
                  return;
                if (!element.requireAuthentication && isAuthenticated) return;

                return (
                  <li key={element.nav}>
                    <NavLink
                      className={({ isActive }) =>
                        `   block border-b-2 border-transparent hover:text-red-400  rounded-xl ${
                          isActive ? "text-cyan-300" : ""
                        } ${!isAuthenticated && "py-4 px-2"} ${
                          isActive && isAuthenticated
                            ? "text-zinc-800 font-semibold py-1.5 px-2 bg-gray-100 hover:text-zinc-800"
                            : isAuthenticated && !isActive
                            ? "text-zinc-800 py-1.5 px-2 hover:text-zinc-800  hover:bg-gray-100"
                            : ""
                        }`
                      }
                      to={
                        element.nav === "Home" || element.nav === "Dashboard"
                          ? "/"
                          : element.nav.toLowerCase()
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
                  isAuthenticated ? "text-red-500" : "text-cyan-500"
                }  hover:bg-zinc-800 hover:text-white cursor-pointer shadow-md `}
                variant="outline"
              >
                {isloading && "logging out"
                  ? "logging out"
                  : isAuthenticated
                  ? `Logout  `
                  : `Login `}
                {isAuthenticated && <LogOut />}
                {!isAuthenticated && <LogOut />}
              </Button>
            </ul>
          </nav>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
