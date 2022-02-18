const questionText = [
  "예상 밖의 일 때문에 속상한 적은 얼마나 있었나?",
  "인생에서 중요한 일을 제어할 수 없다고 느낀 경우는 얼마나 있었나?",
  "긴장되고 스트레스를 받았다고 느낀 경우는 얼마나 있었나?",
  "개인적인 문제들을 처리하는 능력에 대해 몇 번이나 확신했는가?",
  "일들이 당신의 뜻대로 된다고 느낀 경우는 얼마나 있었나?",
  "얼마나 자주 화를 억누를 수 있었나?",
  "해야 할 일을 감당할 수 없다고 느낀적은 얼마나 있었나?",
  "기분이 매우 좋다고 느낀 적은 얼마나 있었나?",
  "일들이 잘 안 풀릴 때 얼마나 자주 화를 냈나?",
  "어려운 일이 과도하게 누적돼 극복할 수 없다고 생각한 경우는 얼마나 있었나?",
];

const questions = [];
const question = {
  order: 1,
  context: "",
  type: 0,
  option: [
    {
      order: 1,
      context: "전혀",
      weight: 1,
    },
    {
      order: 2,
      context: "가끔",
      weight: 2,
    },
    {
      order: 3,
      context: "거의",
      weight: 3,
    },
    {
      order: 4,
      context: "자주",
      weight: 4,
    },
    {
      order: 5,
      context: "매우 자주",
      weight: 5,
    },
  ],
};

questionText.forEach((t, index) => {
  questions.push({ ...question, order: index + 1, context: t });
});

const benchmarks = [
  {
    benchmark: 35,
    output_text: "스트레스 평균 이상 (상담 필요)",
  },
  {
    benchmark: 20,
    output_text: "스트레스 평균",
  },
  {
    benchmark: 10,
    output_text: "양호",
  },
];

const result = {
  title: "스트레스측정",
  context:
    "이 테스트는 크게 유전/환경적 요인과 생활습관.건강관리.스트레스 대처능력으로 구분됩니다. \n측정의 목적은 각자 점수가 나쁜 부분을 파악해 건강관리에 반영 예상 수명을 늘려가는데 있습니다. \n따라서 두세달에 한번 정도 정기적으로 체크해 예상 수명을 늘려갑시다. \n(출처: 세브란스 병원 건강정보)",
  output_link:
    "https://health.severance.healthcare/search/result?keyword=%EC%8A%A4%ED%8A%B8%EB%A0%88%EC%8A%A4&m_site_cd=sev&language=ko&siteType=hospital&m_site_cd_default=sev&menu_cd=health&cate_cd=&size=3",
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
