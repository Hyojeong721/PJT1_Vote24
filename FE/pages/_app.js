import { wrapper } from "../store";
import { useStore, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";

import LoginWrapper from "../components/LoginWrapper";
import Navbar from "../components/Navbar/Navbar";
import NavbarUser from "../components/Navbar/NavbarUser";
import Footer from "../components/Footer";
import "../styles/globals.css";
import "../styles/login.css";
import "../styles/main.css";
import "../styles/navbar.css";
import "../styles/post.css";
import "../styles/signup.css";
import "../styles/table.css";
import "../styles/paging.css";
import "../styles/homeuser.css";
import "../styles/userlistitem.css";
import "../styles/surveydetailuser.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const { isLoggedIn } = useSelector((state) => state.userStatus);

  const store = useStore();
  const router = useRouter();

  const currentPage = router.pathname;
  const code = router.query.code;
  const isUserPage = currentPage.includes("user");

  return (
    <>
      <Head>
        <link href="/public/favi.png" ref="logo" />
        <title>Vote 24</title>
      </Head>
      <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
        <div className={isUserPage ? "halfPage" : ""}>
          {!isUserPage ? (
            <Navbar currentPage={currentPage} isLoggedIn={isLoggedIn} />
          ) : (
            <NavbarUser currentPage={currentPage} code={code} />
          )}
          <div className="min-vh-100">
            <LoginWrapper>
              <Component {...pageProps} />
            </LoginWrapper>
          </div>
          <Footer currentPage={currentPage} />
          <ToastContainer autoClose={3000} pauseOnFocusLoss={false} />
        </div>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossOrigin="anonymous"
        ></Script>
      </PersistGate>
    </>
  );
}

export default wrapper.withRedux(MyApp);
