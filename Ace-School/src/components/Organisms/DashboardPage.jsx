import React, { useEffect } from "react";
import { Sidebar } from "../ui/sidebar";
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
  Presentation,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import databaseService from "@/appwrite/Database/database";
import { setMessages } from "@/features/inboxSlice";
import { useSelector, useDispatch } from "react-redux";
const DashboardPage = () => {
  const dispatch = useDispatch();
  const { role, username } = useSelector((state) => state.auth.user);

  if (role === "student" || role == "teacher") {
    return <h1>Hello {role}s</h1>;
  }
  const inboxNumber = useSelector((state) => state.inbox.noOfInboxes);
  const fetchMessages = async () => {
    const result = await databaseService.fetchMessages({ pageParam: null });
    if (!result) return;
    dispatch(setMessages(result));
    // expecting array of objects
  };

  useEffect(() => {
    fetchMessages();
  }, []);
  const statItems = [
    {
      statNumber: 20000,
      statHeading: "Fees Collected",
      classNames: "bg-blue-500",
      readers: ["accountant", "admin"],
      link: "/billing",
      icon: <Coins size={50} color="#6e6f71" />,
    },
    {
      statNumber: 20,
      statHeading: "Teachers",
      classNames: "bg-red-500",
      readers: ["accountant", "admin"],
      link: "/view-teachers",

      icon: <Users size={50} color="#6e6f71" />,
    },
    {
      statNumber: 300,
      statHeading: "Students",
      classNames: "bg-cyan-500",
      link: "/view-students",

      readers: ["accountant", "admin"],
      icon: <GraduationCap size={50} color="#6e6f71" />,
    },
    {
      statNumber: inboxNumber,
      statHeading: "Inbox",
      classNames: "bg-gray-400",
      link: "/inbox",

      icon: <Inbox size={50} color="#6e6f71" />,
      readers: ["accountant", "admin"],
    },
    {
      statNumber: 3,
      statHeading: "Notices",
      link: "/notice",

      classNames: "bg-yellow-500",
      icon: <Bell size={50} color="#6e6f71" />,
      readers: ["accountant", "admin"],
    },
    {
      statNumber: 200,
      statHeading: "Atendence Today",
      classNames: "bg-indigo-500",
      link: "/attendance",

      readers: ["accountant", "admin"],
      icon: <ChartColumn size={50} color="#6e6f71" />,
    },
    {
      statNumber: 10,
      statHeading: "Subjects",
      link: "/subjects",

      classNames: "bg-lime-500",
      readers: ["admin"],
      icon: <Library size={50} color="#6e6f71" />,
    },
    {
      statNumber: 13,
      statHeading: "Classes",
      link: "/classes",

      classNames: "bg-pink-500",
      readers: ["admin"],
      icon: <Presentation size={50} color="#6e6f71" />,
    },
    {
      statNumber: 20,
      statHeading: "Staffs",
      classNames: "bg-orange-500",
      link: "/staffs",

      readers: ["admin"],
      icon: <Users size={50} color="#6e6f71" />,
    },
  ];

  return (
    <main
      id="container"
      className="m-0 pl-2 p-0 flex flex-col items-center w-full mt-2 "
    >
      <h2 className="text-2xl text-center font-bold text-indigo-500 ">
        Welcome {username}
      </h2>
      <section className="data-section flex flex-col w-full px-4 sm:px-5 my-6 self-start ">
        <h3 className="text-xl">Dashboard</h3>
        <div className="grid grid-cols-2 my-4 mb-16  items-stretch md:grid-cols-3 w-full gap-2 ">
          {statItems.map((item) => (
            <Link
              className={`${item.classNames} flex items-center justify-center`}
              to={item.readers.includes(role) ? item.link : "/"}
              key={item.statHeading}
            >
              <StatElement
                className="h-[100%]"
                key={item.statHeading}
                statNumber={item.statNumber}
                statHeading={item.statHeading}
                icon={item.icon}
              />
            </Link>
          ))}
        </div>
        <div className="calender w-full flex justify-center ">
          <div className="w-full md:w-[60vw]">
            <iframe
              className=" w-full md:w-[60vw] aspect-square"
              src="https://ace-aryal.github.io/Learning_Web/03_Javascript/Calender/Calender.html"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
