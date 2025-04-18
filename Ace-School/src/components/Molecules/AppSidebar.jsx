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
    url: "/billling",
    icon: Coins,
    readers: ["accountant"],
    writers: ["accountant"],
  },
  {
    title: "Attendance",
    url: "/attendance",
    icon: ChartColumn,
    readers: ["accountant", "teacher", "admin", "principal"],
    writers: ["accountant", "teacher", "admin", "principal"],
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
    readers: ["admin"],
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
    url: "/students",
    icon: GraduationCap,
    readers: ["accountant", "admin"],
    writers: ["none"],
  },
  {
    title: "View Teachers",
    url: "/teachers",
    icon: Users,
    readers: ["accountant", "admin"],
    writers: ["none"],
  },
  {
    title: "Class Schedule",
    url: "/timetable",
    icon: Clock,
    readers: ["accountant", "teacher", "admin", "principal"],
    writers: ["accountant", "admin", "principal"], // in every written place specify who wrote it in UI
  },
  {
    title: "Library",
    url: "/library",
    icon: Library,
    readers: ["all"],
    writers: ["accountant", "admin", "principal"],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    readers: ["all"],
  },
];

export default function AppSidebar() {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();

  const { role, username } = useSelector((state) => state.auth.user);

  return (
    <Sidebar
      className="mt-14 z-1 sm:z-0 bg-indigo-100"
      variant="sidebar"
      collapsible="offcanvas"
    >
      <SidebarContent className="bg-indigo-200">
        <SidebarGroup>
          <SidebarGroupLabel className="text-md flex gap-1 font-semibold ">
            <User size={64} />
            {`${username} (${role})`}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items
                .filter(
                  (element) =>
                    element.readers.includes("all") ||
                    element.readers.includes(role)
                )
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          `${isActive ? `text-blue-700` : ""} flex gap-1`
                        }
                      >
                        <item.icon size={18} />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
