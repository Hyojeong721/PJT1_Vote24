import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartGender = ({ result }) => {
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

  if (result) {
    genderCnt();
  }

  if (result) {
    const options = {
      plugins: {
        title: {
          display: true,
          text: "성별",
          font: { weight: "bold", size: 20 },
        },
      },
    };
    const data = {
      labels: ["남성", "여성"],
      datasets: [
        {
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
      <div style={{ height: "400px", width: "400px" }}>
        <Pie data={data} options={options} />
      </div>
    );
  } else {
    return <div>[성별] 데이터가 없습니다.</div>;
  }
};

export default PieChartGender;
