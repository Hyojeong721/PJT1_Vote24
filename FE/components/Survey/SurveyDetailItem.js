import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import DateForm from "../../components/DateForm";
import QuestionList from "../../components/Survey/QuestionList";
import cn from "classnames";
import ct from "../../styles/detail.module.css";

function SurveyDetailItem() {
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
  }, [id, SURVEY_DETAIL_URL]);

  return (
    <div className="post-detail">
      <div className={cn(ct.contentHeader)}>
        <h2 className={cn(ct.title)}>
          <div>{data.title}</div>
        </h2>

        <div className={cn(ct.contentInfo)}>
          <span className={cn(ct.item)}>
            작성일 : {DateForm(data.created_at)}
          </span>
          <span className={cn(ct.item)}> | </span>
          <span className={cn(ct.item)}>
            설문기한 : {DateForm(data.start_at)} ~ {DateForm(data.end_at)}
          </span>
          <span className={cn(ct.item)}> | </span>
          <span className={cn(ct.item)}> 총 참여자수 : {data.count} </span>
          <div className={cn(ct.btns)}>
            <div name="rightbtn">
              <button className={cn(ct.btn, "btn-primary")}>수정</button>
              <button className={cn(ct.btn, "btn-danger")}>삭제</button>
            </div>
          </div>
        </div>
      </div>

      <div className={cn(ct.contentInfo)}>
        <div className={cn(ct.surveyInfo)}> {data.context}</div>

        <QuestionList dataList={data.question}></QuestionList>
      </div>
    </div>
  );
}

export default SurveyDetailItem;
