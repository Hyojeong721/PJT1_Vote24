const questionText = [
  "기분이 가라앉거나, 우울하거나, 희망이 없다고 느꼈다.",
  "평소 하던 일에 대한 흥미가 없어지거나 즐거움을 느끼지 못했다.",
  "잠들기가 어렵거나 자주 깼다/혹은 너무 많이 잤다.",
  "평소보다 식욕이 줄었다/혹은 평소보다 많이 먹었다",
  "다른 사람들이 눈치 챌 정도로 평소보다 말과 행동이 느려졌다/ 혹은 안절부절 못해서 가만히 앉아 있을 수 없었다.",
  "피곤하고 기운이 없었다.",
  "내가 잘못 했거나, 실패했다는 생각이 들었다/ 혹은 자신과 가족을 실망시켰다고 생각했다.",
  "신문을 읽거나 TV를 보는 것과 같은 일상적인 일에도 집중 할 수가 없었다.",
  "차라리 죽는 것이 더 낫겠다고 생각했다/혹은 자해할 생각을 했다.",
];

const questions = [];
const question = {
  order: 1,
  context: "",
  type: 0,
  option: [
    {
      order: 1,
      context: "없음",
      weight: 0,
    },
    {
      order: 2,
      context: "2~6일",
      weight: 1,
    },
    {
      order: 3,
      context: "7~12일",
      weight: 2,
    },
    {
      order: 3,
      context: "거의 매일",
      weight: 3,
    },
  ],
};

questionText.forEach((t, index) => {
  questions.push({ ...question, order: index + 1, context: t });
});

const benchmarks = [
  {
    benchmark: 20,
    output_text: "심한 우울 (치료 필요)",
  },
  {
    benchmark: 10,
    output_text: "중간 정도의 우울 (상담 필요)",
  },
  {
    benchmark: 5,
    output_text: "가벼운 우울",
  },
  {
    benchmark: 0,
    output_text: "우울 아님",
  },
];

const result = {
  title: "우울증 건강 설문",
  context:
    "지난 2주간, 얼마나 자주 다음과 같은 문제들로 곤란을 겪으셨습니까?\n지난 2주 동안에 아래와 같은 생각을 한 날을 헤아려서 해당하는 답변에 체크하여 주시기 바랍니다. \n(출처: 창녕군 정신건강복지센터)",
  output_link: "http://search.snuh.org/search/search.jsp",
  reservation_link:
    "https://child.snuh.org/reservation/clinic/KC152/clinicInfo.do",

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
  .post(`http://i6a205.p.ssafy.io:8000/api/survey/${26}`, result, {
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
