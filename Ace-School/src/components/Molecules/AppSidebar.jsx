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
import { Link } from "react-router";
import { useSelector } from "react-redux";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
    readers: ["all"],
    writers: ["none"],
  },
  {
    title: "Fee Biling",
    url: "#",
    icon: Coins,
    readers: ["accountant"],
    writers: ["accountant"],
  },
  {
    title: "Attendence",
    url: "#",
    icon: ChartColumn,
    readers: ["accountant", "teacher", "admin", "principal"],
    writers: ["accountant", "teacher", "admin", "principal"],
  },
  {
    title: "Notices",
    url: "#",
    icon: Bell,
    readers: ["all"],
    writers: ["admin"],
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
    readers: ["admin"],
    writers: ["none"],
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
    readers: ["all"],
    writers: ["none"],
  },
  {
    title: "View Students",
    url: "#",
    icon: GraduationCap,
    readers: ["accountant", "admin"],
    writers: ["none"],
  },
  {
    title: "View Teachers",
    url: "#",
    icon: Users,
    readers: ["accountant", "admin"],
    writers: ["none"],
  },
  {
    title: "Class Schedule",
    url: "#",
    icon: Clock,
    readers: ["accountant", "teacher", "admin", "principal"],
    writers: ["accountant", "admin", "principal"], // in every written place specify who wrote it in UI
  },
  {
    title: "Library",
    url: "#",
    icon: Library,
    readers: ["all"],
    writers: ["accountant", "admin", "principal"],
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
      <SidebarContent className="bg-indigo-100">
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
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
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
