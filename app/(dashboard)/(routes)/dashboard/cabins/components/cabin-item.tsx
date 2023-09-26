"use client";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Amenity,
  Booking,
  Cabin,
  HouseRule,
  Image as ImageModel,
} from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowDownNarrowWide,
  BadgeEuro,
  Delete,
  Edit,
  FileWarning,
  ListOrdered,
  LocateIcon,
  Shell,
  ShowerHead,
  Trash,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import CabinItemAlert from "./cabin-item-alert";

interface CabinTableProps {
  amenities: Amenity[];
  houseRules: HouseRule[];
  images: ImageModel[];
  bookings: Booking[];
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
}

const CabinItem = ({ cabin }: { cabin: CabinTableProps }) => {
  const router = useRouter();

  const onDelete = async (data: CabinTableProps) => {
    try {
      await axios.delete("/api/cabins", {
        data,
      });
      router.refresh();
    } catch (error) {
      console.log("error deleting cabin");
    }
  };

  return (
    <>
      <Table className="cursor-pointer mb-8">
        <TableHeader className="">
          <TableRow>
            <TableHead className="w-[200px]">Image</TableHead>
            <TableHead className="w-[200px]">Cabin Name</TableHead>
            <TableHead>Cabin price</TableHead>
            <TableHead>Total bookings</TableHead>
            <TableHead>Is Featured</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium relative h-24 w-36 p-4">
              <Image
                src={cabin.images[0] ? cabin.images[0].url : ""}
                alt="Cabin Image"
                fill
                className="object-cover overflow-hidden rounded z-10"
              />
            </TableCell>
            <TableCell className="text-md font-semibold">
              {cabin.name}
            </TableCell>
            <TableCell>{formatPrice(cabin.price)} € / per night</TableCell>
            <TableCell className="">
              <div className="flex">
                <ListOrdered className="text-white w-5 h-5 mr-2 bg-orange-500 p-0.5 rounded-full" />{" "}
                Bookings: {cabin.bookings.length}
              </div>
            </TableCell>
            <TableCell>
              {cabin.isFeatured === true ? (
                <Badge className="bg-emerald-500">TRUE</Badge>
              ) : (
                <Badge className="bg-red-500">FALSE</Badge>
              )}
            </TableCell>
            <TableCell>
              <div className="flex gap-x-2">
                <Button
                  size={"icon"}
                  onClick={() =>
                    router.push(`/dashboard/cabins/new/${cabin.id}`)
                  }
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <CabinItemAlert
                  cabin={cabin}
                  onDelete={() => onDelete(cabin)}
                />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* <div className="group relative mt-7 h-[380px] w-64 rounded-md flex flex-col items-center overflow-hidden border pb-6">
        <div className="relative h-96 w-72 bg-white-500 p-2">
          <Image
            src={cabin.images[0] ? cabin.images[0].url : ""}
            alt="Cabin Image"
            fill
            className="object-cover overflow-hidden rounded-md border shadow-sm z-10"
          />

          {cabin.isFeatured && (
            <Badge className="z-10 absolute top-2 right-6">Featured</Badge>
          )}

          <div className="flex w-full justify-center gap-x-2 absolute translate-y-5 group-hover:-translate-y-5 bottom-0 opacity-0 group-hover:opacity-100 z-20 transition ">
            <CabinItemAlert cabin={cabin} onDelete={() => onDelete(cabin)} />

            <Button
              size={"icon"}
              onClick={() => router.push(`/dashboard/cabins/new/${cabin.id}`)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col h-full w-full px-4">
          <Badge className="flex items-center justify-center p-1 -mt-4 z-40 bg-emerald-800">
            <Shell className="mr-1 h-4 w-4 " />
            <h2 className="text-md capitalize text-xs ">{cabin.name}</h2>
          </Badge>

          <Separator />

          <div className="mt-2 grid grid-cols-1 gap-y-2">
            <span className="flex  items-center justify-end  text-[11px]">
              <strong className="text-xl font-semibold">
                {formatPrice(cabin.price)}
              </strong>{" "}
              € / per night
            </span>
            <span className="flex  items-center justify-end  text-xs">
              <ListOrdered className="text-white w-5 h-5 mr-2 bg-orange-500 p-0.5 rounded-full" />{" "}
              Bookings: {cabin.bookings.length}
            </span>

            <Separator />

            <div className="grid grid-cols-1 gap-4">
              <span className="flex  items-center  text-xs">
                Amenities: {cabin.amenities.length}
              </span>

              <span className="flex  items-center  text-xs">
                House rules: {cabin.houseRules.length}
              </span>

              <span className="flex  items-center  text-xs">
                {cabin.location}
              </span>

              <span className="flex  items-center  text-xs">
                isFeatured:{" "}
                <span className="font-semibold text-[11px] ml-1">
                  {cabin.isFeatured ? " TRUE" : " FALSE"}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default CabinItem;
