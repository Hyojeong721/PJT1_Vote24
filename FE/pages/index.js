import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Main from "../components/Main/Main";
import MainOnLogin from "../components/Main/MainOnLogin";

function Home() {
  const { isLoggedIn, userInfo } = useSelector((state) => state.userStatus);
  const dispatch = useDispatch();

  // const userInfo = {
  //   id: "1",
  //   code: "222",
  //   name: "SSAFY",
  // };

  // const MAIN_URL = `http://i6a205.p.ssafy.io:8000/api/main/${userInfo.id}`;

  const test1 = () => {
    dispatch({ type: "LOGIN", userInfo });
  };

  const test2 = () => {
    dispatch({ type: "LOGOUT" });
  };

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     axios.get(MAIN_URL).then((res) => console.log(res.data));
  //   }
  // }, []);

  return (
    <div>
      <button type="button" onClick={test1}>
        LOGIN
      </button>
      <button type="button" onClick={test2}>
        LOGOUT
      </button>
      <div>{userInfo.id}</div>
      {!isLoggedIn ? <Main /> : <MainOnLogin />}
    </div>
  );
}

export default Home;
