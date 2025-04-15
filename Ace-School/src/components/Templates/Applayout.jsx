import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Molecules/Navbar";
import Footer from "../Molecules/Footer";
import { useSelector } from "react-redux";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../Molecules/AppSidebar";

function Applayout() {
  // expects child routes
  const isAuthenticated = useSelector((state) => state.auth.user.isLoggedIn);

  return (
    <SidebarProvider
      className={`max-w-[100vw]  ${
        isAuthenticated ? "" : "flex flex-col justify-center"
      } `}
    >
      <Navbar />
      {isAuthenticated && <AppSidebar />}

      <main
        className={`mt-14 w-full flex ${
          isAuthenticated ? "" : "justify-center"
        }`}
      >
        {isAuthenticated && (
          <SidebarTrigger className="p-1 mx-2 hidden lg:inline" />
        )}
        <Outlet />
      </main>

      {!isAuthenticated && <Footer />}
    </SidebarProvider>
  );
}

export default Applayout;
