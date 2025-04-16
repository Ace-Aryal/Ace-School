import React from "react";
import { Sidebar } from "../ui/sidebar";
import { useSelector } from "react-redux";
const DashboardPage = () => {
  const { role, username } = useSelector((state) => state.auth.user);
  return (
    <main
      id="container"
      className="m-0 p-0 flex flex-col items-center w-full mt-2 "
    >
      <h2 className="text-2xl text-center font-bold text-indigo-500 ">
        Welcome {username}
      </h2>
      <section className="data-section flex flex-col my-4 self-start ">
        <h3 className="text-xl">Dashboard</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div id="calender"></div>
      </section>
    </main>
  );
};

export default DashboardPage;
