import Image from "next/image";
import Link from "next/link";
import Logo from "../public/logo.png";
import styles from "../styles/footer.module.css";

function Footer({ currentPage }) {
  const isUserPage = currentPage.includes("user");

  let footerTopColor = "footer-top";
  let footerBottomColor = "footer-bottom";
  if (isUserPage) {
    footerTopColor = styles.footerUser2;
    footerBottomColor = styles.footerUser2;
  }

  return (
    <footer>
      <div className={footerTopColor}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-lg-4 footer-about wow fadeInUp">
              <div className="mb-2">
                <Link href="/" passHref>
                  <a>
                    <Image src={Logo} alt="vote24" width={100} height={27} />
                  </a>
                </Link>
              </div>
              <p>S06P12A205 </p>
              <p>장효정 김종범 이진희 박지후</p>
            </div>
            <div className="col-md-4 col-lg-4 offset-lg-1 footer-contact wow fadeInDown">
              <h4>Contact</h4>
              <p className="d-flex align-items-center">
                <span className="material-icons me-2 fs-5">location_on</span>
                서울 강남구 테헤란로 212
              </p>
              <p className="d-flex align-items-center">
                <span className="material-icons me-2 fs-5">call</span> 전화번호:
                02-3429-5100
              </p>
              <p className="d-flex align-items-center">
                <span className="material-icons me-2 fs-5">email</span> 이메일:
                ase0574@gamil.com
              </p>
            </div>
            <div className="col-md-4 col-lg-3 footer-social wow fadeInUp">
              <h4>서비스 안내</h4>
              <p>
                <Link href="/service/info" passHref>
                  <a>이용약관</a>
                </Link>
                <Link href="/service/info" passHref>
                  <a>개인정보 처리방침</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={footerBottomColor}>
        <div className="container">
          <div className="row">
            {isUserPage ? (
              <div className="footer-copyright">
                <p>
                  본 사이트의 콘텐츠는 저작권법의 보호를 받는 바 무단 전재,
                  복사, 배포 등을 금합니다. &copy; Vote24 Corp. All rights
                  reserved.
                </p>
              </div>
            ) : (
              <div className="col-md-5 footer-copyright">
                <p>
                  본 사이트의 콘텐츠는 저작권법의 보호를 받는 바 무단 전재,
                  복사, 배포 등을 금합니다.
                </p>
                <p>&copy; Vote24 Corp. All rights reserved.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
