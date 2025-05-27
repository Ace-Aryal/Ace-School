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
import { setNotices } from "@/features/noticeSlice";
const DashboardPage = () => {
  const dispatch = useDispatch();
  const { roles, username } = useSelector((state) => state.auth.user);

  if (!roles?.includes("admin") && !roles?.includes("account")) {
    return <h1>Hello {roles[0]}</h1>;
  }
  const inboxCount = useSelector((state) => state.inbox.noOfInboxes);
  const noticeCount = useSelector((state) => state.notice.noOfNotices);
  const fetchDashboardData = async () => {
    const fetchMessages = databaseService.fetchMessages({
      pageParam: null,
      dashboardFetch: true,
    });
    const fetchNotices = databaseService.fetchNotices({
      pageParam: null,
      dashboardFetch: true,
    });
    // if (!result) return;
    // dispatch(setMessages(result));
    // // expecting array of objects
    try {
      const [notices, messages] = await Promise.all([
        fetchNotices,
        fetchMessages,
      ]);

      dispatch(setMessages(messages));
      dispatch(setNotices(notices));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  const statItems = [
    {
      statNumber: 20000,
      statHeading: "Fees Collected",
      readers: ["account", "admin"],
      link: "/billing",
      icon: <Coins size={50} color="#6e6f71" />,
    },
    {
      statNumber: 20,
      statHeading: "Teachers",
      classNames: "border rounded-xl text-zinc-700",
      readers: ["account", "admin"],
      link: "/view-teachers",

      icon: <Users size={50} color="#6e6f71" />,
    },
    {
      statNumber: 300,
      statHeading: "Students",
      classNames: "border rounded-xl text-zinc-700",
      link: "/view-students",

      readers: ["account", "admin"],
      icon: <GraduationCap size={50} color="#6e6f71" />,
    },
    {
      statNumber: inboxCount > 9 ? "9+" : inboxCount,
      statHeading: "Inbox",
      classNames: "border rounded-xl text-zinc-700",
      link: "/inbox",

      icon: <Inbox size={50} color="#6e6f71" />,
      readers: ["account", "admin"],
    },
    {
      statNumber: noticeCount > 9 ? "9+" : noticeCount,
      statHeading: "Notices",
      link: "/notice",

      classNames: "border rounded-xl text-zinc-700",
      icon: <Bell size={50} color="#6e6f71" />,
      readers: ["account", "admin"],
    },
    {
      statNumber: 200,
      statHeading: "Atendence Today",
      classNames: "border rounded-xl text-zinc-700",
      link: "/attendance",

      readers: ["account", "admin"],
      icon: <ChartColumn size={50} color="#6e6f71" />,
    },
    {
      statNumber: 10,
      statHeading: "Subjects",
      link: "/subjects",

      classNames: "border rounded-xl text-zinc-700",
      readers: ["admin"],
      icon: <Library size={50} color="#6e6f71" />,
    },
    {
      statNumber: 13,
      statHeading: "Classes",
      link: "/classes",

      classNames: "border rounded-xl text-zinc-700",
      readers: ["admin"],
      icon: <Presentation size={50} color="#6e6f71" />,
    },
    {
      statNumber: 20,
      statHeading: "Staffs",
      classNames: "border rounded-xl text-zinc-700",
      link: "/staffs",

      readers: ["admin"],
      icon: <Users size={50} color="#6e6f71" />,
    },
  ];

  return (
    <main
      id="container"
      className="m-0 pl-2 p-0 flex flex-col items-center w-full mt-10 "
    >
      <h2 className="text-2xl text-center font-bold text-zinc-700">
        Welcome, {username}
      </h2>
      <section className="data-section flex flex-col w-full px-4 sm:px-5 my-6 self-start ">
        <h3 className="text-xl my-3">Dashboard</h3>
        <div className="grid grid-cols-2 my-4 mb-16  items-stretch md:grid-cols-3 w-full gap-2 ">
          {statItems.map((item) => (
            <Link
              className={`shadow-lg hover:bg-gray-100 shadow-black/30 border rounded-xl border-gray-400 flex items-center justify-center sm:justify-between`}
              to={
                item.readers.some((reader) => roles?.includes(reader))
                  ? item.link
                  : "/"
              }
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
        <div className="calender w-full flex justify-center mt-10 ">
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
