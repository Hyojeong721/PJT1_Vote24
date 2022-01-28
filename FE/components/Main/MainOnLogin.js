import React from "react";
import { useSelector } from "react-redux";
import Header from "../Header";
import SimpleCard from "./SimpleCard";
import PopularSurvey from "./PopularSurvey";
import HospitalSatisfaction from "./HospitalSatisfaction";

function MainOnLogin() {
  const { isLoggedIn, userInfo } = useSelector((state) => state.userStatus);
  const { id, code, name } = userInfo;
  console.log(userInfo);
  return (
    <>
      <Header title={id} subtitle={id}></Header>
      <div className="container d-flex flex-column justify-content-center mt-5 gap-5">
        <div className="d-flex gap-5">
          <SimpleCard title="누적 설문 참여자 수" context="60" />
          <SimpleCard title="일일 설문 참여자 수" context="10" color="orange" />
          <SimpleCard title="현재 진행중인 설문 수" context="6" color="green" />
          <SimpleCard
            title="현재 진행중인 이벤트 수"
            context="5"
            color="blue"
          />
        </div>
        <div className="d-flex gap-5">
          <PopularSurvey />
          <HospitalSatisfaction />
        </div>
      </div>
    </>
  );
}

export default MainOnLogin;
