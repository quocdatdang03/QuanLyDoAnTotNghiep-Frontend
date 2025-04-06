import { axiosAPI } from "../../config/api";
import * as actionTypes from "./ActionType";

export const getAllNotificationsByTeacherAndSemesterAction =
  (requestData) => async (dispatch) => {
    dispatch({
      type: actionTypes.GET_ALL_NOTIFICATIONS_BY_TEACHER_AND_SEMESTER_REQUEST,
    });

    try {
      const params = new URLSearchParams();

      if (requestData?.semesterId) {
        params.append("semesterId", requestData.semesterId);
      }

      if (requestData?.pageNumber) {
        params.append("pageNumber", requestData.pageNumber);
      }

      if (requestData?.pageSize) {
        params.append("pageSize", requestData.pageSize);
      }

      params.append("teacherCode", requestData?.teacherCode);

      const response = await axiosAPI.get(
        `/notifications?${params.toString()}`
      );

      console.log(response.data);

      dispatch({
        type: actionTypes.GET_ALL_NOTIFICATIONS_BY_TEACHER_AND_SEMESTER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({
        type: actionTypes.GET_ALL_NOTIFICATIONS_BY_TEACHER_AND_SEMESTER_FAILURE,
        payload: errorMessage,
      });
    }
  };
