import { CabinForm } from "@/components/dashboard/cabins/cabin-form";
import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prismadb";
import Link from "next/link";

import CabinItem from "./components/cabin-item";

const DashboardCabinPage = async () => {
  const cabins = await prismadb.cabin.findMany({
    include: {
      amenities: true,
      houseRules: true,
      images: true,
      bookings: true,
    },
  });

  return (
    <div className="m-10  w-full">
      <Link href="/dashboard/cabins/new">
        <Button>Create a new Cabin instance</Button>
      </Link>

      <div className="flex flex-wrap gap-x-8">
        {cabins.map((cabin) => (
          <CabinItem key={cabin.id} cabin={cabin} />
        ))}
      </div>
    </div>
  );
};

export default DashboardCabinPage;
