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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 items-center mt-12 xl:grid-cols-3 lg:grid-cols-2 justify-center align-center 2xl:flex 2xl:flex-wrap 2xl:justify-start 2xl:gap-x-8">
      {cabins.map((cabin) => (
        <FeaturedCabinItem key={cabin.id} cabin={cabin} />
      ))}
    </div>
  );
};

export default HotelsList;
