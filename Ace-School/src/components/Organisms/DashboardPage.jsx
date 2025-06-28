import React, { useEffect, useMemo, useState } from "react";
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
import { Link } from "react-router";
import databaseService from "@/appwrite/Database/database";
import { useSelector } from "react-redux";
import NonPriviligesDashboard from "./NonPriviligesDashboard";
import config from "@/appwrite";
import { todayDate } from "@/utils/datetime";
import { useQueries } from "@tanstack/react-query";
const DashboardPage = () => {
  const { roles, username } = useSelector((state) => state.auth.user);

  const results = useQueries({
    queries: [
      {
        queryKey: ["feesCollected"],
        queryFn: async () => {
          try {
            const response = databaseService.getDocument(
              config.dailyFeeStatid,
              todayDate
            );
            return response;
          } catch (error) {
            console.error(error);
            return false;
          }
        },
      },
      {
        queryKey: ["teachers"],
        queryFn: async () => {
          try {
            const response = databaseService.listDashboardDocuments(
              config.appwritreTeachersCollectionID
            );
            return response;
          } catch (error) {
            console.error(error);
            return false;
          }
        },
      },
      {
        queryKey: ["staffs"],
        queryFn: async () => {
          try {
            const response = databaseService.listDashboardDocuments(
              config.appwritreStaffsCollectionID
            );
            return response;
          } catch (error) {
            console.error(error);
            return false;
          }
        },
      },
      {
        queryKey: ["students"],
        queryFn: async () => {
          try {
            const response = databaseService.listDashboardDocuments(
              config.appwritreStudentCollectionID
            );
            return response;
          } catch (error) {
            console.error(error);
            return false;
          }
        },
      },
      {
        queryKey: ["notices"],
        queryFn: async () => {
          try {
            const response = databaseService.listDashboardDocuments(
              config.noticeCollectionID
            );
            return response;
          } catch (error) {
            console.error(error);
            return false;
          }
        },
      },
      {
        queryKey: ["inboxes"],
        queryFn: async () => {
          try {
            const response = databaseService.listDashboardDocuments(
              config.emailCollectionID
            );
            return response;
          } catch (error) {
            console.error(error);
            return false;
          }
        },
      },
      {
        queryKey: ["attendance"],
        queryFn: async () => {
          try {
            const response = databaseService.getDocument(
              config.studentAttendenceCollectionId,
              todayDate
            );
            return response;
          } catch (error) {
            console.error(error);
            return false;
          }
        },
      },
    ],
  });
  if (!roles?.includes("admin") && !roles?.includes("account")) {
    return <NonPriviligesDashboard />;
  }
  const [
    feesRes,
    teachersRes,
    staffsRes,
    studentsRes,
    noticeRes,
    inboxRes,
    attRes,
  ] = results;
  console.log(feesRes, "feesRes");

  const attendanceRecord = useMemo(
    () =>
      attRes.data && attRes.data.Report ? JSON.parse(attRes.data.Report) : {},
    [attRes.data]
  );

  const [attendaneNumber, setAttndancenumber] = useState(0);

  useEffect(() => {
    for (const grade in attendanceRecord) {
      const element = attendanceRecord[grade];
      element.forEach((student) => {
        if (student.att.toLowerCase() === "present") {
          console.log(student);
          setAttndancenumber((prev) => prev + 1);
        }
      });
    }
  }, [attendanceRecord]);

  const statItems = [
    {
      statNumber: feesRes.data?.total ?? 0,
      statHeading: "Fees Collected",
      readers: ["account", "admin"],
      link: "/billing",
      icon: <Coins size={50} color="#6e6f71" />,
      color: "yellow",
    },
    {
      statNumber: teachersRes.data?.total ?? 0,
      statHeading: "Teachers",
      classNames: "border rounded-xl text-zinc-700",
      readers: ["account", "admin"],
      link: "/view-teachers",
      icon: <Users size={50} color="#6e6f71" />,
      color: "blue",
    },
    {
      statNumber: studentsRes.data?.total ?? 0,
      statHeading: "Students",
      classNames: "border rounded-xl text-zinc-700",
      link: "/view-students",
      readers: ["account", "admin"],
      icon: <GraduationCap size={50} color="#6e6f71" />,
      color: "green",
    },
    {
      statNumber: inboxRes.data?.total ?? 0,
      statHeading: "Inbox",
      classNames: "border rounded-xl text-zinc-700",
      link: "/inbox",
      icon: <Inbox size={50} color="#6e6f71" />,
      readers: ["account", "admin"],
      color: "red",
    },
    {
      statNumber: noticeRes.data?.total ?? 0,
      statHeading: "Notices",
      link: "/notice",
      classNames: "border rounded-xl text-zinc-700",
      icon: <Bell size={50} color="#6e6f71" />,
      readers: ["account", "admin"],
      color: "orange",
    },
    {
      statNumber: attendaneNumber,
      statHeading: "Atendence Today",
      classNames: "border rounded-xl text-zinc-700",
      link: "/attendance",
      readers: ["account", "admin"],
      icon: <ChartColumn size={50} color="#6e6f71" />,
      color: "red",
    },
    {
      statNumber: 11,
      statHeading: "Subjects",
      link: "/subjects",
      classNames: "border rounded-xl text-zinc-700",
      readers: ["admin"],
      icon: <Library size={50} color="#6e6f71" />,
      color: "indigo",
    },
    {
      statNumber: 11,
      statHeading: "Classes",
      link: "/classes",
      classNames: "border rounded-xl text-zinc-700",
      readers: ["admin"],
      icon: <Presentation size={50} color="#6e6f71" />,
      color: "pink",
    },
    {
      statNumber: staffsRes.data?.total ?? 0,
      statHeading: "Staffs",
      classNames: "border rounded-xl text-zinc-700",
      link: "/staffs",
      readers: ["admin"],
      icon: <Users size={50} color="#6e6f71" />,
      color: "cyan",
    },
  ];

  return (
    <main
      id="container"
      className="m-0 pl-2 p-0 flex flex-col items-center w-full mt-10 "
    >
      <h2 className="text-2xl text-center font-semibold text-zinc-700">
        Welcome, {username}
      </h2>
      <section className="data-section flex flex-col w-full px-4 sm:px-5 my-6 self-start ">
        <h3 className="text-3xl my-3 font-semibold">Dashboard</h3>
        <div className="grid grid-cols-2 my-4 mb-16  items-stretch md:grid-cols-3 w-full gap-2 ">
          {statItems.map((item) => (
            <StatElement
              item={item}
              key={item.statHeading}
              statNumber={item.statNumber}
              statHeading={item.statHeading}
              icon={item.icon}
              color={item.color}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
