import CabinItemList from "@/components/cabin-item-list";
import CabinPageItem from "@/components/cabin-page-item";
import CabinPageMap from "@/components/cabin-page-map";
import Container from "@/components/ui/container";
import prismadb from "@/lib/prismadb";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { MapIcon, MapPin } from "lucide-react";

const CabinsPage = async () => {
  const cabins = await prismadb.cabin.findMany({
    include: {
      amenities: true,
      houseRules: true,
      images: true,
    },
  });

  return (
    <div className="px-6 md:px-20 lg:px-0 lg:pl-20 my-12 h-full">
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col items-center lg:items-start">
          <h1 className="text-3xl font-semibold tracking-wide">ÖÖD Cabins</h1>
          <span className="text-sm text-slate-700">
            A listing of all the cabins available in Estonia
          </span>
        </div>
        <div className="items-center hidden lg:flex">
          <span className="text-muted-foreground flex items-center text-xs justify-center tracking-wider">
            <MapPin className="w-4 h-4 mr-1" /> Estonia
          </span>
        </div>
      </div>

      <div className="grid grid-cols-5 lg:flex gap-x-12 ">
        <CabinItemList cabins={cabins} />

        <CabinPageMap cabins={cabins} />
      </div>
    </div>
  );
};

export default CabinsPage;
