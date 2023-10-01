"use client";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { formatPrice } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

interface CabinItemProps {
  cabin: {
    amenities: {
      id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
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

const CabinPageItem = ({ cabin }: CabinItemProps) => {
  const router = useRouter();

  return (
    <div
      className="mt-8 flex gap-x-6 group hover:shadow-md  transition-all cursor-pointer w-full lg:w-[500px]  xl:w-[600px]"
      onClick={() => router.push(`/cabins/${cabin?.id}`)}
    >
      <div className="h-[200px]  w-[500px] relative">
        <Image
          src={cabin?.images[0].url || ""}
          fill
          alt="Cabin Image"
          className="object-cover rounded-md "
        />
        <Badge className="absolute top-2 left-2 bg-emerald-500 text-[11px]">
          NEW
        </Badge>
        <h2 className="text-xs font-semibold absolute bottom-2 left-2  text-slate-700 bg-white p-1.5 rounded-sm">
          {cabin?.location}
        </h2>
      </div>

      <div className="p-2 group flex flex-col w-full">
        <div className="flex justify-between">
          <span className="text-xs flex items-center">
            <MapPin className="w-4 h-4 text-emerald-700" />
            {cabin?.location}
          </span>
          {cabin?.isNew === true ? (
            <Badge className="text-[11px] ml-auto">NEW</Badge>
          ) : (
            ""
          )}
        </div>
        <h2 className="text-md font-semibold text-slate-800 mt-6">
          {cabin?.name}
        </h2>
        <div>
          <span>{formatPrice(`${cabin?.price}`)}€</span>
          <span className="text-xs text-slate-500">/ per night</span>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between gap-x-2">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">
                Check In: {cabin?.checkIn}
              </span>
              <span className="text-xs text-muted-foreground">
                Check Out: {cabin?.checkOut}
              </span>
            </div>

            <div className="hidden sm:flex items-center justify-center lg:hidden xl:flex">
              <span className="text-[10px] mr-2">Pay with:</span>
              <Image
                src={"/american-express.webp"}
                width={40}
                height={40}
                alt="American Express image"
              />
              <Image
                src={"/mastercard.svg"}
                width={25}
                height={25}
                alt="American Express image"
              />
              <Image
                src={"/VISA-logo.png"}
                width={30}
                height={30}
                alt="American Express image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabinPageItem;
