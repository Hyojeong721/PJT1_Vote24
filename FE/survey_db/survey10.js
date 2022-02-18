const questionText = [
  "직원들의 태도가 예의바르고 정중하다.",
  "직원들은 복장이 청결하고 깔끔하며, 거부감이 없다.",
  "직원들이 밝은 표정과 목소리로 인사한다.",
  "접수와 수납 절차에 있어서 전혀 불편함이 없다.",
  "직원들의 말투가 상냥하다.",
  "환자를 진정으로 위하는 마음을 느꼈다.",
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
  title: "병원 직원 서비스 만족도",
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
  .post(`http://i6a205.p.ssafy.io:8000/api/survey/${2}`, result, {
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
