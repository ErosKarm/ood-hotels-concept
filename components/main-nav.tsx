"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";

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
    <>
      <nav className="lg:flex space-x-8 items-center hidden">
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

      <Sheet>
        <SheetTrigger className="sm:flex lg:hidden items-center justify-center align-center text-xs font-[500] tracking-wider">
          <Menu className="w-6 h-6" />
        </SheetTrigger>
        <SheetContent className="w-full">
          <SheetHeader>
            <SheetTitle>Are you sure absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};
