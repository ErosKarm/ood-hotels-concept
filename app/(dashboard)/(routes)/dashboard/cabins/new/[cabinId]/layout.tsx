import DashboardEditCabinForm from "./page";

const DashboardCabinEditLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    cabinId: string;
  };
}) => {
  return (
    <>
      <DashboardEditCabinForm params={params} />
    </>
  );
};

export default DashboardCabinEditLayout;
