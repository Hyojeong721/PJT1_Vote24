import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Main from "../components/Main";
import MainOnLogin from "../components/MainOnLogin";

function Home() {
  const { isLoggedIn } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Home useEffect", isLoggedIn);
  }, [isLoggedIn]);

  return <div>{!isLoggedIn ? <Main /> : <MainOnLogin />}</div>;
}

export default Home;
