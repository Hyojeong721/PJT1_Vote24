import { useState } from "react";
import "./App.css";
import Main from "./pages/Main";
import Navbar from "./components/Navbar";
import NavbarOnLogin from "./components/NavbarOnLogin";
import NavbarUser from "./components/NavbarUser";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";
import NoticeHospital from "./pages/NoticeHospital";

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
      <div className="page_body">
        {isLogIn ? <Main></Main> : <Header></Header>}
        <Login></Login>
      </div>
      <Footer />
    </div>
  );
}

export default App;
