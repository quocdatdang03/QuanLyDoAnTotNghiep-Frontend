import { axiosAPI } from "../../config/api";
import * as actionTypes from "./ActionType";

export const createProjectAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_PROJECT_REQUEST });

  try {
    const response = await axiosAPI.post(
      "/student/projects/creation",
      requestData.projectData
    );

    console.log(response.data);

    dispatch({
      type: actionTypes.CREATE_PROJECT_SUCCESS,
      payload: response.data,
    });

    if (response.data) requestData.toast.success("Đăng ký đề tài thành công");
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: actionTypes.CREATE_PROJECT_FAILURE,
      payload: errorMessage,
    });
  }
};

export const getInstructorOfProjectByStudentCodeAction =
  (requestData) => async (dispatch) => {
    dispatch({
      type: actionTypes.GET_INSTRUCTOR_OF_PROJECT_BY_STUDENTCODE_REQUEST,
    });

    try {
      const response = await axiosAPI.get(
        `/student/projects/instructor?studentCode=${requestData.studentCode}`
      );

      console.log(response.data);

      dispatch({
        type: actionTypes.GET_INSTRUCTOR_OF_PROJECT_BY_STUDENTCODE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({
        type: actionTypes.GET_INSTRUCTOR_OF_PROJECT_BY_STUDENTCODE_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const getProjectByStudentCodeAction =
  (requestData) => async (dispatch) => {
    dispatch({
      type: actionTypes.GET_PROJECT_BY_STUDENTCODE_REQUEST,
    });

    try {
      const response = await axiosAPI.get(
        `/student/projects?studentCode=${requestData.studentCode}`
      );

      console.log(response.data);

      dispatch({
        type: actionTypes.GET_PROJECT_BY_STUDENTCODE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({
        type: actionTypes.GET_PROJECT_BY_STUDENTCODE_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const deleteProjectFileByIdAction =
  (requestData) => async (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_PROJECT_FILE_BY_ID_REQUEST,
    });

    try {
      const response = await axiosAPI.delete(
        `/student/projects/projectFile/${requestData.projectFileId}`
      );

      dispatch({
        type: actionTypes.DELETE_PROJECT_FILE_BY_ID_SUCCESS,
        payload: requestData.projectFileId,
      });

      if (response.data) requestData.toast.success("Xóa file thành công");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({
        type: actionTypes.DELETE_PROJECT_FILE_BY_ID_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const updateProjectAction = (requestData) => async (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_PROJECT_REQUEST,
  });

  try {
    const response = await axiosAPI.put(
      `/student/projects/${requestData.projectData.projectId}`,
      requestData.projectData
    );

    dispatch({
      type: actionTypes.UPDATE_PROJECT_SUCCESS,
      payload: response.data,
    });

    if (response.data) {
      requestData.toast.success("Cập nhật đề tài tốt nghiệp thành công");
      requestData.navigate("/student/project/register");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: actionTypes.UPDATE_PROJECT_FAILURE,
      payload: errorMessage,
    });
  }
};
