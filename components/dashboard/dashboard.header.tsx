import { UserButton } from "@clerk/nextjs";
import { Shell } from "lucide-react";

const DashboardHeader = () => {
  return (
    <header className="text-zinc-900 bg-white justify-between p-2 mx-4 rounded-md shadow-sm">
      <div className="grid grid-cols-2 p-4 w-full justify-between">
        <h2 className="font-semibold tracking-wide text-md flex items-center">
          <Shell className="w-7 h-7 mr-2" />
          ÖÖD-Hotels Dashboard
        </h2>

        <div className="ml-auto flex items-center">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
