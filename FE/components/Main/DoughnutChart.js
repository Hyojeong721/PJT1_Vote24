import cn from "classnames";
import styles from "../../styles/doughnutchart.module.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({ ageDataProp, genderDataProp }) {
  const ageChartData = ageDataProp.map((d) => d.count);
  const genderChartData = genderDataProp.map((d) => d.count);

  const options = {
    responsive: true,
  };

  const ageData = {
    labels: ["10대", "20대", "30대", "40대", "50대", "60대 이상"],
    datasets: [
      {
        label: "My First Dataset",
        data: ageChartData,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const genderData = {
    labels: ["남", "여"],
    datasets: [
      {
        label: "My First Dataset",
        data: genderChartData,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div
      className={cn(
        "container-fluid",
        "d-flex",
        "flex-column",
        "flex-md-row",
        "justify-content-evenly",
        "align-items-center",
        "gap-3"
      )}
    >
      <div>
        *연령별
        <div className={styles.chartContainer}>
          <Doughnut data={ageData} options={options} />
        </div>
      </div>

      <div>
        *성별
        <div className={styles.chartContainer}>
          <Doughnut data={genderData} options={options} />
        </div>
      </div>
    </div>
  );
}
