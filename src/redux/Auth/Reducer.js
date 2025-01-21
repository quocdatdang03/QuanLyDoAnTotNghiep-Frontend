import * as actionTypes from "./ActionType";

const initialState = {
  user: null,
  registerUser: null,
  registerEmail: null,
  resetPasswordEmail: null,
  resetPasswordInfo: null,
  jwtToken: null,
  success: null,
  error: null,
  isLoading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER_REQUEST:
    case actionTypes.REFRESH_TOKEN_REQUEST:
    case actionTypes.GET_USER_INFO_REQUEST:
    case actionTypes.UPDATE_USER_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };

    case actionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwtToken: action.payload,
        success: "Đăng nhập thành công",
      };

    case actionTypes.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jwtToken: action.payload,
      };

    case actionTypes.GET_USER_INFO_SUCCESS:
    case actionTypes.UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };

    case actionTypes.LOGOUT:
      return initialState;

    case actionTypes.CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: null,
      };
    case actionTypes.CLEAR_AUTH_SUCCESS:
      return {
        ...state,
        success: null,
      };

    case actionTypes.LOGIN_USER_FAILURE:
    case actionTypes.REFRESH_TOKEN_FAILURE:
    case actionTypes.GET_USER_INFO_FAILURE:
    case actionTypes.UPDATE_USER_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: null,
      };
    default:
      return state;
  }
};

export default authReducer;
