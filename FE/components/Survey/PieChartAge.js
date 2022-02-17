import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartAge = ({ result }) => {
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
  if (result) {
    ageCnt();
  }
  if (result) {
    const options = {
      plugins: {
        title: {
          display: true,
          text: "연령별",
          font: { weight: "bold", size: 20 },
        },
      },
      // maintainAspectRatio: false,
    };
    const data = {
      labels: [10, 20, 30, 40, 50, "60대이상"],
      datasets: [
        {
          data: [cnt10, cnt20, cnt30, cnt40, cnt50, cnt60],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(50, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(50, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    const style = {
      height: 500,
      width: 500,
    };

    return (
      <div style={{ maxHeight: "400px", maxWidth: "400px" }}>
        <Pie data={data} options={options} />
      </div>
    );
  } else {
    return <div>[연령별] 데이터가 없습니다.</div>;
  }
};

export default PieChartAge;
