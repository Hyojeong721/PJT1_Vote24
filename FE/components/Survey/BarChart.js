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
  console.log(item);
  const options = {
    responsive: false,
    indexAxis: "y",
    scales: {
      x: {
        min: 0,
        max: 100,
      },
    },
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        display: false,
      },
      labels: {
        font: {
          size: 60,
        },
      },
    },
  };
  const labels = item.option.map((opt) => opt.context);

  const data = {
    labels,
    datasets: [
      {
        label: item.context,
        data: item.option.map((opt) => Math.round((opt.count / total) * 100)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <Bar id="myChart" width="100" height="100" data={data} options={options} />
  );
};

export default BarChart;
