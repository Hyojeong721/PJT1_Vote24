import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import axios from "axios";
import Header from "../Header";
import SimpleCard from "./SimpleCard";
import PopularSurvey from "./PopularSurvey";
import DoughnutChart from "./DoughnutChart";
import cn from "classnames";
import styles from "../../styles/mainonlogin.module.css";

function MainOnLogin() {
  const { userInfo } = useSelector((state) => state.userStatus);
  const { id, code, name } = userInfo;
  const [image, setImage] = useState("");
  const [data, setData] = useState("");

  const fetchImage = async () => {
    const GET_HOSPITAL_INFO_URL = `http://i6a205.p.ssafy.io:8000/api/id/${id}`;
    const { image } = await axios
      .post(GET_HOSPITAL_INFO_URL)
      .then((res) => res.data)
      .catch((err) => console.log(err));

    setImage(image);
  };

  const fetchData = async () => {
    const GET_HOSPITAL_DATA_URL = `http://i6a205.p.ssafy.io:8000/api/main/${id}`;
    const summaryData = await axios
      .get(GET_HOSPITAL_DATA_URL)
      .then((res) => res.data)
      .catch((err) => console.log(err));

    setData(summaryData);
  };

  useEffect(() => {
    fetchImage();
    fetchData();
  }, []);

  return (
    <>
      <Header title={name} subtitle={`코드: ${code}`} image={image}>
        <Link href={`/user/${code}`} passhref>
          <a
            className={cn(styles.goButton, "border", "rounded", "fs-5", "ms-3")}
          >
            <span className="material-icons fs-1">play_arrow</span>
          </a>
        </Link>
      </Header>
      <div className="container d-flex flex-column justify-content-center my-5 gap-5 border rounded shadow p-5">
        <div className="d-flex flex-column flex-lg-row justify-content-center gap-5">
          <SimpleCard title="누적 설문 참여자 수" context={data.totalMyVote} />
          <SimpleCard
            title="일일 설문 참여자 수"
            context={data.todayMyVote}
            color="orange"
          />
          <SimpleCard
            title="현재 진행중인 설문 수"
            context={data.available_MysurveyCnt}
            color="green"
          />
          <SimpleCard
            title="현재 진행중인 이벤트 수"
            context={data.available_MyeventCnt}
            color="blue"
          />
        </div>
        {data && <PopularSurvey popularSurveys={data.popularVotes} />}
        <div className="card">
          <div className="card-body">
            <h2>설문 참여자 현황</h2>
            {data && data.result_Mysurvey_age.keys().length ? (
              <DoughnutChart
                ageDataProp={data.result_Mysurvey_age}
                genderDataProp={data.result_Mysurvey_gender}
              />
            ) : (
              <div>참여한 설문 데이터가 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MainOnLogin;
