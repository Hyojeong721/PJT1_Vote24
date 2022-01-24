import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Main from "../components/Main";
import MainOnLogin from "../components/MainOnLogin";

function Home() {
  const { isLoggedIn } = useSelector((state) => state.userStatus);
  const dispatch = useDispatch();
  const userInfo = {
    id: "947780",
    code: "222",
    name: "SSAFY",
  };
  const test1 = () => {
    dispatch({ type: "LOGIN", userInfo });
  };

  const test2 = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div>
      <button type="button" onClick={test1}>
        LOGIN
      </button>
      <button type="button" onClick={test2}>
        LOGOUT
      </button>
      {!isLoggedIn ? <Main /> : <MainOnLogin />}
    </div>
  );
}

export default Home;
