import axios from "axios";
import Link from "next/link";
import BackButton from "../../../../components/BackButton";

function NoticeDetailUser({ hId, noticeDetail }) {
  const { title, context, created_at, updated_at, views, attachment } =
    noticeDetail;
  console.log("noticeDetail:", noticeDetail);

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center pb-5">
      <header className="w-100 user-header d-flex flex-column justify-content-center align-items-center text-white fs-1">
        <BackButton url={`/user/${hId}/notice`} />
        <div>공지사항</div>
      </header>
      <div className="w-75 user-detail-header border-bottom d-flex flex-column justify-content-center align-items-center">
        <div className="fs-1">제목 {title}</div>
        <div>
          {updated_at} | 조회수 {views}
        </div>
      </div>
      <div className="w-75 user-detail-section border-bottom d-flex flex-column justify-content-center align-items-center">
        <div>{context}</div>
      </div>
      <Link href={`/user/${hId}/notice`} passHref>
        <button
          type="button"
          className=" text-white btn user-detail-to-list-button m-3"
        >
          목록
        </button>
      </Link>
      <Link href={`/user/${hId}/notice/`} passHref>
        <div className="w-75 p-1 border-bottom border-top d-flex flex-column justify-content-center align-items-center">
          <div>이전글</div>
        </div>
      </Link>
      <Link href={`/user/${hId}/notice/`} passHref>
        <div className="w-75 p-1 border-bottom d-flex flex-column justify-content-center align-items-center">
          <div>다음글</div>
        </div>
      </Link>
    </div>
  );
}

export default NoticeDetailUser;

export async function getServerSideProps({ params }) {
  const hId = params.hId;
  const nId = params.id;
  const NOTICE_DETAIL_URL = `http://i6a205.p.ssafy.io:8000/api/notice/${hId}/${nId}`;
  const noticeDetail = await axios.get(NOTICE_DETAIL_URL).then((res) => {
    console.log(res);
    return res.data;
  });

  return {
    props: {
      hId,
      noticeDetail,
    },
  };
}
