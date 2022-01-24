import { wrapper } from "../store";
import { ToastContainer } from "react-toastify";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

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
<<<<<<< HEAD
import "../styles/paging.css";
=======
import "../styles/surveycreate.css";
>>>>>>> feat/survey_create

function MyApp({ Component, pageProps }) {
  const store = useStore();
  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <div>
        <div className="navbar">
          <Navbar></Navbar>
        </div>
        <div className="page_body min-vh-100">
          <Component {...pageProps} />
        </div>
        <Footer />
        <ToastContainer autoClose={3000} />
      </div>
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
