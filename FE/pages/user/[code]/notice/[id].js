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

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center pb-5">
      <header className="position-relative user-detail-header w-100 d-flex flex-column justify-content-center align-items-center fs-1">
        <BackButton url={`/user/${code}/notice`} />
        <div>공지사항</div>
      </header>
      <div className="position-relative w-100 user-detail-title d-flex flex-column justify-content-center align-items-center">
        <div className="fs-1 px-5">{title}</div>
        <div className="position-absolute bottom-0 w-100 d-flex justify-content-end border-bottom text-secondary pe-2">
          {updated_at
            ? ISODateFormatter(updated_at)
            : ISODateFormatter(created_at)}{" "}
          | 조회수 {views}
        </div>
      </div>
      <div className="user-detail-section border-bottom d-flex flex-column p-5">
        <div>
          {context &&
            context.split("\n").map((line, idx) => {
              return (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              );
            })}
        </div>
        {image && (
          <div className={(styles.imageContainer, "mx-auto")}>
            <Image
              alt="post_image"
              src={image}
              width="500px"
              height="500px"
              objectFit="contain"
              priority
            />
          </div>
        )}
      </div>
      <Link href={`/user/${code}/notice`} passHref>
        <button type="button" className="btn user-detail-to-list-button m-3">
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

  const NOTICE_DETAIL_URL = `http://i6a205.p.ssafy.io:8000/api/user/notice/${id}/${nId}`;
  const noticeDetail = await axios
    .get(NOTICE_DETAIL_URL)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  if (Object.keys(noticeDetail).length === 0) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  return {
    props: {
      code,
      noticeDetail,
    },
  };
}
