import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import SurveyList from "../../components/SurveyList";

const SURVEY_URL = "http://i6a205.p.ssafy.io:8000/api/survey";

function Survey() {
  const [dataList, setDataList] = useState([]);

  // 병원 id 받아서 url에 적용
  const { userInfo } = useSelector((state) => state.userStatus);
  const hospital_id = userInfo.id;
  const SURVEY_LIST_URL = `${SURVEY_URL}/list/${hospital_id}`;

  // 서버에서 이벤트 목록 받아오는 코드
  useEffect(() => {
    const getList = async () => {
      const res = await axios.get(`${SURVEY_LIST_URL}`);
      const data = res.data;
      console.log(data);
      setDataList(data);
    };
    getList();
  }, []);

  return (
    <div>
      <Header title="병원 설문조사 목록"></Header>
      <div className="container">
        <SurveyList dataList={dataList} />
      </div>
    </div>
  );
}

export default Survey;
