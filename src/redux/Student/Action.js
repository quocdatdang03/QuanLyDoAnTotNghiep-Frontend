import { axiosAPI } from "../../config/api";
import * as actionTypes from "./ActionType";

export const getAllStudentsByFacultyAndKeyword =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_STUDENTS_BY_FACULTY_AND_KEYWORD_REQUEST });

    try {
      const { keyword, studentPagination } = requestData;
      const params = new URLSearchParams();

      params.append("keyword", keyword);

      if (studentPagination?.pageNumber)
        params.append("pageNumber", studentPagination.pageNumber);

      if (studentPagination?.pageSize)
        params.append("pageSize", studentPagination.pageSize);

      if (studentPagination?.sortBy)
        params.append("sortBy", studentPagination.sortBy);

      if (studentPagination?.sortDir)
        params.append("sortDir", studentPagination.sortDir);

      const response = await axiosAPI.get(
        `/students/faculty/search?${params.toString()}`
      );
      console.log(response.data);

      dispatch({
        type: actionTypes.GET_STUDENTS_BY_FACULTY_AND_KEYWORD_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.log(error);
      dispatch({
        type: actionTypes.GET_STUDENTS_BY_FACULTY_AND_KEYWORD_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const filterAllStudentsAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.FILTER_ALL_STUDENTS_REQUEST });

  try {
    const { keyword, studentPagination } = requestData;
    const params = new URLSearchParams();

    if (keyword) params.append("keyword", keyword.trim());

    if (studentPagination?.pageNumber)
      params.append("pageNumber", studentPagination.pageNumber);

    if (studentPagination?.pageSize)
      params.append("pageSize", studentPagination.pageSize);

    if (studentPagination?.sortBy)
      params.append("sortBy", studentPagination.sortBy);

    if (studentPagination?.sortDir)
      params.append("sortDir", studentPagination.sortDir);

    if (studentPagination?.semesterId)
      params.append("semesterId", studentPagination.semesterId);

    if (studentPagination?.classId)
      params.append("classId", studentPagination.classId);

    if (studentPagination?.facultyId)
      params.append("facultyId", studentPagination.facultyId);

    const response = await axiosAPI.get(
      `/admin/students/filter?${params.toString()}`
    );
    console.log(response.data);

    dispatch({
      type: actionTypes.FILTER_ALL_STUDENTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.log(error);
    dispatch({
      type: actionTypes.FILTER_ALL_STUDENTS_FAILURE,
      payload: errorMessage,
    });
  }
};

export const getInstructorByStudentIdAction =
  (requestData) => async (dispatch) => {
    dispatch({
      type: actionTypes.GET_INSTRUCTOR_BY_STUDENTID_IN_CURRENT_SEMESTER_REQUEST,
    });

    try {
      const response = await axiosAPI.get(
        `/students/${requestData.studentId}/instructor`
      );

      dispatch({
        type: actionTypes.GET_INSTRUCTOR_BY_STUDENTID_IN_CURRENT_SEMESTER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.log(error);
      dispatch({
        type: actionTypes.GET_INSTRUCTOR_BY_STUDENTID_IN_CURRENT_SEMESTER_FAILURE,
        payload: errorMessage,
      });
    }
  };
