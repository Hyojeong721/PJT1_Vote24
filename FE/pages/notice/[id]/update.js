import router from "next/router";
import { useSelector } from "react-redux";
import Header from "../../../components/Header";
import NoticeUpdateForm from "../../../components/Notice/NoticeUpdateForm";

function NoticeUpdate() {
  const { userInfo } = useSelector((state) => state.userStatus);
  const noticeId = router.query.id;
  const hospitalId = userInfo.id;
  const NOTICE_DETAIL_URL = `${process.env.NEXT_PUBLIC_SERVER}/api/notice/${hospitalId}/${noticeId}`;

  return (
    <div>
      <Header title="병원 공지사항 수정"></Header>
      <div className="container">
        <NoticeUpdateForm noticeId={noticeId} url={NOTICE_DETAIL_URL} />
      </div>
    </div>
  );
}

export default NoticeUpdate;
