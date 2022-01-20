import React, { useState } from "react";
import Header from "./Header";
import SimpleCard from "./SimpleCard";
import PopularSurvery from "./PopularSurvey";
import HospitalSatisfaction from "./HospitalSatisfaction";

function MainOnLogin() {
  const [hInfo, setHInfo] = useState({ name: "OO 병원" });
  return (
    <>
      <Header title={hInfo.name}></Header>
      <div className="container d-flex flex-column justify-content-center mt-5 gap-5">
        <div className="d-flex gap-5">
          <SimpleCard title="누적 설문 참여자 수" context="60" />
          <SimpleCard title="일일 설문 참여자 수" context="10" color="orange" />
          <SimpleCard title="현재 진행중인 설문 수" context="6" color="green" />
          <SimpleCard
            title="현재 진행중인 이벤트 수 "
            context="5"
            color="blue"
          />
        </div>
        <div className="d-flex gap-5">
          <PopularSurvery />
          <HospitalSatisfaction />
        </div>
      </div>
    </>
  );
}

export default MainOnLogin;
