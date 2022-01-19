import { useState } from "react";
import "./App.css";
import Main from "./pages/Main";
import Navbar from "./components/Navbar";
import NavbarOnLogin from "./components/NavbarOnLogin";
import NavbarUser from "./components/NavbarUser";
import Footer from "./components/Footer";
import NoticeHospital from "./pages/NoticeHospital";
import NoticeDetail from "./pages/NoticeDetail";

function App() {
  const [isLogIn, setIsLogIn] = useState(false);
  return (
    <div>
      <div className="navbar">
        {isLogIn ? <Navbar></Navbar> : <NavbarOnLogin></NavbarOnLogin>}
      </div>
      {/* <div className="navbar">
        <NavbarUser></NavbarUser>
      </div> */}
      <div className="board">
        <NoticeHospital></NoticeHospital>
      </div>
      {/* <div className="board">
        <NoticeDetail></NoticeDetail>
      </div> */}
      {/* <div className="body">
        <Main></Main>
      </div> */}
      <Footer />
    </div>
  );
}

export default App;
