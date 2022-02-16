const SET_INFO = "SET_INFO";

const initialHospitalInfo = {
  hId: "",
  name: "",
  phone: "",
  image: "",
};

export const initialState = { hospitalInfo: initialHospitalInfo };

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INFO:
      return {
        ...state,
        hospitalInfo: action.hospitalInfo,
      };
    default:
      return state;
  }
};
