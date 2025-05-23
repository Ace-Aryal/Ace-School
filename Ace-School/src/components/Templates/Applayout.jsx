import React, { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../Molecules/Navbar";
import Footer from "../Molecules/Footer";
import { useSelector } from "react-redux";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../Molecules/AppSidebar";

function Applayout() {
  const [sidebarState, setSidebarState] = useState("expanded");
  const getSidebarState = (state) => {
    setSidebarState(state);
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
    <SidebarProvider className={`w-[100vw] max-w-[100vw]`}>
      <Navbar />
      <AppSidebar getSidebarState={getSidebarState} />

      <main
        className={`mt-14  flex ${
          sidebarState === "expanded" ? "w-[calc(100vw-16rem)]" : "w-full"
        }  `}
      >
        <SidebarTrigger className="p-1 mx-2 hidden lg:inline fixed px-1 z-10" />

        <Outlet />
      </main>
    </SidebarProvider>
  );
}

export default Applayout;
