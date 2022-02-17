import router from "next/router";
import Header from "../../../../components/Header";
import ServiceNoticeUpdateForm from "../../../../components/Notice/ServiceNoticeUpdateForm";

function ServiceNoticeUpdate() {
  const noticeId = router.query.id;
  const NOTICE_DETAIL_URL = `http://i6a205.p.ssafy.io:8000/api/service/${noticeId}`;

  return (
    <div>
      <Header title="Vote24 공지사항 수정"></Header>
      <div className="container">
        <ServiceNoticeUpdateForm noticeId={noticeId} url={NOTICE_DETAIL_URL} />
      </div>
    </div>
  );
}

export default ServiceNoticeUpdate;
