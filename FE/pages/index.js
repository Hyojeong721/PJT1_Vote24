import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Main from "../components/Main/Main";
import MainOnLogin from "../components/Main/MainOnLogin";

function Home() {
  const { isLoggedIn, userInfo } = useSelector((state) => state.userStatus);
  // const MAIN_URL = `http://i6a205.p.ssafy.io:8000/api/main/${userInfo.id}`;

  // useEffect(async () => {
  //   if (userInfo.id) {
  //     await axios.get(MAIN_URL).then((res) => console.log(res.data));
  //   }
  // }, []);

  return <>{!isLoggedIn ? <Main /> : <MainOnLogin />}</>;
}

export default Home;
