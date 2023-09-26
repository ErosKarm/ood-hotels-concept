import axios from "axios";
import prismadb from "@/lib/prismadb";
import EditCabinForm from "../components/edit-cabin-form";
import { useParams } from "next/navigation";

const DashboardEditCabinForm = async ({ params }: any) => {
  const amenities = await prismadb.amenity.findMany({
    include: {
      cabins: true,
    },
  });
  const houseRules = await prismadb.houseRule.findMany();

  const cabin = await prismadb.cabin.findFirst({
    where: {
      id: params.cabinId,
    },

    include: {
      amenities: true,
      houseRules: true,
      images: true,
      bookings: true,
    },
  });

  return (
    <div className="flex  w-full mt-[108px] justify-center">
      <div className="shadow-sm bg-white rounded-sm max-h-[45rem] overflow-hidden">
        <EditCabinForm
          amenities={amenities}
          houseRules={houseRules}
          cabin={cabin}
        />
      </div>
    </div>
  );
};

export default DashboardEditCabinForm;
