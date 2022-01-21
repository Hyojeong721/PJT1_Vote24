import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Main from "../components/Main";
import MainOnLogin from "../components/MainOnLogin";

function Home() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      useDispatch({ type: "LOGIN", userInfo: {} });
    }
  });

  return <div>{!isLoggedIn ? <Main /> : <MainOnLogin />}</div>;
}

export default Home;
