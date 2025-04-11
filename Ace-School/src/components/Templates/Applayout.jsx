import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Molecules/Navbar";
import Footer from "../Molecules/Footer";
import { useSelector } from "react-redux";
function Applayout() {
  // expects child routes
  const isAuthenticated = useSelector((state) => state.auth.user.isLoggedIn);
  return (
    <div className="max-w-[100vw]">
      <Navbar />
      <Outlet />
      {!isAuthenticated && <Footer />}
    </div>
  );
}

export default Applayout;
