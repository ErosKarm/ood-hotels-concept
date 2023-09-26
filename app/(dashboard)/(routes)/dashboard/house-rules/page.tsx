import prismadb from "@/lib/prismadb";
import { HouseRulesForm } from "@/components/dashboard/house-rules/house-rule-form";
import HouseRuleTable from "./components/house-rule-table";

const DashboardHouseRulesPage = async () => {
  const houseRules = await prismadb.houseRule.findMany();

  return (
    <div className="m-10">
      <HouseRulesForm />
      <HouseRuleTable houseRules={houseRules} />
    </div>
  );
};

export default DashboardHouseRulesPage;
