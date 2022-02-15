import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/Header";
import SurveyDetailItem from "../../../components/Survey/SurveyDetailItem";
import GoSurveyList from "../../../components/Survey/GoSurveyList";
import { useRouter } from "next/router";

function SurveyDetail() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const sId = router.query.id;

  const SURVEY_DETAIL_URL = `http://i6a205.p.ssafy.io:8000/api/survey/${sId}`;
  console.log("params", sId);

  useEffect(() => {
    const getPost = async () => {
      await axios
        .get(SURVEY_DETAIL_URL)
        .then((res) => {
          console.log("설문상세", res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log("설문 상세 get 실패", err);
          router.push("/404");
        });
    };
    if (sId) {
      getPost();
    }
  }, [sId, SURVEY_DETAIL_URL]);

  return (
    <div>
      <Header title="설문 상세"></Header>
      <div className="container">
        <SurveyDetailItem sId={sId} surveyDetail={data}></SurveyDetailItem>
        <GoSurveyList url={"/survey"} category={data.category} />
      </div>
    </div>
  );
}

export default SurveyDetail;
