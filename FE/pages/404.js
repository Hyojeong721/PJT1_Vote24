import Link from "next/link";
import cn from "classnames";
import styles from "../styles/404.module.css";

export default function Error404() {
  return (
    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
      <div className="container px-lg-5 text-center">
        <div className="row justify-content-center">
          <div className="col-lg-6">
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
            <h1 className="display-1">404</h1>
            <h1 className="mb-4">Page Not Found</h1>
            <p className="mb-4">
              죄송합니다. 찾으시는 페이지가 존재하지 않습니다.
            </p>
            <Link href="/">
              <a className="btn btn-primary mt-3">Vote24 메인화면으로 이동</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
