import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import userStatus from "./userStatus";

const rootReducer = (state, action) => {
  switch (action.type) {
    // // 서버 사이드 데이터를 클라이언트 사이드 Store에 통합.
    case HYDRATE:
      return { ...state, ...action.payload };
    default: {
      const combineReducer = combineReducers({
        userStatus,
      });
      return combineReducer(state, action);
    }
  }
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export { persistedReducer, rootReducer };
