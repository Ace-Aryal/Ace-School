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
  IdCard,
  ArrowBigRightDash,
  Activity,
} from "lucide-react";

import { useSidebar } from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router";

import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import databaseService from "@/appwrite/Database/database";
import authService from "@/appwrite/auth/auth";
import LogoutButton from "../Atoms/LogoutButton";
import { useEffect } from "react";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    readers: ["all"],
    writers: ["none"],
  },
  {
    title: "Fee Biling",
    url: "/billing",
    icon: Coins,
    readers: ["account", "admin"],
    writers: ["account"],
  },
  {
    title: "Attendance",
    url: "/attendance",
    icon: ChartColumn,
    readers: ["all"],
    writers: ["account", "teacher", "admin", "principal"],
  },
  {
    title: "Notices",
    url: "/notice",
    icon: Bell,
    readers: ["all"],
    writers: ["admin"],
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
    readers: ["admin", "account"],
    writers: ["none"],
  },
  {
    title: "Calendar",
    url: "/calender",
    icon: Calendar,
    readers: ["all"],
    writers: ["none"],
  },
  {
    title: "View Students",
    url: "/view-students",
    icon: GraduationCap,
    readers: ["account", "admin"],
    writers: ["none"],
  },
  {
    title: "View Teachers",
    url: "/view-teachers",
    icon: Users,
    readers: ["account", "admin"],
    writers: ["none"],
  },
  {
    title: "View Staffs",
    url: "/view-staffs",
    icon: IdCard,
    readers: ["account", "admin"],
    writers: ["none"],
  },
  {
    title: "Class Schedule",
    url: "/timetable",
    icon: Clock,
    readers: ["all"],
    writers: ["account", "admin", "principal"], // in every written place specify who wrote it in UI
  },
  // {
  //   title: "Library",
  //   url: "/library",
  //   icon: Library,
  //   readers: ["all"],
  //   writers: ["account", "admin", "principal"],
  // },
  {
    title: "Activity logs",
    url: "/activity-logs",
    icon: Activity,
    readers: ["admin", "account"],
    writers: ["all"],
  },
  {
    title: "Settings",
    url: "/change-password",
    icon: Settings,
    readers: ["all"],
  },
  {
    title: "Logout",

    icon: ArrowBigRightDash,
    readers: ["all"],
  },
];

export default function AppSidebar({ getSidebarState }) {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,

    toggleSidebar,
  } = useSidebar();

  const { roles, username } = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    getSidebarState(state, isMobile);
  }, [state]);
  return (
    <Sidebar
      className="mt-8 pt-10 z-1 sm:z-0 border-r border-gray-300 sideBarTransition "
      variant="sidebar"
      collapsible="offcanvas"
    >
      <SidebarContent className="bg-white ">
        <SidebarGroup className="flex flex-col">
          <SidebarGroupLabel className="h-fit capitalize text-md flex flex-col gap-1 mb-1 font-semibold ">
            <div className="flex w-full justify-start items-center">
              <User size={20} />
              <p>{username}</p>
            </div>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="">
              {items
                .filter(
                  (element) =>
                    element.readers.includes("all") ||
                    element.readers.some((reader) => roles?.includes(reader))
                )
                .map((item) => {
                  if (item.title === "Logout") {
                    return <LogoutButton key={item.title} />;
                  }

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton>
                        <NavLink
                          to={item.url}
                          className={({ isActive }) =>
                            `${
                              isActive
                                ? ` font-semibold bg-blue-100 text-blue-700 `
                                : ""
                            } flex gap-1 p-2 rounded-xl hover:bg-blue-100 w-full`
                          }
                        >
                          <item.icon size={18} />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
