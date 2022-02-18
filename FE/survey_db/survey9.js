const questionText = [
  "의사가 환자를 진료할 때 진지하고 성의가 있다.",
  "의사는 환자상태를 친절하고 알아듣기 쉽게 설명해 준다.",
  "의사는 복장이 정결하고 용모가 단정하다.",
  "치료과정에 대해 만족과 신뢰가 간다.",
  "의료진은 환자 상태를 잘 파악하고 적절한 진료를 행한다.",
];

const questions = [];
const question = {
  order: 1,
  context: "",
  type: 0,
  option: [
    {
      order: 1,
      context: "매우 아니다",
    },
    {
      order: 2,
      context: "아니다",
    },
    {
      order: 3,
      context: "보통이다",
    },
    {
      order: 4,
      context: "그렇다",
    },
    {
      order: 5,
      context: "매우 그렇다",
    },
  ],
};

questionText.forEach((t, index) => {
  questions.push({ ...question, order: index + 1, context: t });
});

const result = {
  title: "진료 서비스 만족",
  context:
    "고객 여러분의 좀 더 쾌적한 진료 환경 개선을 위하여 다음과 같이 의견을 수령하고자 합니다. \n 고객 여러분들께서 좀 더 나은 진료 서비스를 제공받으실 수 있도록 최선을 다하겠습니다.",

  start_at: "2022-02-15",
  end_at: "2022-06-30",
  category: 1,
  question: questions,
};

const fs = require("fs");
const axios = require("axios");
const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsImlhdCI6MTY0NTA4Mzc4MywiZXhwIjoxNjQ1MTcwMTgzfQ.H0Bjm4xqrozq3H49eEzuRFMMYYC5Nji28hTGsNPlbR8";

axios
  .post(`http://i6a205.p.ssafy.io:8000/api/survey/${3}`, result, {
    headers: {
      authorization: jwt,
    },
  })
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

const data = JSON.stringify(result);

// write JSON string to a file
fs.writeFile("survey.json", data, (err) => {
  if (err) {
    throw err;
  }
  console.log("JSON data is saved.");
});
