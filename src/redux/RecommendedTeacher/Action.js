import { axiosAPI } from "../../config/api";
import * as actionTypes from "./ActionType";

export const getAllTeachersByFacultyAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_ALL_TEACHERS_BY_FACULTY_REQUEST });

    try {
      const params = new URLSearchParams();
      const { keyword, paginationData } = requestData;

      params.append("keyword", keyword);

      if (paginationData?.pageNumber)
        params.append("pageNumber", paginationData.pageNumber);

      if (paginationData?.pageSize)
        params.append("pageSize", paginationData.pageSize);

      if (paginationData?.sortBy)
        params.append("sortBy", paginationData.sortBy);

      if (paginationData?.sortDir)
        params.append("sortDir", paginationData.sortDir);

      const response = await axiosAPI.get(
        `/student/recommendedTeachers/teachers?${params.toString()}`
      );

      dispatch({
        type: actionTypes.GET_ALL_TEACHERS_BY_FACULTY_SUCCESS,
        payload: response.data,
      });

      console.log(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      dispatch({
        type: actionTypes.GET_ALL_TEACHERS_BY_FACULTY_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const getAllRecommendedTeacherAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_ALL_RECOMMENDED_TEACHER_REQUEST });

    try {
      const response = await axiosAPI.get(
        `/student/recommendedTeachers?studentCode=${requestData.studentCode}`
      );

      dispatch({
        type: actionTypes.GET_ALL_RECOMMENDED_TEACHER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      dispatch({
        type: actionTypes.GET_ALL_RECOMMENDED_TEACHER_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const addRecommendedTeacherAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.ADD_RECOMMENDED_TEACHER_REQUEST });

    try {
      const response = await axiosAPI.post(
        `/student/recommendedTeachers`,
        requestData.recommendedTeacherData
      );

      dispatch({
        type: actionTypes.ADD_RECOMMENDED_TEACHER_SUCCESS,
        payload: response.data,
      });

      if (response.data)
        requestData.toast.success("Đề xuất giảng viên hướng dẫn thành công");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      dispatch({
        type: actionTypes.ADD_RECOMMENDED_TEACHER_FAILURE,
        payload: errorMessage,
      });

      if (errorMessage) requestData.toast.error(errorMessage);
    }
  };

export const removeRecommendedTeacherAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.REMOVE_RECOMMENDED_TEACHER_REQUEST });

    try {
      console.log(requestData.recommendedTeacherData);
      const response = await axiosAPI.delete(`/student/recommendedTeachers`, {
        data: requestData.recommendedTeacherData,
      });

      dispatch({
        type: actionTypes.REMOVE_RECOMMENDED_TEACHER_SUCCESS,
        payload: response.data,
      });

      if (response.data)
        requestData.toast.success(
          "Xóa đề xuất giảng viên hướng dẫn thành công"
        );
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      dispatch({
        type: actionTypes.REMOVE_RECOMMENDED_TEACHER_FAILURE,
        payload: errorMessage,
      });

      if (errorMessage) requestData.toast.error(errorMessage);
    }
  };
