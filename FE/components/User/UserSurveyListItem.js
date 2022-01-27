import Link from "next/link";

function UserSurveyListItem({ url, idx, title, count }) {
  return (
    <Link href={url}>
      <button className="w-75 user-survey-list-item btn d-flex justify-content-between align-items-center mt-3">
        <div className="fs-5">
          {idx}. {title}
        </div>
        <div>참여자수 {count}</div>
      </button>
    </Link>
  );
}
export default UserSurveyListItem;
