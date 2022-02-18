const questionText = [
  "긴장감, 분노를 느끼고 신경성 소화불량이 생긴다",
  "직장이나 가정에서 주위 사람들이 긴장하게 한다",
  "긴장했을 때 먹거나 마시거나 담배를 피운다",
  "긴장감, 편두통, 목이나 어깨의 통증, 불면증이 있다",
  "밤이나 주말에 다음날 새롭게 활동할 정도로 쉽게 긴장을 풀고 머리를 식힐 수 없다",
  "일에 대한 걱정 때문에 집중하기 어렵다",
  "긴장을 풀기 위해 진정제나 다른 약을 먹는다",
  "긴장을 풀기 위해 시간을 충분히 내기 어렵다",
  "시간 여유가 있어도 긴장을 해소하는데 사용하지 못한다",
  "업무의 성격상 마감 시간에 쫓기는 편이다",
];

const questions = [];
const question = {
  order: 1,
  context: "",
  type: 0,
  option: [
    {
      order: 1,
      context: "거의 없다",
      weight: 0,
    },
    {
      order: 2,
      context: "일주일에 한 두번",
      weight: 1,
    },
    {
      order: 3,
      context: "자주",
      weight: 2,
    },
  ],
};

questionText.forEach((t, index) => {
  questions.push({ ...question, order: index + 1, context: t });
});

const benchmarks = [
  {
    benchmark: 14,
    output_text: "심각한 긴장 수준",
  },
  {
    benchmark: 10,
    output_text: "평균 이상",
  },
  {
    benchmark: 6,
    output_text: "평균",
  },
  {
    benchmark: 3,
    output_text: "평균 이하",
  },
  {
    benchmark: 0,
    output_text: "거의 긴장이 없음",
  },
];

const result = {
  title: "스트레스&긴장정도",
  context:
    "현대인들은 생활양식이 복잡해지면서 여러가지 스트레스를 받습니다.\n시험.실직과 해고.직장 내 갈등 . 가정 내 갈등 . 작업의 과정부하 질병 . 이혼 . 교통체증등 이루 헤아릴수 없는 스트레스에 살고 있습니다.\n다음 문항에서 자신에게 맞는 부분을 체크하여 산출된 점수로 스트레스와 긴장 정보를 알 수 있습니다. \n(출처: 세브란스 병원 건강정보)",
  output_link:
    "https://health.severance.healthcare/search/result?keyword=%EC%A0%95%EC%8B%A0&m_site_cd=sev&menu_cd=health&siteType=hospital&size=3&cate_cd=",
  reservation_link:
    "https://health.severance.healthcare/online/online.do?insttCode=2",

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
