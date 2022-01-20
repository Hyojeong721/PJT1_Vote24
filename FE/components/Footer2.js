import Image from "next/image";
import Logo from "../public/logo.png";

function Footer() {
  return (
    <footer class="container-fluid navbar-fixed-bottom pt-4 my-md-5 pt-md-5 border-top bg-info">
      <div class="container w-50 d-flex justify-content-between align-items-center">
        <div>
          <Image class="logo" src={Logo} alt="vote24" width="75" height="25" />
          <small class="d-block mb-3 text-muted">Vote24 &copy; 2022</small>
        </div>
        <div>
          <h5>About Us</h5>
          <ul class="list-unstyled text-small">
            <li class="mb-1">
              <a
                class="link-secondary text-decoration-none"
                href="/service/info"
              >
                Vote 24 소개
              </a>
            </li>
            <li class="mb-1">
              <a
                class="link-secondary text-decoration-none"
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
