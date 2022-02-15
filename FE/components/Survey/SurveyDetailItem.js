import DateForm from "../../components/DateForm";
import QuestionList from "../../components/Survey/QuestionList";
import cn from "classnames";
import ct from "../../styles/detail.module.css";
import Benchbox from "../Survey/BenchBox";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

const SurveyDetailItem = ({ sId, surveyDetail }) => {
  const router = useRouter();
  console.log("id_index_넘겨진데이터", surveyDetail);
  const {
    category,
    count,
    context,
    benchmark,
    created_at,
    updated_at,
    title,
    start_at,
    end_at,
    question,
  } = surveyDetail;

  //삭제
  const handleRemove = ({ category, e }) => {
    const jwt = localStorage.getItem("jwt");
    axios
      .delete(`http://i6a205.p.ssafy.io:8000/api/survey/${sId}`, {
        headers: {
          authorization: jwt,
        },
      })
      .then((res) => {
        console.log("delete성공", res);
        if (category == 0) {
          router.push("/survey/health");
        } else {
          router.push("/survey/service");
        }
      })
      .catch((error) => {
        console.log("delete실패", error);
      });
  };

  return (
    <div className={cn(ct.content)}>
      <div className={cn(ct.contentHeader)}>
        <h2 className={cn(ct.title)}>
          <div>{title}</div>
        </h2>

        <div className={cn(ct.contentInfo, "d-flex justify-content-between")}>
          <div>
            <span className={cn(ct.item)}>
              {" "}
              작성일 : {DateForm(created_at)}
            </span>
            {updated_at && (
              <span className={cn(ct.item)}>
                수정일 : {DateForm(updated_at)}
              </span>
            )}
            <span className={cn(ct.item)}> | </span>
            <span className={cn(ct.item)}>
              설문기한 : {DateForm(start_at)} ~ {DateForm(end_at)}
            </span>
            <span className={cn(ct.item)}> | </span>
            <span className={cn(ct.item)}> 총 참여자수 : {count} </span>
          </div>
          <div>
            <Link href={`/survey/${sId}/update`} passHref>
              <a className={cn(ct.btn, "btn btn-primary")}>수정</a>
            </Link>
            <button
              onClick={(e) => handleRemove({ category }, e)}
              className={cn(ct.btn, "btn btn-danger")}
            >
              삭제
            </button>
          </div>
        </div>
      </div>

      <div className={cn(ct.surveyInfo)}>
        {context &&
          context.split("\n").map((line, idx) => {
            return (
              <span key={idx}>
                {line}
                <br />
              </span>
            );
          })}
      </div>
      {/* <div name="surveyBody"> */}
      {/* <QuestionList total={count} dataList={question}></QuestionList> */}
      {/* <Benchbox benchmark={benchmark} /> */}
      {/* </div> */}
    </div>
  );
};

export default SurveyDetailItem;
