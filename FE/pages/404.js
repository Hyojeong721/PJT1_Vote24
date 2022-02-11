import Link from "next/link";
import cn from "classnames";
import styles from "../styles/404.module.css";

export default function Error404() {
  return (
    <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div class="container px-lg-5 text-center">
        <div class="row justify-content-center">
          <div class="col-lg-6">
            <span
              className={cn(
                styles.warningIcon,
                "material-icons",
                "display-1",
                "text-primary"
              )}
            >
              report_problem
            </span>
            <h1 class="display-1">404</h1>
            <h1 class="mb-4">Page Not Found</h1>
            <p class="mb-4">죄송합니다. 찾으시는 페이지가 존재하지 않습니다.</p>
            <Link href="/">
              <a className="btn btn-primary mt-3">Vote24 메인화면으로 이동</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
    // <div className="container mt-3 fs-1 d-flex flex-column justify-content-center align-items-center">
    //   <div>Page Not Found 404</div>
    //   <div className="d-flex">
    //     <span className="material-icons fs-1 d-flex align-items-center">
    //       priority_high
    //     </span>
    //     잘못된 접근입니다.
    //   </div>
    //   <Link href="/">
    //     <a className="btn btn-outline-secondary mt-3">
    //       Vote24 메인화면으로 이동
    //     </a>
    //   </Link>
    // </div>
  );
}
