import Image from "next/image";

import { Facebook, Instagram } from "lucide-react";
import { Separator } from "./ui/separator";

const Footer = () => {
  return (
    <footer className="text-white relative bg-slate-900 items-center justify-center grid grid-cols-6 px-8 sm:px-24 xl:px-72  pt-36 z-10 pb-24">
      <div className="absolute bg-image-opacity h-full w-full" />
      <div className="col-span-7  mb-8">
        <Image src="/logo.svg" alt="Logo" width={200} height={100} />
      </div>
      <div className="col-span-7 mb-6 lg:mb-0 lg:col-span-3 flex flex-col h-full ">
        <span className="font-bold">ÖÖD Hotel OÜ</span>

        <ul className="flex gap-4 flex-col mt-6 text-sm">
          <li>Tel: +372 533 347 72</li>
          <li>E-mail: info@oodhotels.com</li>
          <li>Erika St 14 Tallinn 10416 Estonia</li>
        </ul>
      </div>
      <Separator className="col-span-7 mb-8 lg:hidden" />
      <div className="flex flex-col h-full col-span-3 lg:col-span-1 mb-4 lg:mb-0">
        <span className="text-md mb-6 font-semibold tracking-wider text-">
          Links to navigate
        </span>
        <ul className="flex gap-4 flex-col text-sm">
          <li>Overview</li>
          <li>Gift Cards</li>
          <li>Cabins</li>
          <li>ÖÖD Concept</li>
          <li>ÖÖD House</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="flex-col h-full flex col-span-4 lg:col-span-1">
        <span className="text-md mb-6 font-semibold tracking-wider text-">
          Legal
        </span>

        <ul className="flex gap-4 flex-col text-sm">
          <li>Privacy Policy</li>
          <li>Terms & Conditions</li>
        </ul>
      </div>
      <Separator className="col-span-7 mb-8 lg:hidden" />
      <div className="flex flex-col h-full col-span-3 lg:col-span-1 mb-8 lg:mb-0">
        <span className="text-md mb-6 font-semibold tracking-wider text-">
          Locations
        </span>
        <ul className="flex gap-4 flex-col text-sm">
          <li>Estonia</li>
          <li>United States</li>
          <li>United Kingdom</li>
        </ul>
      </div>
      <div className="flex flex-col h-full">
        <span className="text-md mb-6 font-semibold tracking-wider text-">
          Follow us:
        </span>

        <ul className="flex gap-4 flex-col text-sm">
          <li className="flex items-center justify-center">
            <Facebook className="w-5 h-5 mr-2 bg-blue-700 p-0.5 rounded" />{" "}
            Facebook
          </li>
          <li className="flex items-center justify-center  ">
            <Instagram className="w-5 h-5 mr-2 p-0.5 rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500" />{" "}
            Instagram
          </li>
        </ul>
      </div>
      <div className="col-span-7 p-4 bg-white flex gap-4 items-center rounded-sm lg:col-span-2">
        <Image
          src={"/eu-invest.svg"}
          width={170}
          height={170}
          alt="Eu Invest Logo"
        />
        <Image
          className="ml-4"
          src="/covid-safe.png"
          alt="Covid Safe Logo"
          width={90}
          height={90}
        />
      </div>
      <div className="col-span-7 p-4 flex gap-x-4 lg:col-span-5 justify-end rounded-sm">
        <span className="text-[10px] text-slate-300">
          Available payment methods:
        </span>
        <Image
          src={"/american-express.webp"}
          width={40}
          height={40}
          alt="American Express Logo"
          className=""
        />
        <Image
          src={"/mastercard.svg"}
          width={40}
          height={40}
          alt="Mastercard Logo"
          className=""
        />
        <Image
          className=""
          src="/VISA-logo.png"
          alt="Visa Logo"
          width={40}
          height={40}
        />
      </div>
      <span className="text-[10px] mt-5 col-span-7 text-center lg:text-left lg:col-span-1">
        © 2023 Eros Karm - All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
