import { useState } from "react";
import "./App.css";
import Main from "./pages/Main";
import MainOnLogin from "./pages/MainOnLogin";
import Navbar from "./components/Navbar";
import NavbarOnLogin from "./components/NavbarOnLogin";
import NavbarUser from "./components/NavbarUser";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";
import NoticeHospital from "./pages/NoticeHospital";
import ServiceInfo from "./pages/ServiceInfo";

function App() {
  const [isLogIn, setIsLogIn] = useState(true);
  return (
    <div>
      <div className="navbar">
        {isLogIn ? <Navbar></Navbar> : <NavbarOnLogin></NavbarOnLogin>}
      </div>
      {/* <div className="navbar">
        <NavbarUser></NavbarUser>
      </div> */}
      <div className="page_body">
        {!isLogIn ? <Main></Main> : <Header></Header>}
        <Login />
      </div>
      <Footer />
    </div>
  );
}

export default App;
