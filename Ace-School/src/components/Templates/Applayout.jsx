import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Molecules/Navbar";
import Footer from "../Molecules/Footer";
function Applayout() {
  // expects child routes
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Applayout;
