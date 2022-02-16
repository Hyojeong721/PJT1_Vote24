import { useSelector } from "react-redux";
import Header from "../../../components/Header";
import ServiceNoticeList from "../../../components/Notice/ServiceNoticeList";

const SERVICE_NOTICE_URL = "http://i6a205.p.ssafy.io:8000/api/service";

function ServiceNotice() {
  const { userInfo } = useSelector((state) => state.userStatus);
  const userId = userInfo.id;

  return (
    <div>
      <Header title="서비스 공지사항">
        <div></div>
      </Header>
      <div className="container div-table">
        <ServiceNoticeList url={SERVICE_NOTICE_URL} hospital_id={userId} />
      </div>
    </div>
  );
}

export default ServiceNotice;
