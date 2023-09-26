import prismadb from "@/lib/prismadb";

import AmenitiesTable from "./components/amenities-table";

const DashboardAmenitiesPage = async () => {
  const bookings = await prismadb.booking.findMany();

  return (
    <div className="m-10">
      <AmenitiesTable bookings={bookings} />
    </div>
  );
};

export default DashboardAmenitiesPage;
