import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";
import DateForm from "../../components/DateForm";
import QuestionList from "../../components/Survey/QuestionList";

const SurveyDetail = () => {
  const [data, setData] = useState([]);
  // 게시글 id 찾기 -> 데이터 가져올 url 선언
  const router = useRouter();
  const { id } = router.query;
  const SURVEY_DETAIL_URL = `http://i6a205.p.ssafy.io:8000/api/survey/${id}`;

  useEffect(() => {
    // 게시글 내용 받아오기
    const getPost = async () => {
      const res = await axios.get(SURVEY_DETAIL_URL);
      const data = res.data;
      console.log("data", data);
      setData(data);
    };
    if (id) {
      getPost();
    }
  }, [id]);

  return (
    <div className="post-detail">
      <div className="post-detail-header">
        <h2 className="detail-title">
          <div>제목 : {data.title}</div>
        </h2>
        <hr></hr>
        <div className="detail-info">
          <p>
            작성자 : 관리자 | 조회수 : {data.count} | 설문 기한 :{" "}
            {DateForm(data.start_at)} ~ {DateForm(data.end_at)}
          </p>
        </div>
      </div>
      <hr></hr>

      <div className="post-detail-body">
        <div className="detail-context"> 설문 설명 : {data.context}</div>
        <hr></hr>
        <QuestionList dataList={data.question}></QuestionList>
      </div>
    </div>
  );
};

export default SurveyDetail;
