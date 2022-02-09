import Link from "next/link";
import ISODateFormatter from "../ISODateFormatter";
import styles from "../../styles/userpostlistitem.module.css";

function UserPostListItem({ url, idx, post }) {
  const { title, fixed, created_at, start_at, end_at } = post;
  console.log(new Date().toISOString());
  console.log(Date(start_at));
  return (
    <Link href={url} passHref>
      <button className="w-75 user-survey-list-item btn d-flex justify-content-between align-items-center mt-3">
        <div className="d-flex">
          {fixed === 1 && <div className="btn btn-primary">고정</div>}
          <div className="fs-5 ms-3">
            {idx}. {title}
          </div>
        </div>

        {start_at && (
          <div className={styles.dateFont}>
            {ISODateFormatter(start_at)} ~ {ISODateFormatter(end_at)}
          </div>
        )}

        {!start_at && created_at && (
          <div className={styles.dateFont}>{ISODateFormatter(created_at)}</div>
        )}
      </button>
    </Link>
  );
}
export default UserPostListItem;
