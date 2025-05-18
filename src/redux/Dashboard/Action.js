import { axiosAPI } from "../../config/api";
import * as actionTypes from "./ActionType";

export const countAllStudents = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.COUNT_ALL_STUDENTS_REQUEST });

  try {
    const params = new URLSearchParams();

    if (requestData?.facultyId)
      params.append("facultyId", requestData?.facultyId);

    if (requestData?.classId) params.append("classId", requestData?.classId);

    const response = await axiosAPI.get(
      `/admin/dashboard/students?${params.toString()}`
    );

    dispatch({
      type: actionTypes.COUNT_ALL_STUDENTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: actionTypes.COUNT_ALL_STUDENTS_FAILURE,
      payload: errorMessage,
    });
  }
};

export const countAllTeachers = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.COUNT_ALL_TEACHERS_REQUEST });

  try {
    const params = new URLSearchParams();

    if (requestData?.facultyId)
      params.append("facultyId", requestData?.facultyId);

    const response = await axiosAPI.get(
      `/admin/dashboard/teachers?${params.toString()}`
    );
    dispatch({
      type: actionTypes.COUNT_ALL_TEACHERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: actionTypes.COUNT_ALL_TEACHERS_FAILURE,
      payload: errorMessage,
    });
  }
};

export const countAllStudentSemesters = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.COUNT_ALL_STUDENT_SEMESTERS_REQUEST });

  try {
    const params = new URLSearchParams();

    if (requestData?.facultyId)
      params.append("facultyId", requestData?.facultyId);

    if (requestData?.classId) params.append("classId", requestData?.classId);

    if (requestData?.semesterId)
      params.append("semesterId", requestData?.semesterId);

    const response = await axiosAPI.get(
      `/admin/dashboard/studentSemesters?${params.toString()}`
    );

    dispatch({
      type: actionTypes.COUNT_ALL_STUDENT_SEMESTERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: actionTypes.COUNT_ALL_STUDENT_SEMESTERS_FAILURE,
      payload: errorMessage,
    });
  }
};

export const countAllRegisteredProjectStudent =
  (requestData) => async (dispatch) => {
    dispatch({
      type: actionTypes.COUNT_ALL_REGISTERED_PROJECT_STUDENT_REQUEST,
    });

    try {
      const params = new URLSearchParams();

      if (requestData?.facultyId)
        params.append("facultyId", requestData?.facultyId);

      if (requestData?.classId) params.append("classId", requestData?.classId);

      if (requestData?.semesterId)
        params.append("semesterId", requestData?.semesterId);

      const response = await axiosAPI.get(
        `/admin/dashboard/registeredProjectStudent?${params.toString()}`
      );

      dispatch({
        type: actionTypes.COUNT_ALL_REGISTERED_PROJECT_STUDENT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({
        type: actionTypes.COUNT_ALL_REGISTERED_PROJECT_STUDENT_FAILURE,
        payload: errorMessage,
      });
    }
  };
