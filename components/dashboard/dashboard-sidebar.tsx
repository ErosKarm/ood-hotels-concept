"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import {
  Codesandbox,
  GanttChart,
  ListOrdered,
  LogOut,
  MailWarning,
  Settings,
  SmilePlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { DashboardNavigation } from "@/components/dashboard/dashboard-navigation";
import { cn } from "@/lib/utils";

const DashboardSidebar = () => {
  const pathname = usePathname();

  const routes = [
    {
      label: "Overview",
      href: `/dashboard`,
      active: pathname === `/dashboard`,
      icon: <GanttChart className="w-6 h-6 mr-2" />,
    },

    {
      label: "Cabins",
      href: `/dashboard/cabins`,
      active: pathname === `/dashboard/cabins`,
      icon: <Codesandbox className="w-6 h-6 mr-2" />,
    },

    {
      label: "House Rules",
      href: `/dashboard/house-rules`,
      active: pathname === `/dashboard/house-rules`,
      icon: <MailWarning className="w-6 h-6 mr-2" />,
    },

    {
      label: "Amenities",
      href: `/dashboard/amenities`,
      active: pathname === `/dashboard/amenities`,
      icon: <SmilePlus className="w-6 h-6 mr-2" />,
    },

    {
      label: "Bookings",
      href: `/dashboard/bookings`,
      active: pathname === `/dashboard/bookings`,
      icon: <ListOrdered className="w-6 h-6 mr-2" />,
    },
  ];

  const settingsRoute = [
    {
      label: "Settings",
      href: `/dashboard/settings`,
      active: pathname === `/dashboard/settings`,
      icon: <Settings className="w-6 h-6 mr-2" />,
    },
  ];

  const { signOut } = useClerk();

  return (
    <div className="flex flex-col mx-4 pt-10 space-y-8 h-full">
      <span className="capitalize text-xl font-semibold text-zinc-600 ">
        Navigation
      </span>

      <div className="bg-white rounded-md shadow-sm w-72 p-4 ">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center text-[12px] tracking-wide  px-4 py-3 text-slate-800 font-semibold",
              route.active ? "bg-slate-400/10 rounded-md" : ""
            )}
          >
            {route.icon} {route.label}
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-md shadow-sm w-72 p-4 ">
        {settingsRoute.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="flex items-center text-[12px] tracking-wide  p-4 text-slate-800 font-semibold "
          >
            {route.icon} {route.label}
          </Link>
        ))}

        <Button
          variant="ghost"
          onClick={() => signOut()}
          className="flex items-center text-[12px] tracking-wide  p-4 text-slate-800 font-semibold"
        >
          <LogOut className="w-6 h-6 mr-2" /> Log out
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
