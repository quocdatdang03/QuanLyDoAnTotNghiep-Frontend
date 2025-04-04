import { axiosAPI } from "../../config/api";
import * as actionTypes from "./ActionType";

export const getProjectByIdAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_PROJECT_BY_PROJECTID_REQUEST });

  try {
    const response = await axiosAPI.get(
      `/instructor/projects/${requestData.projectId}`
    );

    console.log(response.data);

    dispatch({
      type: actionTypes.GET_PROJECT_BY_PROJECTID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.GET_PROJECT_BY_PROJECTID_FAILURE,
      payload: errorMessage,
    });
  }
};

export const getAllStagesOfProjectAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_ALL_STAGES_BY_PROJECT_REQUEST });

    try {
      const response = await axiosAPI.get(
        `/instructor/projects/${requestData.projectId}/stages`
      );

      console.log(response.data);

      dispatch({
        type: actionTypes.GET_ALL_STAGES_BY_PROJECT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      dispatch({
        type: actionTypes.GET_ALL_STAGES_BY_PROJECT_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const getAllProgressReportsByProjectAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_ALL_PROGRESSREPORTS_BY_PROJECT_REQUEST });

    try {
      const params = new URLSearchParams();

      params.append("projectId", requestData.projectId);

      if (requestData.sortOrder) {
        params.append("sortDir", requestData.sortOrder);
      }

      if (requestData.stageId) {
        params.append("stageId", requestData.stageId);
      }

      const response = await axiosAPI.get(
        `/instructor/progressReports?${params.toString()}`
      );

      console.log(response.data);

      dispatch({
        type: actionTypes.GET_ALL_PROGRESSREPORTS_BY_PROJECT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      dispatch({
        type: actionTypes.GET_ALL_PROGRESSREPORTS_BY_PROJECT_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const getProgressReportByIdAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_PROGRESS_REPORT_BY_ID_REQUEST });

    try {
      const response = await axiosAPI.get(
        `/instructor/progressReports/${requestData.progressReportId}`
      );

      console.log(response.data);

      dispatch({
        type: actionTypes.GET_PROGRESS_REPORT_BY_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      dispatch({
        type: actionTypes.GET_PROGRESS_REPORT_BY_ID_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const getProgressReviewByIdAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_PROGRESS_REVIEW_BY_ID_REQUEST });

    try {
      const response = await axiosAPI.get(
        `/instructor/progressReviews/${requestData.progressReviewId}`
      );

      console.log(response.data);

      dispatch({
        type: actionTypes.GET_PROGRESS_REVIEW_BY_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      dispatch({
        type: actionTypes.GET_PROGRESS_REVIEW_BY_ID_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const deleteProgressReviewFileByIdAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_PROGRESS_REVIEW_FILE_BY_ID_REQUEST });

    try {
      const response = await axiosAPI.delete(
        `/instructor/progressReviews/progressReviewFile/${requestData.progressReviewFileId}`
      );

      console.log(response.data);

      dispatch({
        type: actionTypes.DELETE_PROGRESS_REVIEW_FILE_BY_ID_SUCCESS,
        payload: requestData.progressReviewFileId,
      });

      if (response.data)
        requestData.toast.success("Xóa tài liệu đánh giá thành công");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      dispatch({
        type: actionTypes.DELETE_PROGRESS_REVIEW_FILE_BY_ID_FAILURE,
        payload: errorMessage,
      });

      requestData.toast.error(
        "Xảy ra lỗi trong quá trình xóa tài liệu đánh giá tiến độ"
      );
    }
  };

export const createProgressReviewAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_PROGRESS_REVIEW_REQUEST });

  try {
    const response = await axiosAPI.post(
      `/instructor/progressReviews/creation`,
      requestData.progressReviewData
    );

    console.log(response.data);

    if (response.data) {
      // load all progressReports
      dispatch(
        getAllProgressReportsByProjectAction({
          projectId: requestData.projectId,
        })
      );

      // show notification success:
      requestData.toast.success("Tạo đánh giá báo cáo tiến độ thành công");

      // navigate to teacher progress manager detail
      requestData.navigate(
        `/teacher/progress/detail/project/${requestData.projectId}`
      );
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.CREATE_PROGRESS_REVIEW_FAILURE,
      payload: errorMessage,
    });

    if (errorMessage) {
      requestData.toast.error(errorMessage);
    }
  }
};

export const updateProgressReviewAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_PROGRESS_REVIEW_REQUEST });

  try {
    const response = await axiosAPI.put(
      `/instructor/progressReviews/${requestData.progressReviewData.progressReviewId}`,
      requestData.progressReviewData
    );

    console.log(response.data);

    if (response.data) {
      // load all progressReports
      dispatch(
        getAllProgressReportsByProjectAction({
          projectId: requestData.projectId,
        })
      );

      // show notification success:
      requestData.toast.success("Cập nhật đánh giá báo cáo tiến độ thành công");

      // navigate to teacher progress manager detail
      requestData.navigate(
        `/teacher/progress/detail/project/${requestData.projectId}`
      );
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.UPDATE_PROGRESS_REVIEW_FAILURE,
      payload: errorMessage,
    });

    if (errorMessage) {
      requestData.toast.error(errorMessage);
    }
  }
};

export const deleteProgressReviewByIdAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_PROGRESS_REVIEW_BY_ID_REQUEST });

    try {
      const response = await axiosAPI.delete(
        `/instructor/progressReviews/${requestData.progressReviewId}`
      );

      console.log(response.data);

      dispatch({
        type: actionTypes.DELETE_PROGRESS_REVIEW_BY_ID_SUCCESS,
        payload: requestData.progressReviewId,
      });

      if (response.data)
        requestData.toast.success("Xóa đánh giá tiến độ thành công");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      dispatch({
        type: actionTypes.DELETE_PROGRESS_REVIEW_BY_ID_FAILURE,
        payload: errorMessage,
      });

      if (errorMessage) {
        requestData.toast.error(errorMessage);
      }
    }
  };

export const getCurrentStageByProjectIdAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_CURRENT_STAGE_BY_PROJECT_ID_REQUEST });

    try {
      const response = await axiosAPI.get(
        `/instructor/stages/project/${requestData.projectId}/currentStage`
      );

      console.log(response.data);

      dispatch({
        type: actionTypes.GET_CURRENT_STAGE_BY_PROJECT_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      dispatch({
        type: actionTypes.GET_CURRENT_STAGE_BY_PROJECT_ID_FAILURE,
        payload: errorMessage,
      });
    }
  };
