import { axiosAPI } from "../../config/api";
import * as actionTypes from "./ActionType";

export const getAllDegreesAction = () => async (dispatch) => {
  dispatch({ type: actionTypes.GET_ALL_DEGREES_REQUEST });

  try {
    const response = await axiosAPI.get("/degrees");
    console.log(response.data);
    dispatch({
      type: actionTypes.GET_ALL_DEGREES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: actionTypes.GET_ALL_DEGREES_FAILURE,
      payload: errorMessage,
    });
  }
};
