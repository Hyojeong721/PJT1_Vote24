import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartAge = ({ result }) => {
  console.log("piechart,result", result);
  let cnt10 = 0;
  let cnt20 = 0;
  let cnt30 = 0;
  let cnt40 = 0;
  let cnt50 = 0;
  let cnt60 = 0;

  const ageCnt = () => {
    let i = 0;
    for (i = 0; i < result.length; i++) {
      if (result[i].age == 10) {
        cnt10++;
      } else if (result[i].age == 20) {
        cnt20++;
      } else if (result[i].age == 30) {
        cnt30++;
      } else if (result[i].age == 40) {
        cnt40++;
      } else if (result[i].age == 50) {
        cnt50++;
      } else if (result[i].age == 60) {
        cnt60++;
      }
    }
  };
  ageCnt();

  if (result.length != 0) {
    const options = {
      plugins: {
        title: {
          display: true,
          text: "연령별 통계",
          font: { weight: "bold", size: 20 },
        },
      },
    };
    const data = {
      labels: [10, 20, 30, 40, 50, "60대이상"],
      datasets: [
        {
          // label: [10, 20, 30, 40, 50, "60대이상"],
          label: "라벨링",
          data: [cnt10, cnt20, cnt30, cnt40, cnt50, cnt60],
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 30, 10, 0.2)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 30, 10, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    return (
      <div>
        <Pie data={data} options={options} />
      </div>
    );
  } else {
    return <div>데이터가 없습니다.</div>;
  }
};

export default PieChartAge;
