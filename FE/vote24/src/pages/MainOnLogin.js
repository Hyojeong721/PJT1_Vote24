import React from "react";
import HospitalSatisfaction from "../components/HospitalSatisfaction";
import PopularSurvery from "../components/PopularSurvey";
import SimpleCard from "../components/SimpleCard";
import "../css/mainonlogin.css";

function Main() {
  return (
    <div className="container d-flex flex-column justify-content-center mt-5 gap-5">
      <div className="d-flex gap-5">
        <SimpleCard title="누적 설문 참여자 수" context="60" />
        <SimpleCard title="일일 설문 참여자 수" context="10" color="orange" />
        <SimpleCard title="현재 진행중인 설문 수" context="6" color="green" />
        <SimpleCard title="현재 진행중인 이벤트 수 " context="5" color="blue" />
      </div>
      <div className="d-flex gap-5">
        <PopularSurvery />
        <HospitalSatisfaction />
      </div>
    </div>
  );
}

export default Main;
