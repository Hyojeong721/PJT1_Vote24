const questionText = [
  "바지 길이나 소매 길이 양쪽에 차이가 있다.",
  "가방을 매면 한쪽으로 자꾸 흘러내린다.",
  "치마나 바지가 한쪽으로 돌아간다.",
  "다리를 꼬고 앉을 때 더 편한 쪽이 있다.",
  "한쪽 신발 밑창이 더 많이 닳아 있다.",
  "배를 내밀고 서 있는 편이다.",
  "뒷목이 늘 뻐근하다",
  "편두통이 자주 온다.",
  "뒤돌아 보는 동작이 괴롭다.",
  "자세가 구부정하고 실제 키보다 작아 보인다.",
  "한쪽 다리가 자주 저리고 당긴다.",
  "서 있는 것보다 앉아 있을 때 허리 통증이 더 심해진다.",
  "걸음걸이가 특이하다는 말을 자주 듣는다.",
  "발목을 자주 삐끗한다.",
];

const questions = [];
const question = {
  order: 1,
  context: "",
  type: 0,
  option: [
    {
      order: 1,
      context: "아니다",
      weight: 0,
    },
    {
      order: 2,
      context: "그렇다",
      weight: 1,
    },
  ],
};

questionText.forEach((t, index) => {
  questions.push({ ...question, order: index + 1, context: t });
});

const benchmarks = [
  {
    benchmark: 10,
    output_text: "매우 불균형 (검사 필요)",
  },
  {
    benchmark: 3,
    output_text: "불균형 (상담 필요)",
  },
  {
    benchmark: 0,
    output_text: "양호",
  },
];

const result = {
  title: "신체 불균형 자가진단",
  context:
    "자가진단을 통해 신체 불균형을 측정해보세요. \n(출처: 세브란스 병원 건강정보)",
  output_link:
    "https://www.youtube.com/results?search_query=%EC%8B%A0%EC%B2%B4+%EB%B6%88%EA%B7%A0%ED%98%95",
  reservation_link:
    "https://health.severance.healthcare/checkup/checkup.do?insttCode=09#none",

  start_at: "2022-02-15",
  end_at: "2022-03-27",
  category: 0,
  question: questions,
  benchmark: benchmarks,
};

const fs = require("fs");
const axios = require("axios");
const jwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsImlhdCI6MTY0NTA4Mzc4MywiZXhwIjoxNjQ1MTcwMTgzfQ.H0Bjm4xqrozq3H49eEzuRFMMYYC5Nji28hTGsNPlbR8";

axios
  .post(`http://i6a205.p.ssafy.io:8000/api/survey/${27}`, result, {
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
