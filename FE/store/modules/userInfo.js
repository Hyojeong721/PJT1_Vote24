const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export const initialState = { isLoggedIn: false, userInfo: {} };

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
