import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import EventList from "../../components/EventList";
import Paging from "../../components/Paging";

function HospitalEvent() {
  const [dataList, setDataList] = useState([]);
  // 페이징 처리를 위한
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  // 병원 id 받아서 url에 적용
  const { userInfo } = useSelector((state) => state.userStatus);
  const hospital_id = userInfo.id;
  const EVENT_URL = `http://teama205.iptime.org/api/event/${hospital_id}`;

  // 서버에서 이벤트 목록 받아오는 코드
  useEffect(() => {
    const getList = async () => {
      const res = await axios.get(`${EVENT_URL}`);
      const data = res.data;
      setDataList(data);
    };
    getList();
  }, []);

  // 페이징 처리를 위한 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = dataList.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Header title="병원 이벤트"></Header>
      <div className="container">
        <EventList dataList={currentPosts} />

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
