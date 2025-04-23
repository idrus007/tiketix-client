import * as React from "react";
import {
  CalendarDays,
  GalleryVerticalEnd,
  LayoutGrid,
  PieChart,
  Settings2,
  ShoppingCart,
  Tickets,
  UserRound,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUser } from "@/hooks/use-user";

const data = {
  teams: [
    {
      name: "Tiketix",
      logo: GalleryVerticalEnd,
      plan: "Admin",
    },
  ],
  navMain: [
    {
      title: "Overview",
      url: "#",
      icon: LayoutGrid,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
        },
        {
          title: "Analytics",
          url: "#",
        },
      ],
    },
    {
      title: "Events",
      url: "#",
      icon: CalendarDays,
      items: [
        {
          title: "All Events",
          url: "/admin/events",
        },
        {
          title: "Create Event",
          url: "/admin/events/create",
        },
      ],
    },
    {
      title: "Tickets",
      url: "#",
      icon: Tickets,
      items: [
        {
          title: "All Tickets",
          url: "#",
        },
        {
          title: "Create Ticket",
          url: "#",
        },
      ],
    },
    {
      title: "Orders",
      url: "#",
      icon: ShoppingCart,
      items: [
        {
          title: "All Orders",
          url: "#",
        },
        {
          title: "Create Order",
          url: "#",
        },
      ],
    },
    {
      title: "Customers",
      url: "#",
      icon: UserRound,
      items: [
        {
          title: "All Customers",
          url: "#",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: PieChart,
      items: [
        {
          title: "Sales Report",
          url: "#",
        },
        {
          title: "Customer Report",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { dataUser, loading, error } = useUser();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {loading ? (
          <div className="text-sm px-4 py-2">Loading user...</div>
        ) : error ? (
          <div className="text-sm text-red-500 px-4 py-2">
            Error loading user
          </div>
        ) : (
          dataUser && <NavUser user={dataUser} />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
