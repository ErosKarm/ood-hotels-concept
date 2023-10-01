"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "./ui/separator";

import CabinItemSidebarForm from "./cabin-item-siderbar-form";

interface CabinItemSidebarProps {
  cabin: {
    amenities: {
      id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
    bookings: {
      id: string;
      cabinId: string;
      checkInDate: Date;
      checkOutDate: Date;
      isPaid: Boolean;
    }[];
    houseRules: {
      id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
    images: {
      id: string;
      cabinId: string;
      url: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
    // Add other properties here as needed
    id: string;
    name: string;
    checkOut: string;
    checkIn: string;
    description: string;
    location: string;
    isFeatured: boolean;
    isNew: boolean;
    price: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
}

// const formSchema = z.object({});

const CabinItemSidebar = ({ cabin }: CabinItemSidebarProps) => {
  return (
    <div className="flex items-start flex-col w-full px-0 2xl:px-4 mt-12 2xl:mt-0 col-span-2 2xl:col-span-1">
      <div className="flex flex-col px-12 mx-24 shadow rounded w-full 2xl:w-[500px] ml-auto py-8 2xl:sticky top-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-semibold tracking-wide">
            {cabin?.name}
          </h1>
          <Badge
            className="flex items-center justify-center bg-emerald-500 w-[50px] h-[20px] text-[10px] font-bold tracking-wider ml-2"
            variant="default"
          >
            NEW
          </Badge>
        </div>

        <span className="text-xs text-slate-700 w-[80%]  mb-4">
          Experience enchanting {cabin?.name}, where luxury and nature blend
          seamlessly in Estonia&apos;s coastal paradise.
        </span>

        <Separator />

        <CabinItemSidebarForm cabin={cabin} />
      </div>
    </div>
  );
};

export default CabinItemSidebar;
