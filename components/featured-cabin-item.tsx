"use client";

import { Amenity, Cabin, HouseRule, Image as ImageModel } from "@prisma/client";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { formatPrice } from "@/lib/utils";
import { Navigation, ShowerHead } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface FeaturedCabinItemProps {
  amenities: Amenity[];
  houseRules: HouseRule[];
  images: ImageModel[];
  id: string;
  name: string;
  checkOut: string;
  latitude: string;
  longitude: string;
  checkIn: string;
  description: string;
  location: string;
  isFeatured: boolean;
  isNew: boolean;
  price: string;
  createdAt: Date;
  updatedAt: Date;
}

const FeaturedCabinItem = ({ cabin }: { cabin: FeaturedCabinItemProps }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-auto w-[350px]">
      <div className="group relative h-[220px] w-full transition">
        <Image
          src={cabin.images[0].url}
          alt="Cabin Image"
          fill
          className="object-cover rounded-[25px]"
        />

        <div
          onClick={() => router.push(`/cabins/${cabin.id}`)}
          className="hidden group-hover:flex items-center justify-center absolute h-full w-full bg-emerald-700/50 text-white rounded-[25px] z-40 transition cursor-pointer"
        >
          Check out
        </div>

        {cabin.isNew ? (
          <Badge className="absolute top-3 left-3 bg-emerald-500">New</Badge>
        ) : (
          ""
        )}

        <Badge className="absolute bottom-3 right-3" variant={"secondary"}>
          {cabin.images.length} photos
        </Badge>
      </div>
      <div className="flex justify-between mt-6">
        <span className="font-semibold text-zinc-700 ">{cabin.name}</span>

        <div className="flex flex-col text-right text-[10px] text-muted-foreground">
          <span>checkin: {cabin.checkIn}</span>
          <span>checkout: {cabin.checkOut}</span>
        </div>
      </div>
      <span className="text-xs">
        <b className="text-2xl font-semibold">${formatPrice(cabin.price)}</b> /
        day
      </span>

      <div className="flex gap-x-6  mt-3 text-slate-800 text-xs">
        <span className="flex items-center">
          <Navigation className="h-5 w-5 mr-1 bg-slate-800 text-white p-1 rounded-full" />
          {cabin.location.slice(0, cabin.location.indexOf(","))}
          ,
          <Image
            width={16}
            height={16}
            src="/ee-flag.png"
            alt="estonian flag"
            className="shadow-md ml-1"
          />
        </span>
        <span className="flex items-center">
          <ShowerHead className="h-5 w-5 mr-1 bg-slate-800 text-white p-1 rounded-full" />
          {cabin.amenities.length} amenities..
        </span>

        <Button className="ml-auto text-xs" size="sm">
          Check out
        </Button>
      </div>
    </div>
  );
};

export default FeaturedCabinItem;
