import { axiosAPI } from "../../config/api";
import * as actionTypes from "./ActionType";

export const addStudentToTeamAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.ADD_STUDENT_TO_TEAM_REQUEST });

  try {
    const response = await axiosAPI.get(`/students/${requestData.studentCode}`);

    console.log(response.data);
    dispatch({
      type: actionTypes.ADD_STUDENT_TO_TEAM_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: actionTypes.ADD_STUDENT_TO_TEAM_FAILURE,
      payload: errorMessage,
    });
  }
};

export const removeStudentFromTeamAction =
  (studentCode) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.REMOVE_STUDENT_FROM_TEAM_SUCCESS,
        payload: studentCode,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({
        type: actionTypes.ADD_STUDENT_TO_TEAM_FAILURE,
        payload: errorMessage,
      });
    }
  };
