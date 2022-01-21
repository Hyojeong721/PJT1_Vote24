import { wrapper } from "../store";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer2";
import "../styles/footer.css";
import "../styles/globals.css";
import "../styles/header.css";
import "../styles/login.css";
import "../styles/main.css";
import "../styles/mainonlogin.css";
import "../styles/navbar.css";
import "../styles/post.css";
import "../styles/signup.css";
import "../styles/simplecard.css";
import "../styles/table.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <div className="navbar">
        <Navbar></Navbar>
      </div>
      <div className="page_body min-vh-100">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

export default wrapper.withRedux(MyApp);
