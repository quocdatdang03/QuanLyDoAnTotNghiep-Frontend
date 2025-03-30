import { axiosAPI } from "../../config/api";
import * as actionTypes from "./ActionType";

export const getAllStagesByProjectAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_ALL_STAGES_BY_PROJECT_REQUEST });

    try {
      const response = await axiosAPI.get(
        `/student/progressReports/stages?projectId=${requestData.projectId}`
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

export const getStageByIdAction = (requestData) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_STAGE_BY_ID_REQUEST,
  });

  try {
    const response = await axiosAPI.get(
      `/student/progressReports/stages/${requestData.stageId}`
    );

    console.log(response.data);

    dispatch({
      type: actionTypes.GET_STAGE_BY_ID_SUCCESS,
      payload: response.data,
    });

    // navigate to FormCreateProgressReport
    if (response.data) {
      requestData.navigate("/student/progress/create");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.GET_STAGE_BY_ID_FAILURE,
      payload: errorMessage,
    });
  }
};

export const createProgressReportAction = (requestData) => async (dispatch) => {
  dispatch({
    type: actionTypes.CREATE_PROGRESSREPORT_REQUEST,
  });

  try {
    const response = await axiosAPI.post(
      `/student/progressReports/creation`,
      requestData.progressReportData
    );

    console.log(response.data);

    // dispatch({
    //   type: actionTypes.CREATE_PROGRESSREPORT_SUCCESS,
    //   payload: response.data,
    // });

    if (response.data) {
      {
        console.log(requestData.progressReportData.projectId);
        // load all progress reports by projectId
        dispatch(
          getAllProgressReportsByProjectAction({
            projectId: requestData.progressReportData.projectId,
          })
        );

        // show success notification and navigate to manage progressReport page
        requestData.toast.success("Tạo báo cáo tiến độ thành công");
        requestData.navigate("/student/progress/manage");
      }
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.CREATE_PROGRESSREPORT_FAILURE,
      payload: errorMessage,
    });

    if (errorMessage) {
      requestData.toast.error("Xảy ra lỗi trong quá trình tạo báo cáo tiến độ");
    }
  }
};

export const updateProgressReportAction = (requestData) => async (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_PROGRESSREPORT_REQUEST,
  });

  try {
    const response = await axiosAPI.put(
      `/student/progressReports`,
      requestData.progressReportData
    );

    console.log(response.data);

    if (response.data) {
      {
        console.log(requestData.projectId);
        // load all progress reports by projectId
        dispatch(
          getAllProgressReportsByProjectAction({
            projectId: requestData.projectId,
          })
        );

        // show success notification and navigate to manage progressReport page
        requestData.toast.success("Cập nhật báo cáo tiến độ thành công");
        requestData.navigate("/student/progress/manage");
      }
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.UPDATE_PROGRESSREPORT_FAILURE,
      payload: errorMessage,
    });

    if (errorMessage) {
      requestData.toast.error(
        "Xảy ra lỗi trong quá trình cập nhật báo cáo tiến độ"
      );
    }
  }
};

export const deleteProgressReportAction = (requestData) => async (dispatch) => {
  dispatch({
    type: actionTypes.DELETE_PROGRESSREPORT_REQUEST,
  });

  try {
    const response = await axiosAPI.delete(
      `/student/progressReports/${requestData.progressReportId}`
    );

    console.log(response.data);

    dispatch({
      type: actionTypes.DELETE_PROGRESSREPORT_SUCCESS,
      payload: requestData.progressReportId,
    });

    if (response.data) {
      {
        // show success notification
        requestData.toast.success("Xóa báo cáo tiến độ thành công");
      }
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.DELETE_PROGRESSREPORT_FAILURE,
      payload: errorMessage,
    });

    if (errorMessage) {
      requestData.toast.error(
        "Xảy ra lỗi trong quá trình cập nhật báo cáo tiến độ"
      );
    }
  }
};

export const getAllProgressReportsByProjectAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_ALL_PROGRESSREPORTS_BY_PROJECT_REQUEST });

    try {
      const response = await axiosAPI.get(
        `/student/progressReports?projectId=${requestData.projectId}`
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
    dispatch({ type: actionTypes.GET_PROGRESSREPORT_BY_ID_REQUEST });

    try {
      const response = await axiosAPI.get(
        `/student/progressReports/${requestData.progressReportId}`
      );

      console.log(response.data);

      dispatch({
        type: actionTypes.GET_PROGRESSREPORT_BY_ID_SUCCESS,
        payload: response.data,
      });

      // navigate to FormUpdateProgressReport
      if (response.data) requestData.navigate("/student/progress/edit");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      dispatch({
        type: actionTypes.GET_PROGRESSREPORT_BY_ID_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const deleteProgressReportFileByIdAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_PROGRESSREPORTFILE_BY_ID_REQUEST });

    try {
      const response = await axiosAPI.delete(
        `/student/progressReports/progressReportFile/${requestData.progressReportFileId}`
      );

      console.log(response.data);

      dispatch({
        type: actionTypes.DELETE_PROGRESSREPORTFILE_BY_ID_SUCCESS,
        payload: requestData.progressReportFileId,
      });

      if (response.data)
        requestData.toast.success("Xóa file báo cáo tiến độ thành công");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      dispatch({
        type: actionTypes.DELETE_PROGRESSREPORTFILE_BY_ID_FAILURE,
        payload: errorMessage,
      });
    }
  };
