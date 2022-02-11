import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import styles from "../../../../styles/userpostdetail.module.css";
import BackButton from "../../../../components/BackButton";
import ISODateFormatter from "../../../../components/ISODateFormatter";

function NoticeDetailUser({ code, noticeDetail }) {
  const {
    title,
    context,
    created_at,
    updated_at,
    views,
    image,
    prev_id,
    prev_title,
    next_id,
    next_title,
  } = noticeDetail;
  console.log(noticeDetail);

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center pb-5">
      <header className="position-relative w-100 user-header d-flex flex-column justify-content-center align-items-center fs-1">
        <BackButton url={`/user/${code}/notice`} />
        <div>공지사항</div>
      </header>
      <div className="w-75 user-detail-header d-flex flex-column justify-content-center align-items-center">
        <div className="fs-1">{title}</div>
      </div>
      <div className="w-100 d-flex justify-content-end  border-bottom ">
        {ISODateFormatter(updated_at)} | 조회수 {views}
      </div>
      <div className="w-75 user-detail-section border-bottom d-flex flex-column justify-content-center align-items-center">
        <div>{context}</div>
        <Image src={image} width="100%" height="100%" />
      </div>
      <Link href={`/user/${code}/notice`} passHref>
        <button
          type="button"
          className=" text-white btn user-detail-to-list-button m-3"
        >
          목록
        </button>
      </Link>
      {prev_id && (
        <Link href={`/user/${code}/notice/${prev_id}`} passHref>
          <a
            className={cn(
              styles.prevnextButton,
              "p-1",
              "border-bottom",
              "border-top"
            )}
          >
            <div>이전글: {prev_title}</div>
          </a>
        </Link>
      )}
      {next_id && (
        <Link href={`/user/${code}/notice/${next_id}`} passHref>
          <a className={cn(styles.prevnextButton, "p-1", "border-bottom")}>
            <div>다음글: {next_title}</div>
          </a>
        </Link>
      )}
    </div>
  );
}

export default NoticeDetailUser;

export async function getServerSideProps({ params }) {
  const code = params.code;
  const nId = params.id;

  const GET_HOSPITAL_ID_BY_CODE = `http://i6a205.p.ssafy.io:8000/api/code/${code}`;
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

  const NOTICE_DETAIL_URL = `http://i6a205.p.ssafy.io:8000/api/notice/${id}/${nId}`;
  const noticeDetail = await axios
    .get(NOTICE_DETAIL_URL)
    .then((res) => res.data);

  return {
    props: {
      code,
      noticeDetail,
    },
  };
}
