import { Earth } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useEffect, useState } from "react";

export const OrderCard = () => {
  const order = useSelector((state: RootState) => state.order.list);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [orderData, setOrderData] = useState<[number, number]>([0, 0]);
  useEffect(() => {
    const months = [
      { month: 1, days: 31 },
      { month: 2, days: 28 }, // Sẽ cập nhật sau cho năm nhuận
      { month: 3, days: 31 },
      { month: 4, days: 30 },
      { month: 5, days: 31 },
      { month: 6, days: 30 },
      { month: 7, days: 31 },
      { month: 8, days: 31 },
      { month: 9, days: 30 },
      { month: 10, days: 31 },
      { month: 11, days: 30 },
      { month: 12, days: 31 },
    ];
    const year = import.meta.env.VITE_CURRENT_YEAR;
    const d = new Date();
    const month = d.getMonth();
    const isLeapYear = (year: number) => {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };
    if (isLeapYear(year)) {
      months[1].days = 29; // Cập nhật tháng 2 (February) với 29 ngày
    }
    let completed = 0;
    let totalOrders = 0;

    const beginDate = new Date(year, month, 1);
    const endDate = new Date(year, month, months[month].days);
    order.forEach((item) => {
      if (
        item.createAt >= beginDate.getTime() &&
        item.createAt <= endDate.getTime()
      ) {
        if (item.status === "completed") {
          completed += 1;
        }
        totalOrders += 1;
      }
    });

    setOrderData([completed, totalOrders]);

    setIsLoading(false);
  }, [order]);

  return (
    <div className="bg-slate-100 col-span-2 rounded-md h-32 flex flex-col justify-between">
      {isLoading ? (
        <div className="h-full w-full skeleton rounded-md"></div>
      ) : (
        <>
          <div className="card-header p-4 pb-0 flex w-full justify-between items-center">
            <div>
              <span className="text-[10px] font-medium text-gray-500">
                ORDER
              </span>
              <h1 className="text-2xl font-semibold text-warning">
                {orderData[0]}/{orderData[1]}
              </h1>
            </div>
            <div className="p-1 rounded-full bg-warning">
              <Earth color="#ffffff" size={32} />
            </div>
          </div>
          <div className="flex p-4 pb-6 gap-1 text-[10px] items-center">
            <div className="relative w-full">
              <div className="w-full bg-slate-400 h-2 ">
                <div
                  className={`bg-warning h-2 w-full`}
                  style={{
                    width: `${Math.ceil(
                      (orderData[0] / orderData[1] ?? 0) * 100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
