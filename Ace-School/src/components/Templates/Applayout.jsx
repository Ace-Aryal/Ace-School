import React, { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../Molecules/Navbar";
import Footer from "../Molecules/Footer";
import { useSelector } from "react-redux";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../Molecules/AppSidebar";

function Applayout() {
  const [sidebarState, setSidebarState] = useState({
    expanded: "expanded",
    isMobile: false,
  });
  const getSidebarState = (state, isMobile) => {
    setSidebarState({ expanded: state, isMobile });
  };
  console.log(sidebarState);

  // expects child routes
  const isAuthenticated = useSelector((state) => state.auth.user.isLoggedIn);
  if (!isAuthenticated) {
    return (
      <main className="flex flex-col w-[100w]">
        <Navbar />
        <div className="mt-14 w-full flex ">
          <Outlet />
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <SidebarProvider className={``}>
      <Navbar />
      <AppSidebar getSidebarState={getSidebarState} />

      <main
        className={`mt-14  flex ${
          sidebarState.expanded === "expanded"
            ? "w-full lg:w-[calc(100vw-16rem)]"
            : "w-full"
        }  `}
      >
        <SidebarTrigger className="p-1 mx-2 hidden lg:inline fixed px-1 z-10" />

        <Outlet />
      </main>
    </SidebarProvider>
  );
}

export default Applayout;
