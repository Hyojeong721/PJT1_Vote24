import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import SurveyList from "../../components/Survey/SurveyList";
import Paging from "../../components/Paging";
import Link from "next/link";

const SURVEY_URL = "http://i6a205.p.ssafy.io:8000/api/survey";

function Service() {
  const [dataList, setDataList] = useState([]);
  // 페이징 처리를 위한
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  // 병원 id 받아서 url에 적용
  const { userInfo } = useSelector((state) => state.userStatus);
  const hospital_id = userInfo.id;
  const SURVEY_SERVICE_URL = `${SURVEY_URL}/list/${hospital_id}/1`;

  // 서버에서 서비스 만족도 조사 목록 받아오는 코드
  useEffect(() => {
    const getList = async () => {
      const res = await axios.get(SURVEY_SERVICE_URL);
      console.log("만족도설문 데이터", res.data);

      setDataList(res.data);
    };
    getList();
  }, [SURVEY_SERVICE_URL]);

  // 페이징 처리를 위한 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = dataList.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Header title="서비스 만족도"></Header>
      <div className="container">
        <Link href={"health"}>
          <a>건강 설문으로 가기</a>
        </Link>
        <SurveyList
          url={SURVEY_URL}
          setDataList={setDataList}
          dataList={currentPosts}
          category={"1"}
        ></SurveyList>
        <Paging
          postsPerPage={postsPerPage}
          totalPosts={dataList.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default Service;
