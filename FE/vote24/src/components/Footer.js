import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <footer>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-4 col-md-8 item">
              <a href="#" className="a">
                <h3>Vote 24</h3>
              </a>
              <p className="copyright">Vote24 © 2022</p>
            </div>
            <div className="col-sm-4 col-md-2 item">
              <h4>About Us</h4>
              <ul className="ul a">
                <li>
                  <a href="#">Vote 24 소개</a>
                </li>
                <li>
                  <a href="#">이용약관</a>
                </li>
              </ul>
            </div>
            {/* social 아이콘들
            <div className="col-lg-3 item social">
              <a href="#">
                <i className="icon ion-social-facebook"></i>
              </a>
              <a href="#">
                <i className="icon ion-social-twitter"></i>
              </a>
              <a href="#">
                <i className="icon ion-social-snapchat"></i>
              </a>
              <a href="#">
                <i class="icon ion-social-instagram"></i>
              </a>
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
