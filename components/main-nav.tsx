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
import Image from "next/image";
import { useEffect, useState } from "react";

export const MainNav = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

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
      active: pathname === `https://oodhouse.com/`,
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

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="sm:flex lg:hidden items-center justify-center align-center text-xs font-[500] tracking-wider">
          <Menu className="w-6 h-6" />
        </SheetTrigger>
        <SheetContent className="w-full flex flex-col gap-10">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <Image
              src="/logo.svg"
              alt="ÖÖD Hotels Logo"
              width={130}
              height={130}
              className="invert"
            />
          </Link>

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
              onClick={() => setIsOpen(false)}
            >
              {route.label}
            </Link>
          ))}
        </SheetContent>
      </Sheet>
    </>
  );
};
