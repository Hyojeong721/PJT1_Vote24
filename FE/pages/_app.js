import { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import NavbarOnLogin from "../components/NavbarOnLogin";
import Footer from "../components/Footer";
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
  const [isLogIn, setIsLogIn] = useState(false);

  useEffect(() => {
    console.log("1");
    const token = window.localStorage.getItem("token");
    if (token) {
      setIsLogIn(true);
    }
  });

  return (
    <div>
      <div className="navbar">
        {isLogIn ? <NavbarOnLogin></NavbarOnLogin> : <Navbar></Navbar>}
      </div>
      <div className="page_body">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;
