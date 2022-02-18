import { useSelector } from "react-redux";
import Header from "../../components/Header";
import NoticeList from "../../components/Notice/NoticeList";

function HospitalNotice() {
  const { userInfo } = useSelector((state) => state.userStatus);
  const hospital_id = userInfo.id;
  const NOTICE_URL = `${process.env.NEXT_PUBLIC_SERVER}/api/notice/${hospital_id}`;
  const CREATE_URL = "/notice/create";

  return (
    <div>
      <Header title="병원 공지사항">
        <div></div>
      </Header>
      <div className="container div-table shadow">
        <NoticeList url={NOTICE_URL} createUrl={CREATE_URL} />
      </div>
    </div>
  );
}

export default HospitalNotice;
