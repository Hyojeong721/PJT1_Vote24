import Image from "next/image";
import Link from "next/link";
import Logo from "../public/logo.png";
import cn from "classnames";
import styles from "../styles/footer.module.css";

function Footer({ currentPage }) {
  const isUserPage = currentPage.includes("user");

  let footerColorClass = styles.footerColor;
  if (isUserPage) {
    footerColorClass = styles.footerUser2;
  }

  return (
    <footer
      className={cn(
        footerColorClass,
        "container-fluid",
        "navbar-fixed-bottom",
        "p-3",
        "border-top"
      )}
    >
      <div className="container w-75 d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Link href="/" passHref>
            <a>
              <Image src={Logo} alt="vote24" width={100} height={27} />
            </a>
          </Link>
          <small className="d-block mb-3 text-muted">Vote24 &copy; 2022</small>
        </div>
        <div>
          <h5>About Us</h5>
          <ul className="list-unstyled text-small">
            <li className="mb-1">
              <Link href="/" passHref>
                <a className="link-secondary text-decoration-none">
                  Vote 24 소개
                </a>
              </Link>
            </li>
            <li className="mb-1">
              <Link href="/service/info" passHref>
                <a className="link-secondary text-decoration-none">이용약관</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
