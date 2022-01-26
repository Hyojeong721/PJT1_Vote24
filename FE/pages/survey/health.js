import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import SurveyList from "../../components/Survey/SurveyList";

const SURVEY_URL = "http://i6a205.p.ssafy.io:8000/api/survey";

function Health() {
  const [dataList, setDataList] = useState([]);

  // 병원 id 받아서 url에 적용
  const { userInfo } = useSelector((state) => state.userStatus);
  const hospital_id = userInfo.id;
  const SURVEY_HEALTH_URL = `${SURVEY_URL}/list/${hospital_id}/0`;

  // 서버에서 건강 설문 목록 받아오는 코드
  useEffect(() => {
    const getList = async () => {
      const res = await axios.get(SURVEY_HEALTH_URL);
      console.log("설문 목록 데이터", res.data);

      setDataList(res.data);
    };
    getList();
  }, []);

  return (
    <div>
      <Header title="건강설문"></Header>
      <div className="container">
        <SurveyList dataList={dataList}></SurveyList>
      </div>
    </div>
  );
}

export default Health;
