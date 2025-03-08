import { axiosAPI } from "../../config/api";
import * as actionTypes from "./ActionType";

export const getAllClassesAction = () => async (dispatch) => {
  dispatch({ type: actionTypes.GET_ALL_CLASSES_REQUEST });

  try {
    const response = await axiosAPI.get("/classes");
    console.log(response.data);
    dispatch({
      type: actionTypes.GET_ALL_CLASSES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: actionTypes.GET_ALL_CLASSES_FAILURE,
      payload: errorMessage,
    });
  }
};
