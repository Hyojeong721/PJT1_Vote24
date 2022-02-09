import Link from "next/link";
import ISODateFormatter from "../ISODateFormatter";
import styles from "../../styles/userpostlistitem.module.css";

function UserPostListItem({ url, idx, post }) {
  const { title, fixed, created_at, start_at, end_at } = post;

  let eventStatus = "";

  if (start_at) {
    const nowDate = new Date();
    const isStarted = nowDate > new Date(start_at);
    const isEnded = nowDate > new Date(end_at);

    if (isEnded) {
      eventStatus = "종료";
    } else if (isStarted) {
      eventStatus = "진행중";
    } else {
      eventStatus = "예정";
    }
  }

  return (
    <Link href={url} passHref>
      <a className="w-75 user-survey-list-item btn d-flex justify-content-between align-items-center mt-3">
        <div className="d-flex">
          {fixed === 1 && <div className="btn btn-primary">고정</div>}
          <div className="fs-5 ms-3">
            {idx}. {title}
          </div>
        </div>

        {start_at && (
          <div className="d-flex flex-column justify-content-center align-items-center">
            {eventStatus}
            <div className={styles.dateFont}>
              {ISODateFormatter(start_at)} ~ {ISODateFormatter(end_at)}
            </div>
          </div>
        )}

        {!start_at && created_at && (
          <div className={styles.dateFont}>{ISODateFormatter(created_at)}</div>
        )}
      </a>
    </Link>
  );
}
export default UserPostListItem;
