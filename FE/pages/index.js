import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Main from "../components/Main/Main2";
import MainOnLogin from "../components/Main/MainOnLogin";

function Home() {
  const { isLoggedIn } = useSelector((state) => state.userStatus);

  return <>{!isLoggedIn ? <Main /> : <MainOnLogin />}</>;
}

export default Home;
