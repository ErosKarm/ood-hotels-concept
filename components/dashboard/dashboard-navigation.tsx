"use client";

import { Codesandbox, GanttChart, MailWarning, SmilePlus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const DashboardNavigation = () => {
  const pathname = usePathname();

  const routes = [
    {
      label: "Overview",
      href: `/dashboard/`,
      active: pathname === `/dashboard/`,
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
  ];

  return (
    <div className="mx-auto items-center p-4 ">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className="flex items-center text-[12px] tracking-wide  text-zinc-500 font-semibold hover:text-black bg-rose-500"
        >
          {route.icon} {route.label}
        </Link>
      ))}
    </div>
  );
};
