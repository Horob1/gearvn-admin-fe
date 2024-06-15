import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const OrderStatusChart = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [money, setMoney] = useState<number[]>([]);
  const order = useSelector((state: RootState) => state.order.list);
  useEffect(() => {
    const year = import.meta.env.VITE_CURRENT_YEAR;
    const dataMoney: number[] = [];
    const status = ["pending", "accepted", "shipping", "completed", "rejected"];
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
    const isLeapYear = (year: number) => {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };
    if (isLeapYear(year)) {
      months[1].days = 29; // Cập nhật tháng 2 (February) với 29 ngày
    }
    const d = new Date();
    const month = d.getMonth();
    const beginDate = new Date(year, month, 1);
    const endDate = new Date(year, month, months[month].days);
    status.forEach((status) => {
      let totalOrders = 0;
      order.forEach((order) => {
        if (
          order.createAt >= beginDate.getTime() &&
          order.createAt <= endDate.getTime() &&
          order.status === status
        ) {
          totalOrders += 1;
        }
      });
      dataMoney.push(totalOrders);
    });
    setMoney(dataMoney);
    setIsLoading(false);
  }, [order]);

  const data = {
    labels: ["pending", "accepted", "shipping", "completed", "rejected"],
    datasets: [
      {
        data: money,
        backgroundColor: "rgba(246, 18, 96, 1)",
        borderColor: "rgba(246, 18, 96, 1)",
        borderWidth: 0,
        barThickness: 8, // Set fixed width for the bars
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Monthly Order Overview",
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Disable vertical grid lines
        },
      },
      y: {
        grid: {
          display: false, // Disable horizontal grid lines
        },
      },
    },
  };

  if (isLoading) return <div className="h-32 skeleton"></div>;
  else return <Bar className="max-h-32 p-2" data={data} options={options} />;
};
