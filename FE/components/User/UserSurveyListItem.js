import Link from "next/link";
import cn from "classnames";
import styles from "../../styles/userpostlistitem.module.css";
import { toast } from "react-toastify";

function UserSurveyListItem({ url, idx, survey }) {
  const { title, count, status } = survey;

  let surveyStatus = "예정";
  let statusColor = styles.btnLime;

  if (status === 0) {
    surveyStatus = "진행중";
    statusColor = "btn-warning";
  } else if (status === 2) {
    surveyStatus = "마감";
    statusColor = "btn-secondary";
  }

  const handleOnClick = () => {
    toast.warning("진행 중인 설문이 아닙니다.", {
      position: "top-center",
    });
  };

  if (status === 0) {
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
  } else {
    return (
      <button
        onClick={handleOnClick}
        className="w-75 user-post-list-item shadow btn d-flex justify-content-between align-items-center mt-3"
      >
        <div className="d-flex">
          <div className={cn("btn", statusColor)}>{surveyStatus}</div>
          <div className="fs-6 ms-3 my-auto">{title}</div>
        </div>
      </button>
    );
  }
}
export default UserSurveyListItem;
