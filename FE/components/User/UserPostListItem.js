import Link from "next/link";
import ISODateFormatter from "../ISODateFormatter";
import cn from "classnames";
import styles from "../../styles/userpostlistitem.module.css";

function UserPostListItem({ url, idx, post }) {
  const { title, fixed, created_at, start_at, end_at, status } = post;

  // status 예정 0, 진행중 1, 마감 2
  let eventStatus = "예정";
  let statusColor = "btn-warning";

  if (status === 1) {
    eventStatus = "진행중";
    statusColor = "btn-primary";
  } else if (status === 2) {
    eventStatus = "마감";
    statusColor = "btn-secondary";
  }

  return (
    <Link href={url} passHref>
      <a className="w-75 user-survey-list-item shadow-sm btn d-flex justify-content-between align-items-center mt-3">
        <div className="d-flex">
          {fixed === 1 ? (
            <div className="btn btn-primary">고정</div>
          ) : (
            <div>
              {fixed === 0 ? (
                ""
              ) : (
                <div className={cn("btn", statusColor)}>{eventStatus}</div>
              )}
            </div>
          )}
          <div className="fs-5 ms-3 my-auto">
            {idx}. {title}
          </div>
        </div>

        {start_at && (
          <div className="d-flex flex-column justify-content-center align-items-center">
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
