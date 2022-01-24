import Image from "next/image";
import Logo from "../public/logo.png";

function Footer() {
  return (
    <footer className="container-fluid footer-box navbar-fixed-bottom pt-4 my-md-5 pt-md-5 border-top">
      <div className="container w-50 d-flex justify-content-between align-items-center">
        <div>
          <Image
            className="logo"
            src={Logo}
            alt="vote24"
            width="75"
            height="25"
          />
          <small className="d-block mb-3 text-muted">Vote24 &copy; 2022</small>
        </div>
        <div>
          <h5>About Us</h5>
          <ul className="list-unstyled text-small">
            <li className="mb-1">
              <a
                className="link-secondary text-decoration-none"
                href="/service/info"
              >
                Vote 24 소개
              </a>
            </li>
            <li className="mb-1">
              <a
                className="link-secondary text-decoration-none"
                href="/service/info"
              >
                이용약관
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
