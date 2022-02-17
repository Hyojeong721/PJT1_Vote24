const questionText = [
  "일을 끝내지 않은 상태로 남겨두는 것은 그다지 개의치 않는다",
  "침작하고 서두르지 않는다",
  "경쟁적이지 않다",
  "다른 사람의 말을 잘 듣고 끝마칠 때까지 기다린다",
  "재촉을 받고 있을 때도 서두르지 않는다",
  "침착하게 기다릴줄 안다",
  "일을 쉽게 처리한다",
  "한번에 천천히 전달하려고 노력하며 이야기 한다",
  "말할 때 천천히 전달하려고 노력하며 이야기 한다",
  "일을 천천히 한다",
  "쉬어가며 유유하게 산다",
  "감정 그대로 표현한다",
  "여러가지 다양한 흥미와 관심을 가지고 있다",
  "직업에 만족하고 있다",
  "마감시간등을 따로 정해놓지 않는다",
  "한정된 만큼의 책임감만 느낀다",
  "일의 결과를 판단할 때 양적으로만 평가하지 않는다",
  "일을 심각하게 받아들이고 세세한 부분에 대해서도 신경을 쓴다",
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
      order: 3,
      context: "그렇다",
      weight: 5,
    },
    {
      order: 3,
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
  title: "심장질환 위험도 유형B",
  context:
    "설문 내용을 읽고 선택지를 선택해주세요. 산출된 점수로 성격 유형에 따른 심장 질환에 걸릴 위험도를 알아볼 수 있습니다.",
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
