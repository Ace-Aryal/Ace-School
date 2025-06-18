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
    <main className="flex flex-col bg-[#E6E6FA] ">
      <Navbar />
      <div className="mt-14 w-full flex ">
        <Outlet />
      </div>
      {currentLocation !== "/login" &&
        currentLocation !== "/signup" &&
        currentLocation !== "/recover-password-initiation" && <Footer />}
    </main>
  );
};

export default PublicAppLayout;
