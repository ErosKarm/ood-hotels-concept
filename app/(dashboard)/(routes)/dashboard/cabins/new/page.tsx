import axios from "axios";
import AmenitiesForm from "./components/new-cabin-form";
import prismadb from "@/lib/prismadb";
import NewCabinForm from "./components/new-cabin-form";
import { useParams } from "next/navigation";

const DashboardNewCabinForm = async () => {
  const amenities = await prismadb.amenity.findMany({
    include: {
      cabins: true,
    },
  });
  const houseRules = await prismadb.houseRule.findMany();

  return (
    <div className="flex  w-full mt-[108px] justify-center">
      <div className="shadow-sm bg-white rounded-sm max-h-[45rem] overflow-hidden">
        <NewCabinForm amenities={amenities} houseRules={houseRules} />
      </div>
    </div>
  );
};

export default DashboardNewCabinForm;
