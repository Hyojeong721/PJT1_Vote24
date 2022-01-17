import { useState } from "react";
import "./App.css";
import Main from "./pages/Main";
import Navbar from "./components/Navbar";
import NavbarOnLogin from "./components/NavbarOnLogin";
import Footer from "./components/Footer";

function App() {
  const [isLogIn, setIsLogIn] = useState(false);
  return (
    <div>
      <div className="navbar">
        {isLogIn ? <Navbar></Navbar> : <NavbarOnLogin></NavbarOnLogin>}
      </div>
      <div className="page_body">
        <Main></Main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
