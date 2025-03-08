import { axiosAPI } from "../../config/api";
import * as actionTypes from "./ActionType";

export const getAllFacultiesAction = () => async (dispatch) => {
  dispatch({ type: actionTypes.GET_ALL_FACULTY_REQUEST });

  try {
    const response = await axiosAPI.get("/faculties");
    console.log(response.data);
    dispatch({
      type: actionTypes.GET_ALL_FACULTY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: actionTypes.GET_ALL_FACULTY_FAILURE,
      payload: errorMessage,
    });
  }
};
