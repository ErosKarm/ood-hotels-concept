import { AmenitiesForm } from "@/components/dashboard/amenities/amenities-form";

import prismadb from "@/lib/prismadb";

import AmenitiesTable from "./components/amenities-table";

const DashboardAmenitiesPage = async () => {
  const amenities = await prismadb.amenity.findMany();

  return (
    <div className="m-10">
      <AmenitiesForm />
      <AmenitiesTable amenities={amenities} />
    </div>
  );
};

export default DashboardAmenitiesPage;
