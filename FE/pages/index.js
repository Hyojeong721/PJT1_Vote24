import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Main from "../components/Main/Main";
import MainOnLogin from "../components/Main/MainOnLogin";

function Home() {
  const { isLoggedIn } = useSelector((state) => state.userStatus);

  return <>{!isLoggedIn ? <Main /> : <MainOnLogin />}</>;
}

export default Home;
