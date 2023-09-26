import getCabins from "@/actions/get-cabins";
import CabinItem from "@/app/(dashboard)/(routes)/dashboard/cabins/components/cabin-item";
import prismadb from "@/lib/prismadb";
import FeaturedCabinItem from "./featured-cabin-item";

const HotelsList = async () => {
  const cabins = await prismadb.cabin.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      amenities: true,
      houseRules: true,
      images: true,
    },
  });

  return (
    <div className="flex flex-wrap gap-12 items-center mt-12">
      {cabins.map((cabin) => (
        <FeaturedCabinItem key={cabin.id} cabin={cabin} />
      ))}
    </div>
  );
};

export default HotelsList;
