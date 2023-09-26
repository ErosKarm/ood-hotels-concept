"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

import { usePathname } from "next/navigation";

export const MainNav = () => {
  const pathname = usePathname();

  const routes = [
    {
      href: `/`,
      label: "Overview",
      active: pathname === `/`,
    },

    {
      href: `/gift-cards`,
      label: "Gift Cards",
      active: pathname === `/gift-cards`,
    },

    {
      href: `/cabins`,
      label: "Cabins",
      active: pathname === `/cabins`,
    },
    {
      href: `/concept`,
      label: "ÖÖD Concept",
      active: pathname === `/concept`,
    },
    {
      href: `/house`,
      label: "ÖÖD House",
      active: pathname === `/house`,
    },
  ];

  return (
    <nav className="flex space-x-8 items-center">
      {routes.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            "text-sm hover:text-black transition tracking-wide",
            route.active
              ? "text-black underline underline-offset-8"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
