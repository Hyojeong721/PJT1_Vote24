const questionText = [
  "병원 내부시설은 청결하고 깨끗하다.",
  "병원의 분위기는 맑고 편안하여 안정감을 준다.",
  "병원 근처 교통이 편리하여 쉽게 찾을 수 있다.",
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
  title: "병원 외부환경 만족도",
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
