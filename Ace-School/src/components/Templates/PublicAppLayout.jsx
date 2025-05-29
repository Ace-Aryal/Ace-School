import React from "react";
Footer;
import Navbar from "../Molecules/Navbar";
import { Outlet } from "react-router";
import Footer from "../Molecules/Footer";

const PublicAppLayout = () => {
  return (
    <main className="flex flex-col bg-[#E6E6FA] ">
      <Navbar />
      <div className="mt-14 w-full flex ">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default PublicAppLayout;
