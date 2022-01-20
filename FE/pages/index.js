import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import MainOnLogin from "../components/MainOnLogin";

function Home() {
  const [isLogIn, setIsLogIn] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setIsLogIn(true);
    }
  });

  return <div>{isLogIn ? <Main /> : <MainOnLogin />}</div>;
}

export default Home;
