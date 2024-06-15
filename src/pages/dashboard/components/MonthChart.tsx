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
// Register the necessary components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const MonthChart = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [money, setMoney] = useState<number[]>([]);
  const order = useSelector((state: RootState) => state.order.list);
  useEffect(() => {
    const year = import.meta.env.VITE_CURRENT_YEAR;
    const dataMoney: number[] = [];
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
    months.forEach((item) => {
      let totalAmount = 0;
      const beginDate = new Date(year, item.month - 1, 1);
      const endDate = new Date(year, item.month - 1, item.days);
      order.forEach((item) => {
        if (
          item.createAt >= beginDate.getTime() &&
          item.createAt <= endDate.getTime() &&
          item.status === "completed"
        ) {
          totalAmount += item.totalAmount;
        }
      });
      dataMoney.push(totalAmount);
    });
    setMoney(dataMoney);
    setIsLoading(false);
  }, [order]);

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "VNĐ",
        data: money,
        backgroundColor: "rgba(246, 18, 96, 1)",
        borderColor: "rgba(246, 18, 96, 1)",
        borderWidth: 0,
        barThickness: 10, // Set fixed width for the bars
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
        text: "Monthly Revenue Overview",
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

  if (isLoading) return <div className="h-72 skeleton"></div>;
  else return <Bar className="max-h-72" data={data} options={options} />;
};
