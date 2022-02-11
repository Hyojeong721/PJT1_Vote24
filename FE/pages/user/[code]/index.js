import React, { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import MedicalImageOne from "../../../public/medical1.png";
import MedicalImageTwo from "../../../public/medical2.png";

function HomeUser({ code, hId, name, phone, image }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "SET_INFO",
      hospitalInfo: {
        hId,
        name,
        phone,
        image,
      },
    });
  }, []);

  return (
    <div>
      <div className="home-user-bg min-vh-100 d-flex justify-content-center pb-5">
        <div className="w-100 d-flex flex-column align-items-center mt-5">
          <div className="w-75 d-flex flex-column align-items-center mt-3 bg-white rounded shadow">
            <div className="fs-2 mt-1">설문조사</div>
            <div className="d-flex flex-column justify-content-center flex-sm-row">
              <Link href={`/user/${code}/survey/health`} passHref>
                <a className="home-user-survey-button btn border m-3 d-flex flex-column">
                  <div className="d-flex justify-content-center align-items-center border-bottom pb-1">
                    <div className="fs-3">환자 보호자 대상</div>
                    <span className="material-icons">north_east</span>
                  </div>
                  <div className="p-md-3">
                    <Image
                      src={MedicalImageOne}
                      alt="button-illust"
                      width={400}
                      height={431}
                      priority
                    />
                  </div>
                </a>
              </Link>
              <Link href={`/user/${code}/survey/service`} passHref>
                <a className="home-user-survey-button btn border m-3 d-flex flex-column">
                  <div className="d-flex justify-content-center align-items-center border-bottom pb-1">
                    <div className="fs-3">병원 만족도 조사</div>
                    <span className="material-icons">north_east</span>
                  </div>
                  <div className="p-md-3">
                    <Image
                      src={MedicalImageTwo}
                      alt="button-illust"
                      width={400}
                      height={431}
                      priority
                    />
                  </div>
                </a>
              </Link>
            </div>
          </div>
          <Link href={`/user/${code}/notice`} passHref>
            <a className="btn w-75 home-user-notice-button mt-5 d-flex justify-content-center align-items-center shadow-lg">
              <h2 className="text-white">병원 공지사항</h2>
            </a>
          </Link>
          <Link href={`/user/${code}/event`} passHref>
            <a className="btn w-75 home-user-notice-button mt-5 d-flex justify-content-center align-items-center shadow-lg">
              <h2 className="text-white">병원 이벤트</h2>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const code = params.code;
  const GET_HOSPITAL_ID_BY_CODE = `http://i6a205.p.ssafy.io:8000/api/code/${code}`;
  const { id } = await axios
    .post(GET_HOSPITAL_ID_BY_CODE)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  // if (!id) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: "/404",
  //     },
  //   };
  // }

  const GET_HOSPITAL_INFO_URL = `http://i6a205.p.ssafy.io:8000/api/id/${1}`;
  const { name, phone, image } = await axios
    .post(GET_HOSPITAL_INFO_URL)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    props: {
      code,
      hId: 1,
      name,
      phone,
      image,
    },
  };
}

export default HomeUser;
