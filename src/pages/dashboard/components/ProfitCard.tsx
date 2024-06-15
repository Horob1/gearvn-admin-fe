import { ArrowUp, BadgeDollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
export const ProfitCard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [money, setMoney] = useState<number>(0);
  const [per, setPer] = useState<number>(0);
  const order = useSelector((state: RootState) => state.order.list);
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
    // currrent month
    let currentAmount = 0;
    let beginDate = new Date(year, month, 1);
    let endDate = new Date(year, month, months[month].days);
    order.forEach((item) => {
      if (
        item.createAt >= beginDate.getTime() &&
        item.createAt <= endDate.getTime() &&
        item.status === "completed"
      ) {
        currentAmount += item.totalAmount;
      }
    });
    // last month
    let lastMonthAmount = 0;
    if (month === 0) {
      beginDate = new Date(year - 1, 11, 1);
      endDate = new Date(year - 1, 11, months[11].days);
    } else {
      beginDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month - 1, months[month - 1].days);
    }
    order.forEach((item) => {
      if (
        item.createAt >= beginDate.getTime() &&
        item.createAt <= endDate.getTime() &&
        item.status === "completed"
      ) {
        lastMonthAmount += item.totalAmount;
      }
    });
    if (lastMonthAmount === 0) setPer(100);
    else
      setPer(
        Math.floor(((currentAmount - lastMonthAmount) / lastMonthAmount) * 100)
      );
    setMoney(currentAmount);
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
                PROFIT
              </span>
              <h1 className="text-2xl font-semibold text-error">
                ${Math.floor(money / 1000000)}m
              </h1>
            </div>
            <div className="p-1 rounded-full bg-error">
              <BadgeDollarSign color="#ffffff" size={30} />
            </div>
          </div>
          <div className="flex p-4 gap-1 text-[10px] items-center">
            <ArrowUp size={10} />{" "}
            <span className={`${per > 0 ? "text-success" : "text-error"}`}>
              {per}%
            </span>{" "}
            <span>Since last week</span>
          </div>
        </>
      )}
    </div>
  );
};
