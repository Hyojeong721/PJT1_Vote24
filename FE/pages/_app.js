import { wrapper } from "../store";
import { useState, useEffect } from "react";
import { useStore, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { PersistGate } from "redux-persist/integration/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";

import LoginWrapper from "../components/LoginWrapper";
import Navbar from "../components/Navbar/Navbar";
import NavbarUser from "../components/Navbar/NavbarUser";
import Footer from "../components/Footer2";
import "../styles/footer.css";
import "../styles/globals.css";
import "../styles/header.css";
import "../styles/login.css";
import "../styles/main.css";
import "../styles/navbar.css";
import "../styles/post.css";
import "../styles/signup.css";
import "../styles/simplecard.css";
import "../styles/table.css";
import "../styles/surveycreate.css";
import "../styles/questionchoice.css";
import "../styles/paging.css";
import "../styles/homeuser.css";
import "../styles/userlistitem.css";
import "../styles/surveydetailuser.css";

function MyApp({ Component, pageProps }) {
  const { isLoggedIn } = useSelector((state) => state.userStatus);

  const store = useStore();
  const router = useRouter();

  const currentPage = router.pathname;
  const hId = router.query.hId;

  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <div>
        <div className="navbar">
          {!hId ? (
            <Navbar currentPage={currentPage} isLoggedIn={isLoggedIn} />
          ) : (
            <NavbarUser currentPage={currentPage} hId={hId} />
          )}
        </div>
        <div className="page_body min-vh-100">
          <LoginWrapper>
            <Component {...pageProps} />
          </LoginWrapper>
        </div>
        <Footer />
        <ToastContainer autoClose={3000} />
      </div>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossOrigin="anonymous"
      ></Script>
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
