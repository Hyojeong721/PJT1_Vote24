import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import axios from "axios";
import NoticeList from "../../../components/Notice/NoticeList";
import Paging from "../../../components/Paging";

function HospitalEvent() {
  const [dataList, setDataList] = useState([]);
  // 페이징 처리를 위한
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const SERVICE_URL = `http://i6a205.p.ssafy.io:8000/api/service`;
  const CREATE_URL = "/service/notice/create";
  // 서버에서 notice 목록 받아오는 코드
  useEffect(() => {
    const getList = async () => {
      const res = await axios.get(`${SERVICE_URL}`);
      const res_data = res.data;
      const data = res_data.reverse();
      console.log("서비스 공지 데이터", data);
      setDataList(data);
    };
    getList();
  }, [SERVICE_URL]);

  // 페이징 처리를 위한 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = dataList.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Header title="Vote24 공지사항"></Header>
      <div className="container div-table">
        <NoticeList
          dataList={currentPosts}
          url={SERVICE_URL}
          createUrl={CREATE_URL}
        />

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
