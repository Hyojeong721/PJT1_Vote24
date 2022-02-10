import Link from "next/link";

export default function Error404() {
  return (
    <div className="container mt-3 fs-1 d-flex flex-column justify-content-center align-items-center">
      <div>Page Not Found 404</div>
      <div className="d-flex">
        <span className="material-icons fs-1 d-flex align-items-center">
          priority_high
        </span>
        잘못된 접근입니다.
      </div>
      <Link href="/">
        <a className="btn btn-outline-secondary mt-3">
          Vote24 메인화면으로 이동
        </a>
      </Link>
    </div>
  );
}
