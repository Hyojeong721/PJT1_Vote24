import { useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import NavbarOnLogin from "../components/NavbarOnLogin";
import Footer from "../components/Footer";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [isLogIn, setIsLogIn] = useState(false);

  return (
    <div>
      <div className="navbar">
        {isLogIn ? <NavbarOnLogin></NavbarOnLogin> : <Navbar></Navbar>}
      </div>
      <div className="page_body">
        {isLogIn ? <Header></Header> : null}

        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}

export default MyApp;
