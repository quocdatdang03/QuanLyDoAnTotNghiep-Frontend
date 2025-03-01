import { axiosAPI } from "../../config/api";
import * as actionTypes from "./ActionType";

export const loginUserAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.LOGIN_USER_REQUEST });

  try {
    const response = await axiosAPI.post("/auth/login", requestData.userData);
    const jwtToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;

    // if jwtToken is present -> save it to localStorage
    localStorage.setItem("jwtToken", jwtToken);
    localStorage.setItem("refreshToken", refreshToken);

    // --------------------- check role to navigate in here later

    dispatch({ type: actionTypes.LOGIN_USER_SUCCESS, payload: jwtToken });
    console.log("LOGIN SUCCESS: ");
    console.log(response.data);

    if (!requestData.isAuthLoading) {
      if (response.data.roles[0].roleName === "ADMIN")
        requestData.navigate("/admin");
      else requestData.navigate("/");
    }
  } catch (error) {
    console.log(error);
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: actionTypes.LOGIN_USER_FAILURE, payload: errorMessage });
  }
};

export const refreshAccessTokenAction = (refreshToken) => async (dispatch) => {
  dispatch({ type: actionTypes.REFRESH_TOKEN_REQUEST });

  try {
    const response = await axiosAPI.post("/auth/refreshToken", {
      refreshToken,
    });

    const newJwtToken = response.data.accessToken;

    // Nếu có accessToken mới, lưu vào localStorage
    if (newJwtToken) {
      localStorage.setItem("jwtToken", newJwtToken); // Lưu lại accessToken mới
      dispatch({
        type: actionTypes.REFRESH_TOKEN_SUCCESS,
        payload: newJwtToken,
      });

      // Trả lại jwtToken mới để interceptor sử dụng
      return newJwtToken;
    }

    // Nếu không có accessToken mới, yêu cầu người dùng đăng nhập lại
    throw new Error("Failed to refresh token.");
  } catch (error) {
    dispatch({
      type: actionTypes.REFRESH_TOKEN_FAILURE,
      payload: error.message || "Error refreshing token.",
    });

    // Nếu refreshToken hết hạn, xoá cả jwtToken và refreshToken và yêu cầu đăng nhập lại
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login"; // Chuyển hướng đến trang login
    throw new Error("Refresh token expired. Please log in again.");
  }
};

export const getUserInfoAction = () => async (dispatch) => {
  dispatch({ type: actionTypes.GET_USER_INFO_REQUEST });

  try {
    const response = await axiosAPI.get("/accounts/profile");

    console.log(response.data);
    dispatch({
      type: actionTypes.GET_USER_INFO_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.GET_USER_INFO_FAILURE, payload: error });
    console.log(error);
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    // remove jwtToken from localStorage :
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("refreshToken");

    dispatch({ type: actionTypes.LOGOUT });
    console.log("LOGOUT SUCCESS");
  } catch (error) {
    console.log(error);
  }
};

export const clearAuthError = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.CLEAR_AUTH_ERROR });
    console.log("CLEAR AUTH ERROR SUCCESS");
  } catch (error) {
    console.log(error);
  }
};

export const clearAuthSuccess = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.CLEAR_AUTH_SUCCESS });
    console.log("CLEAR AUTH SUCCESS SUCCESS");
  } catch (error) {
    console.log(error);
  }
};

export const updateUserProfileAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_USER_PROFILE_REQUEST });

  try {
    const response = await axiosAPI.put(
      "/accounts/profile",
      requestData.userProfileData
    );

    dispatch({
      type: actionTypes.UPDATE_USER_PROFILE_SUCCESS,
      payload: response.data,
    });

    if (!requestData.isAuthLoading) requestData.navigate("/user/profile");

    console.log("UPDATE PROFILE SUCCESS");
  } catch (error) {
    dispatch({ type: actionTypes.UPDATE_USER_PROFILE_FAILURE, payload: error });
  }
};

export const updateAdminProfileAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_USER_PROFILE_REQUEST });

  try {
    const response = await axiosAPI.put(
      "/accounts/profile",
      requestData.userProfileData
    );

    dispatch({
      type: actionTypes.UPDATE_USER_PROFILE_SUCCESS,
      payload: response.data,
    });

    if (!requestData.isAuthLoading) requestData.navigate("/admin/profile");

    console.log("UPDATE PROFILE SUCCESS");
  } catch (error) {
    dispatch({ type: actionTypes.UPDATE_USER_PROFILE_FAILURE, payload: error });
  }
};

/******************  Handle Reset password *******************/

export const sendResetPasswordEmailAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.SEND_RESET_PASSWORD_EMAIL_REQUEST });

    try {
      const response = await axiosAPI.post(
        `/auth/forgotPassword?email=${requestData.email}`
      );

      dispatch({
        type: actionTypes.SEND_RESET_PASSWORD_EMAIL_SUCCESS,
        payload: {
          resetPasswordEmail: requestData.email,
          messageSuccess: response.data,
        },
      });

      if (!requestData.isAuthLoading && response.data)
        requestData.navigate("/account/reset-password");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.log(errorMessage);
      dispatch({
        type: actionTypes.SEND_RESET_PASSWORD_EMAIL_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const resetPasswordAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.RESET_PASSWORD_REQUEST });

  try {
    const response = await axiosAPI.put(
      "/auth/resetPassword",
      requestData.resetPasswordData
    );

    dispatch({
      type: actionTypes.RESET_PASSWORD_SUCCESS,
      payload: response.data,
    });

    if (!requestData.isAuthLoading && response.data)
      requestData.navigate("/account/login");
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.log(errorMessage);
    dispatch({
      type: actionTypes.RESET_PASSWORD_FAILURE,
      payload: errorMessage,
    });
  }
};

/****************** End Handle Reset password *******************/
