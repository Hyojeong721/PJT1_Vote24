import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import axios from "axios";
import Header from "../Header";
import SimpleCard from "./SimpleCard";
import PopularSurvey from "./PopularSurvey";
import HospitalSatisfaction from "./HospitalSatisfaction";
import cn from "classnames";
import styles from "../../styles/mainonlogin.module.css";

function MainOnLogin() {
  const { userInfo } = useSelector((state) => state.userStatus);
  const { id, code, name } = userInfo;
  const [image, setImage] = useState("");

  const fetchImage = async () => {
    const GET_HOSPITAL_INFO_URL = `http://i6a205.p.ssafy.io:8000/api/id/${id}`;
    const { image } = await axios
      .post(GET_HOSPITAL_INFO_URL)
      .then((res) => res.data);

    setImage(image);
  };

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <>
      <Header title={name} subtitle={`코드 :${code}`} image={image}>
        <Link href={`/user/${code}`} passhref>
          <a
            className={cn(styles.goButton, "border", "rounded", "fs-5", "ms-3")}
          >
            <span className="material-icons fs-1">play_arrow</span>
          </a>
        </Link>
      </Header>
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
