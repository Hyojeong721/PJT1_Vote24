import axios from "axios";
import UserPostListItem from "../../../../components/User/UserPostListItem";
import BackButton from "../../../../components/BackButton";

function NoticeUser({ code, noticeList }) {
  const paintNoticeList = noticeList.map((n, idx) => {
    return (
      <UserPostListItem
        key={idx}
        url={`/user/${code}/notice/${n.id}`}
        idx={idx + 1}
        title={n.title}
        fixed={n.fixed}
      />
    );
  });

  return (
    <div className="home-user-bg min-vh-100 d-flex flex-column align-items-center pb-5">
      <header className="w-100 d-flex justify-content-center mt-3">
        <BackButton url={`/user/${code}`} />
        <div className="text-white fs-1">공지사항</div>
      </header>
      {paintNoticeList}
    </div>
  );
}

export default NoticeUser;

export async function getServerSideProps({ params }) {
  const code = params.code;
  const NOTICE_URL = `http://i6a205.p.ssafy.io:8000/api/notice/${code}`;
  const noticeList = await axios.get(NOTICE_URL).then((res) => {
    console.log(res.data);
    return res.data;
  });

  return {
    props: {
      code,
      noticeList,
    },
  };
}
