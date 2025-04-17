import React from "react";
import { Sidebar } from "../ui/sidebar";
import { useSelector } from "react-redux";
import StatElement from "../Molecules/StatElement";
import {
  Calendar,
  Home,
  Inbox,
  Settings,
  LayoutDashboard,
  Coins,
  ChartColumn,
  Bell,
  Users,
  Pin,
  GraduationCap,
  Clock,
  Library,
  User,
} from "lucide-react";
import { Link } from "react-router";
const DashboardPage = () => {
  const { role, username } = useSelector((state) => state.auth.user);
  const statItems = [
    {
      statNumber: 20000,
      statHeading: "Fees Collected",
      classNames: "bg-blue-500",
      icon: <GraduationCap />,
    },
    {
      statNumber: 20,
      statHeading: "Teachers",
      classNames: "bg-red-500",
      icon: <GraduationCap />,
    },
    {
      statNumber: 200,
      statHeading: "Students",
      classNames: "bg-cyan-500",
      icon: <GraduationCap />,
    },
    {
      statNumber: 2,
      statHeading: "Inbox",
      classNames: "bg-gray-500",
      icon: <GraduationCap />,
    },
    {
      statNumber: 3,
      statHeading: "Notices",
      classNames: "bg-yellow-500",
      icon: <GraduationCap />,
    },
    {
      statNumber: 200,
      statHeading: "Atendence Today",
      classNames: "bg-indigo-500",
      icon: <GraduationCap />,
    },
  ];
  return (
    <main
      id="container"
      className="m-0 p-0 flex flex-col items-center w-full mt-2 "
    >
      <h2 className="text-2xl text-center font-bold text-indigo-500 ">
        Welcome {username}
      </h2>
      <section className="data-section flex flex-col w-full px-4 sm:px-5 my-6 self-start ">
        <h3 className="text-xl">Dashboard</h3>
        <div className="grid grid-cols-2 my-4 mb-16  items-stretch md:grid-cols-3 w-full gap-2 ">
          {statItems.map((item) => (
            <StatElement
              classNames={item.classNames}
              statNumber={item.statNumber}
              statHeading={item.statHeading}
              icon={<Bell size={64} color="#6e6f71" />}
            >
              <Link to="/" key={item.statHeading} />
            </StatElement>
          ))}
        </div>
        <div id="calender w-full flex justify-center ">
          <div>
            <script type="text/javascript">
              var nc_width = 'responsive'; var nc_height = 650; var nc_api_id =
              "721148p140";{" "}
            </script>
            <script
              type="text/javascript"
              src="https://www.ashesh.com.np/nepali-calendar/js/ncf.js?v=5"
            ></script>
            <div id="ncwidgetlink">
              Powered by ©{" "}
              <a
                href="https://www.ashesh.com.np/nepali-calendar/"
                id="nclink"
                title="Nepali calendar"
                target="_blank"
              >
                nepali calendar
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
