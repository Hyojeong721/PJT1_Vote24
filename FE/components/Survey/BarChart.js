import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const BarChart = ({ total, item }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,

    indexAxis: "y",
    scales: {
      x: {
        min: 0,
        max: total,
        grid: { display: false, drawBorder: false },
        title: {
          display: false,
        },
      },
      y: { position: "right" },
    },
    plugins: {
      legend: {
        display: false,
      },
      width: 100,
    },
  };
  if (item.option) {
    const data = {
      labels: item.option.map((opt) => opt.context),

      datasets: [
        {
          data: item.option.map((opt) => opt.count),
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(50, 159, 64, 1)",
          ],
        },
      ],
    };
  }

  return (
    <div className="mx-auto" style={{ maxHeight: "300px", maxWidth: "1000px" }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart;
