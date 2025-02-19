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

export const createTeamAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_TEAM_REQUEST });
  try {
    const response = await axiosAPI.post(
      "/teams/creation",
      requestData.teamData
    );

    dispatch({ type: actionTypes.CREATE_TEAM_SUCCESS, payload: response.data });

    if (!requestData.isTeamLoading) {
      requestData.navigate("/student/teams/details");
    }
    console.log(response.data);
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({ type: actionTypes.CREATE_TEAM_FAILURE, payload: errorMessage });
  }
};

export const getTeamDetailsAction = (teamId) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_TEAM_DETAILS_REQUEST });
  try {
    const response = await axiosAPI.get(`/teams/${teamId}`);

    dispatch({
      type: actionTypes.GET_TEAM_DETAILS_SUCCESS,
      payload: response.data,
    });

    console.log(response.data);
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: actionTypes.GET_TEAM_DETAILS_FAILURE,
      payload: errorMessage,
    });
  }
};
