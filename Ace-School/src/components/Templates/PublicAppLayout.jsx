import React from "react";
Footer;
import Navbar from "../Molecules/Navbar";
import { Outlet } from "react-router";
import Footer from "../Molecules/Footer";
import { useLocation } from "react-router";
const PublicAppLayout = () => {
  const location = useLocation();
  const currentLocation = location.pathname;
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f9] ">
      <Navbar />
      <main className="mt-14 grow w-full flex ">
        <Outlet />
      </main>
      {currentLocation !== "/login" &&
        currentLocation !== "/signup" &&
        currentLocation !== "/recover-password-initiation" &&
        currentLocation !== "/recover-account" && <Footer />}
    </div>
  );
};

export default PublicAppLayout;
