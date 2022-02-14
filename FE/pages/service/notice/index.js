import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import router from "next/router";
import Header from "../../../components/Header";
import axios from "axios";
import ServiceNoticeList from "../../../components/Notice/ServiceNoticeList";
import Paging from "../../../components/Paging";

const NOTICE_URL = "http://i6a205.p.ssafy.io:8000/api/service";

function ServiceNotice() {
  const [dataList, setDataList] = useState([]);
  const [fixed, setFixed] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const { userInfo } = useSelector((state) => state.userStatus);
  const userId = userInfo.id;

  useEffect(() => {
    const getList = async () => {
      await axios
        .get(NOTICE_URL)
        .then((res) => {
          setDataList(res.data);
          console.log("공지목록", res.data);
          setFixed(res.data.filter((data) => data.fixed == 1));
          console.log(
            "fixed data",
            res.data.filter((data) => data.fixed == 1)
          );
        })
        .catch((err) => {
          console.log("서비스 공지 목록 get 실패", err);
          router.push("/404");
        });
    };
    getList();
  }, [NOTICE_URL]);

  // 페이징 처리를 위한 계산
  const fixedCnt = fixed.length;
  const indexOfLastPost = currentPage * (postsPerPage - fixedCnt) + fixedCnt;
  const indexOfFirstPost = indexOfLastPost - postsPerPage + fixedCnt;
  const currentPosts = [
    ...dataList.slice(0, fixedCnt),
    ...dataList.slice(indexOfFirstPost, indexOfLastPost),
  ];
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  var indexlst = [];
  let i = 0;
  for (i = indexOfLastPost; indexOfFirstPost < i; i--) {
    indexlst.push(i - 1);
  }

  return (
    <div>
      <Header title="서비스 공지사항">
        <div></div>
      </Header>
      <div className="container div-table">
        <ServiceNoticeList
          userId={userId}
          indexlst={indexlst}
          fixedCnt={fixedCnt}
          postsPerPage={postsPerPage}
          setDataList={setDataList}
          dataList={currentPosts}
          url={NOTICE_URL}
        />
        <Paging
          postsPerPage={postsPerPage}
          totalPosts={dataList.length}
          paginate={paginate}
          fixedCnt={fixedCnt}
        />
      </div>
    </div>
  );
}

export default ServiceNotice;
