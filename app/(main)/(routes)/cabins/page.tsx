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
    <div className="pl-20 my-12 h-full">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-wide">ÖÖD Cabins</h1>
          <span className="text-sm text-slate-700">
            A listing of all the cabins available in Estonia
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-muted-foreground flex items-center text-xs justify-center tracking-wider">
            <MapPin className="w-4 h-4 mr-1" /> Estonia
          </span>
        </div>
      </div>

      <div className="grid gap-x-12 grid-cols-5">
        <div className="flex flex-col col-span-2">
          <CabinItemList cabins={cabins} />
        </div>

        <CabinPageMap cabins={cabins} />
      </div>
    </div>
  );
};

export default CabinsPage;
