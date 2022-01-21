const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const getTokenToLocalStorange = (token) => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("jwt", token);
  }
};

const isLoggedIn = getTokenToLocalStorange() ? true : false;

export const initialState = { isLoggedIn: isLoggedIn, userInfo: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: {},
      };
    default:
      return state;
  }
};
