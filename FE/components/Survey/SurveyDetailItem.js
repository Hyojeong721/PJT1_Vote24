import { useEffect, useState } from "react";
import DateForm from "../../components/DateForm";
import QuestionList from "../../components/Survey/QuestionList";
import cn from "classnames";
import ct from "../../styles/detail.module.css";
import Benchbox from "../Survey/BenchBox";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import GoSurveyList from "../../components/Survey/GoSurveyList";

const SurveyDetailItem = ({ sId, url }) => {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getPost = async () => {
      await axios
        .get(url)
        .then((res) => {
          console.log("설문상세", res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log("설문 상세 get 실패", err);
          router.push("/404");
        });
    };
    getPost();
  }, [url]);

  //삭제
  const handleRemove = (category, e) => {
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
  console.log("detail_data", data);
  console.log("detail_data_result", data.result);

  return (
    <div className={cn(ct.content)}>
      <div className={cn(ct.contentHeader)}>
        <h2 className={cn(ct.title)}>
          <div>{data.title}</div>
        </h2>

        <div className={cn(ct.contentInfo, "d-flex justify-content-between")}>
          <div>
            <span className={cn(ct.item)}>
              {" "}
              작성일 : {DateForm(data.created_at)}
            </span>
            {data.updated_at && (
              <span className={cn(ct.item)}>
                수정일 : {DateForm(data.updated_at)}
              </span>
            )}
            <span className={cn(ct.item)}> | </span>
            <span className={cn(ct.item)}>
              설문기한 : {DateForm(data.start_at)} ~ {DateForm(data.end_at)}
            </span>
            <span className={cn(ct.item)}> | </span>
            <span className={cn(ct.item)}> 총 참여자수 : {data.count} </span>
          </div>
          <div>
            <Link href={`/survey/${sId}/update`} passHref>
              <a className={cn(ct.btn, "btn btn-primary")}>수정</a>
            </Link>
            <button
              onClick={(e) => handleRemove(data.category, e)}
              className={cn(ct.btn, "btn btn-danger")}
            >
              삭제
            </button>
          </div>
        </div>
      </div>

      <div name="설문설명" className={cn(ct.surveyInfo)}>
        {data.context &&
          data.context.split("\n").map((line, idx) => {
            return (
              <span key={idx}>
                {line}
                <br />
              </span>
            );
          })}
      </div>

      <div name="surveyBody">
        <QuestionList
          total={data.count}
          dataList={data.question}
          dataresult={data.result}
        ></QuestionList>
        <Benchbox benchmark={data.benchmark} />
      </div>
      <GoSurveyList url={"/survey"} category={data.category} />
    </div>
  );
};

export default SurveyDetailItem;
