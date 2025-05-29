import React, { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../Molecules/Navbar";
import Footer from "../Molecules/Footer";
import { useSelector } from "react-redux";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../Molecules/AppSidebar";
import AlertDialogComponent from "../Molecules/AlertDialog";
AlertDialogComponent;
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

  return (
    <SidebarProvider className="w-full overflow-auto">
      <Navbar />
      <div className="w-full flex bg-white field-sizing-content">
        <aside
          className={`mt-14  flex ${
            sidebarState.expanded === "expanded" ? "lg:w-64" : "lg:w-0"
          }  `}
        >
          <AppSidebar getSidebarState={getSidebarState} />
        </aside>

        <main
          className={`mt-14 w-full flex ${
            sidebarState.expanded === "expanded"
          }  overflow-auto`}
        >
          <SidebarTrigger className=" ml-2 hidden lg:inline fixed z-10" />

          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}

export default Applayout;
