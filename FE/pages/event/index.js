import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import EventList from "../../components/Event/EventList";
import Paging from "../../components/Paging";

function HospitalEvent() {
  const [dataList, setDataList] = useState([]);
  // 페이징 처리를 위한
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  // 병원 id 받아서 url에 적용
  const { userInfo } = useSelector((state) => state.userStatus);
  const hospital_id = userInfo.id;
  const EVENT_URL = `http://i6a205.p.ssafy.io:8000/api/event/${hospital_id}`;

  // 서버에서 이벤트 목록 받아오는 코드
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const getList = async () => {
      await axios
        .get(EVENT_URL, {
          headers: {
            authorization: jwt,
          },
        })
        .then((res) => {
          const data = res.data;
          setDataList(data);
        })
        .catch((err) => {
          console.log("이벤트 리스트 get 실패", err);
          router.push("/404");
        });
    };
    getList();
  }, [EVENT_URL]);

  // 페이징 처리를 위한 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = dataList.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Header title="병원 이벤트">
        <div></div>
      </Header>
      <div className="container mt-3">
        <EventList dataList={currentPosts} EVENT_URL={EVENT_URL} />

        <Paging
          postsPerPage={postsPerPage}
          totalPosts={dataList.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default HospitalEvent;
