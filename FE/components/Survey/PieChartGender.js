import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartGender = ({ result }) => {
  console.log("piechart,result", result);
  let male = 0;
  let female = 0;

  const genderCnt = () => {
    let i = 0;
    for (i = 0; i < result.length; i++) {
      if (result[i].gender == 0) {
        male++;
      } else if (result[i].gender == 1) {
        female++;
      }
    }
  };
  genderCnt();

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
      labels: ["남성", "여성"],
      datasets: [
        {
          // label: [10, 20, 30, 40, 50, "60대이상"],
          label: "라벨링",
          data: [male, female],
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 99, 132, 0.2)",
          ],
          borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
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

export default PieChartGender;
