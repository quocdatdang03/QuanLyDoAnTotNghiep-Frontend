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

export const getAllClassesByFacultyAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_ALL_CLASSES_BY_FACULTY_REQUEST });

    try {
      const response = await axiosAPI.get(
        `/classes/faculty/${requestData.facultyId}`
      );

      console.log(response.data);

      dispatch({
        type: actionTypes.GET_ALL_CLASSES_BY_FACULTY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({
        type: actionTypes.GET_ALL_CLASSES_BY_FACULTY_FAILURE,
        payload: errorMessage,
      });
      console.log(errorMessage);
    }
  };
