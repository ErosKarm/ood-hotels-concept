import { MainNav } from "@/components/main-nav";
import { Shell } from "lucide-react";
import Link from "next/link";
import Container from "./ui/container";
import NavActions from "./nav-actions";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex items-center w-full justify-between px-12 pt-6">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.svg"
          alt="ÖÖD Hotels Logo"
          width={130}
          height={130}
          className="invert"
        />
      </Link>
      <div className="flex gap-x-12">
        <MainNav />
        <NavActions />
      </div>
    </div>
  );
};

export default Navbar;
