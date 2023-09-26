import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard/dashboard.header";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <main className="bg-slate-50 h-full max-h-screen flex flex-col p-4">
      <DashboardHeader />
      <div className="flex grow">
        <DashboardSidebar />
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
