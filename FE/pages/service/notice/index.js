import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import axios from "axios";
import NoticeList from "../../../components/Notice/NoticeList";
import Paging from "../../../components/Paging";

const NOTICE_URL = `http://i6a205.p.ssafy.io:8000/api/service/`;

function HospitalEvent() {
  const [dataList, setDataList] = useState([]);
  // 페이징 처리를 위한
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // 서버에서 공지 목록 받아오는 코드
  useEffect(() => {
    const getList = async () => {
      const res = await axios.get(`${NOTICE_URL}`);
      const data = res.data;
      console.log(data);
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
      <Header title="Vote24 공지사항"></Header>
      <div className="container mt-3">
        <NoticeList dataList={currentPosts} />

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
