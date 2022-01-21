import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import userInfo from "./userInfo";

const reducer = (state, action) => {
  switch (action.type) {
    // // 서버 사이드 데이터를 클라이언트 사이드 Store에 통합.
    case HYDRATE:
      return { ...state, ...action.payload };
    default: {
      const combineReducer = combineReducers({
        userInfo,
      });
      return combineReducer(state, action);
    }
  }
};

export default reducer;
