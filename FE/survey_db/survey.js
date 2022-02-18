const questionText = [
  "긴장감, 분노를 느끼고 신경성 소화불량이 생긴다",
  "약속에 결코 늦지 않는다",
  "매우 경쟁적이다",
  "대화에서 다른 사람의 말을 앞지른다(부정, 방해, 말꼬리를 채어감)",
  "항상 서두른다",
  "기다리고 있을 때 항상 초조해한다",
  "언제나 전력을 다해 일에 임한다",
  "한번에 한가지 이상의 일을 하고 다음엔 무엇을 할까를 항상 생각한다",
  "일이 잘 되게 하기 위해서 타인의 인정을 받기를 원한다",
  "일을 빨리한다(식사, 걸음, 기타)",
  "바둥거리며 산다",
  "감정을 표현하지 않는다",
  "일 이외에는 흥미가 별로 없다",
  "야심이 많고 직장에서 급속도로 승진하기를 바란다",
  "스스로 마감일을 정해 놓는다",
  "언제나 관여하는 모든 일에 전적으로 책임감을 갖는다",
  "수행정도를 판단할 때 항상 양적으로 한다",
  "일을 심각하게 받아들이고 세세한 부분에 대해서도 신경을 쓴다",
  "말할 때 원기가 있고 힘차게 이야기 한다",
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
      weight: 1,
    },
    {
      order: 2,
      context: "아니다",
      weight: 3,
    },
    {
      order: 3,
      context: "보통이다",
      weight: 4,
    },
    {
      order: 4,
      context: "그렇다",
      weight: 5,
    },
    {
      order: 5,
      context: "매우 그렇다",
      weight: 7,
    },
  ],
};

questionText.forEach((t, index) => {
  questions.push({ ...question, order: index + 1, context: t });
});

const benchmarks = [
  {
    benchmark: 80,
    output_text: "매우 높다",
  },
  {
    benchmark: 60,
    output_text: "높다",
  },
  {
    benchmark: 40,
    output_text: "중간",
  },
  {
    benchmark: 20,
    output_text: "낮다",
  },
  {
    benchmark: 0,
    output_text: "매우 낮다",
  },
];

const result = {
  title: "심장질환 위험도 유형A",
  context:
    "설문 내용을 읽고 선택지를 선택해주세요. \n산출된 점수로 성격 유형에 따른 심장 질환에 걸릴 위험도를 알아볼 수 있습니다.",
  output_link:
    "https://health.severance.healthcare/search/result?keyword=%EC%8B%AC%EC%9E%A5%EC%A7%88%ED%99%98&m_site_cd=sev&menu_cd=health&siteType=hospital&size=10",
  reservation_link:
    "https://health.severance.healthcare/online/online.do?insttCode=12#none",
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
