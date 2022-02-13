import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import NoticeList from "../../components/Notice/NoticeList";
import Paging from "../../components/Paging";

function HospitalEvent() {
  const [dataList, setDataList] = useState([]);
  // 페이징 처리를 위한
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  // 병원 id 받아서 url에 적용
  const { userInfo } = useSelector((state) => state.userStatus);
  const hospital_id = userInfo.id;
  const NOTICE_URL = `http://i6a205.p.ssafy.io:8000/api/notice/${hospital_id}`;
  const CREATE_URL = "/notice/create";

  // 서버에서 notice 목록 받아오는 코드
  useEffect(() => {
    const getList = async () => {
      await axios
        .get(NOTICE_URL)
        .then((res) => {
          setDataList(res.data);
        })
        .catch((err) => {
          console.log("병원 공지 목록 get 실패", err);
          router.push("/404");
        });
    };
    getList();
  }, [NOTICE_URL]);

  // 페이징 처리를 위한 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = dataList.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Header title="병원 공지사항">
        <div></div>
      </Header>
      <div className="container div-table">
        <NoticeList
          setDataList={setDataList}
          dataList={currentPosts}
          url={NOTICE_URL}
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
