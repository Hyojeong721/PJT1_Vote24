import React from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import MedicalImageOne from "../../../public/medical1.png";
import MedicalImageTwo from "../../../public/medical2.png";

function HomeUser({ hId, name, logo_file, phone }) {
  return (
    <div>
      <div className="home-user-bg min-vh-100 d-flex justify-content-center pb-5">
        <div className="w-100 d-flex flex-column align-items-center">
          <div className="text-center text-white fw-bold">
            <div>{name}</div>
            <div>{phone}</div>
            <div>{logo_file}</div>
          </div>
          <div className="w-75 d-flex flex-column mt-3">
            <div className="rounded-top w-25 bg-white fs-1">설문조사</div>
            <div className="rounded-bottom bg-white d-flex flex-column justify-content-center flex-sm-row">
              <Link href={`/user/${hId}/survey/health`} passHref>
                <a className="home-user-survey-button btn border form-control m-3 d-flex flex-column">
                  <div className="d-flex align-items-center">
                    <h2>환자 보호자 대상</h2>
                    <span className="material-icons">north_east</span>
                  </div>
                  <div className="p-md-3">
                    <Image
                      src={MedicalImageOne}
                      alt="button-illust"
                      width={400}
                      height={431}
                    />
                  </div>
                </a>
              </Link>
              <Link href={`/user/${hId}/survey/service`} passHref>
                <a className="home-user-survey-button btn border form-control m-3 d-flex flex-column">
                  <div className="d-flex align-items-center">
                    <h2>병원 만족도 조사</h2>
                    <span className="material-icons">north_east</span>
                  </div>
                  <div className="p-md-3">
                    <Image
                      src={MedicalImageTwo}
                      alt="button-illust"
                      width={400}
                      height={431}
                    />
                  </div>
                </a>
              </Link>
            </div>
          </div>
          <Link href={`/user/${hId}/notice`} passHref>
            <a
              type="button"
              className="btn w-75 home-user-notice-button mt-5 d-flex justify-content-center align-items-center"
            >
              <h2 className="text-white">병원 공지사항</h2>
            </a>
          </Link>
          <Link href={`/user/${hId}/event`} passHref>
            <a
              type="button"
              className="btn w-75 home-user-notice-button mt-5 d-flex justify-content-center align-items-center"
            >
              <h2 className="text-white">병원 이벤트</h2>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  // const GET_HOSPITAL_INFO_URL = `http://i6a205.p.ssafy.io:8000/api/code/${params.hId}`;
  // const { name, phone, logo_file } = await axios.get(GET_HOSPITAL_INFO_URL);
  const [hId, name, phone, logo_file] = [
    params.hId,
    "SSAFY병원",
    "010-0000-0000",
    "logo.png",
  ];
  return {
    props: {
      hId,
      name,
      logo_file,
      phone,
    },
  };
}

export default HomeUser;
