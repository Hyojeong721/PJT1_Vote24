import axios from "axios";
import UserHeader from "../../../../components/User/UserHeader";
import UserPostListItem from "../../../../components/User/UserPostListItem";
import BackButton from "../../../../components/BackButton";
import SearchBar from "../../../../components/SearchBar";
import { useState } from "react";
import Paging from "../../../../components/Paging";

function NoticeUser({ code, noticeListProp }) {
  const [noticeList, setNoticeList] = useState(noticeListProp);
  // 페이징 처리를 위한
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const paintNoticeList = noticeList.map((n, idx) => {
    return (
      <UserPostListItem
        key={idx}
        url={`/user/${code}/notice/${n.id}`}
        post={n}
        idx={idx + 1}
      />
    );
  });
  // 페이징 처리를 위한 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = noticeList.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home-user-bg min-vh-100 d-flex flex-column align-items-center pb-5">
      <header className="position-relative w-100 d-flex justify-content-center mt-3">
        <BackButton url={`/user/${code}`} />
        <UserHeader title="공지사항" />
      </header>
      <div className="w-75 d-flex justify-content-end">
        <SearchBar setPostList={setNoticeList} postListProp={noticeListProp} />
      </div>
      {currentPosts.length ? (
        currentPosts
      ) : (
        <div className="fs-1 border rounded bg-white w-75 d-flex justify-content-center p-3 mt-3 ">
          <span className="material-icons fs-1 d-flex align-items-center">
            priority_high
          </span>
          작성된 공지사항이 없습니다.
        </div>
      )}
      <Paging
        postsPerPage={postsPerPage}
        totalPosts={noticeList.length}
        paginate={paginate}
      />
    </div>
  );
}

export default NoticeUser;

export async function getServerSideProps({ params }) {
  const code = params.code;
  const GET_HOSPITAL_ID_BY_CODE = `${process.env.NEXT_PUBLIC_SERVER}/api/code/${code}`;
  const { id } = await axios
    .post(GET_HOSPITAL_ID_BY_CODE)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  // id 는 hospital_id
  if (!id) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  const NOTICE_URL = `${process.env.NEXT_PUBLIC_SERVER}/api/notice/${id}`;
  const noticeList = await axios
    .get(NOTICE_URL)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    props: {
      code,
      noticeListProp: noticeList,
    },
  };
}
