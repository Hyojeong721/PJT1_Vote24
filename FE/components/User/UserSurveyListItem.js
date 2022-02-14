import Link from "next/link";
import cn from "classnames";
import styles from "../../styles/userpostlistitem.module.css";

function UserSurveyListItem({ url, idx, survey }) {
  const { title, count, status } = survey;

  let surveyStatus = "예정";
  let statusColor = styles.btnLime;

  if (status === 1) {
    surveyStatus = "진행중";
    statusColor = "btn-warning";
  } else if (status === 2) {
    surveyStatus = "마감";
    statusColor = "btn-secondary";
  }

  return (
    <Link href={url} passHref>
      <button className="w-75 user-post-list-item shadow btn d-flex justify-content-between align-items-center mt-3">
        <div className="d-flex">
          <div className={cn("btn", statusColor)}>{surveyStatus}</div>
          <div className="fs-6 ms-3 my-auto">{title}</div>
        </div>
      </button>
    </Link>
  );
}
export default UserSurveyListItem;
