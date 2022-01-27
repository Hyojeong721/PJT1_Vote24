import Link from "next/link";

function UserPostListItem({ url, idx, title, fixed }) {
  return (
    <Link href={url}>
      <button className="w-75 user-survey-list-item btn d-flex justify-content-between align-items-center mt-3">
        <div className="fs-5">
          {idx}. {title}
        </div>
        {fixed === 1 && <div className="btn btn-primary">공지</div>}
      </button>
    </Link>
  );
}
export default UserPostListItem;
