import { BarChart4, BarChartHorizontal } from "lucide-react";
import { MonthChart } from "./components/MonthChart";
import { GetOrders } from "../order/components/GetOrders";
import { ProfitCard } from "./components/ProfitCard";
import { OrderCard } from "./components/OrderCard";
import { OrderStatusChart } from "./components/OrderStatusChart";

const DashboardPage = () => {
  return (
    <div className="p-4 grid grid-cols-8 gap-6">
      <div className="col-span-8 flex items-center gap-2 text-red-600">
        <BarChartHorizontal size={28} />
        <h1 className="text-2xl font-semibold">STATISTICS</h1>
      </div>
      <ProfitCard />
      <OrderCard />
      <div className="col-span-4 bg-slate-100 rounded-md">
        <OrderStatusChart/>
      </div>
      <div className="col-span-8 flex items-center gap-2 text-red-600">
        <BarChart4 size={28} />
        <h1 className="text-2xl font-semibold">SALES</h1>
      </div>
      <div className="p-4 col-span-8 bg-slate-100 rounded-md flex flex-col">
        <h1 className="text-lg font-semibold text-error">
          Monthly Revenue Overview in {import.meta.env.VITE_CURRENT_YEAR}:
        </h1>
        <MonthChart />
      </div>
      <GetOrders />
    </div>
  );
};

export default DashboardPage;
