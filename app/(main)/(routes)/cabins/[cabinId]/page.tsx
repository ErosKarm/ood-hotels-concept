import CabinItemImages from "@/components/cabin-item-images";
import CabinItemSidebar from "@/components/cabin-item-sidebar";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import {
  AlertCircle,
  ArrowRight,
  Circle,
  Navigation,
  ShowerHead,
} from "lucide-react";
import Image from "next/image";

const CabinPage = async ({ params }: { params: { cabinId: string } }) => {
  const cabin = await prismadb.cabin.findFirst({
    where: {
      id: params.cabinId,
    },
    include: {
      images: true,
      amenities: true,
      houseRules: true,
      bookings: true,
    },
  });

  return (
    <Container>
      <div className="mb-4">
        <span className="text-xs">
          Cabins --{">"} {cabin?.name}
        </span>
      </div>
      <div className="grid grid-cols-2 w-full h-full gap-x-8 relative 2xl:grid-cols-3">
        <div className="col-span-2">
          <CabinItemImages images={cabin?.images} />

          <div className="grid grid-cols-2 justify-between items-center mt-8">
            <h1 className="text-3xl font-semibold flex items-center">
              {cabin?.name}
            </h1>

            <div className="flex flex-col gap-x-2 text-muted-foreground text-[12px] items-end">
              <span>Check In: {cabin?.checkIn}</span>
              <span>Check In: {cabin?.checkOut}</span>
            </div>
            <Badge
              className="flex items-center justify-center bg-emerald-500 w-[50px] text-[10px] font-bold tracking-wider"
              variant="default"
            >
              NEW
            </Badge>
          </div>

          <div className="flex gap-x-5 mt-4">
            <span className="flex items-center text-xs">
              <ShowerHead className="w-6 h-6 bg-slate-800 text-white p-0.5 rounded-full mr-1" />{" "}
              {cabin?.amenities.length} Amenities
            </span>
            <span className="flex items-center text-xs">
              <AlertCircle className="w-6 h-6 bg-slate-800 text-white p-0.5 rounded-full mr-1" />{" "}
              {cabin?.houseRules.length} House Rules
            </span>
            <span className="flex items-center text-xs">
              <Navigation className="w-6 h-6 bg-slate-800 text-white p-0.5 rounded-full mr-1" />{" "}
              {cabin?.location}
              <Image
                src={"/ee-flag.png"}
                width={20}
                height={20}
                alt="estonian flag"
                className="ml-2 shadow-md"
              />
            </span>
          </div>

          <Separator className="mb-5 mt-5" />

          <h1 className="text-xl font-semibold mb-4 text-slate-800">
            Description
          </h1>
          <p className="text-sm text-slate-700 leading-6">
            {cabin?.description}
          </p>

          <div>
            <Separator className="mb-5 mt-5" />
            <h1 className="text-xl font-semibold mb-4 text-slate-800">
              Amenities
            </h1>

            <ul className="grid grid-cols-3 gap-4">
              {cabin?.amenities.map((amenity) => (
                <li
                  key={amenity.id}
                  className="flex items-center text-sm text-slate-700"
                >
                  <Circle className="w-2 h-2 font-semibold bg-emerald-700 rounded-full text-white p-0.5 mr-2" />
                  {amenity.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Separator className="mb-5 mt-5" />
            <h1 className="text-xl font-semibold mb-4 text-slate-800">
              House Rules
            </h1>
            <ul className="grid grid-cols-1 gap-4">
              {cabin?.houseRules.map((rule) => (
                <li
                  key={rule.id}
                  className="flex items-center text-sm text-slate-700"
                >
                  <Circle className="w-2 h-2 font-semibold bg-emerald-700 rounded-full text-white p-0.5 mr-2" />
                  {rule.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Separator className="mb-5 mt-5" />
            <h1 className="text-xl font-semibold mb-4 text-slate-800">
              Cancellation
            </h1>
            <ul className="grid grid-cols-1 gap-4 mb-5">
              <li className="flex items-center text-sm text-slate-700">
                <Circle className="w-2 h-2 font-semibold bg-emerald-700 rounded-full text-white p-0.5 mr-2" />
                To receive a full refund, guests must cancel within 48 hours of
                making the booking - and the booking must be more than 14 days
                ahead of the stay.
              </li>
              <li className="flex items-center text-sm text-slate-700">
                <Circle className="w-2 h-2 font-semibold bg-emerald-700 rounded-full text-white p-0.5 mr-2" />
                After 48 hours and more than 7 days before the time of the stay,
                50% of the total booking amount will be refunded.
              </li>
              <li className="flex items-center text-sm text-slate-700">
                <Circle className="w-2 h-2 font-semibold bg-emerald-700 rounded-full text-white p-0.5 mr-2" />
                If the guest cancels 7 days or less before check-in, no refund
                will be issued.
              </li>
            </ul>

            <span className="text-xs text-slate-600">
              NB! Refund will be transferred to the payment account within 5-10
              business days. Please note that in case of cancellation, a
              transaction fee of 3% of the booking amount will be charged.
            </span>
          </div>
        </div>

        <CabinItemSidebar cabin={cabin} />
      </div>

      <Separator className="mt-12" />
    </Container>
  );
};

export default CabinPage;
