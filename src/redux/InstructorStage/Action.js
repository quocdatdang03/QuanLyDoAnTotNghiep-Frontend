import { axiosAPI } from "../../config/api";
import * as actionTypes from "./ActionType";

export const createStageAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_STAGE_REQUEST });

  try {
    const response = await axiosAPI.post(
      `/instructor/stages/creation`,
      requestData.stageData
    );

    console.log(response.data);

    dispatch({
      type: actionTypes.CREATE_STAGE_SUCCESS,
      payload: response.data,
    });

    if (response.data)
      requestData.toast.success("Tạo mới giai đoạn thành công");
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.CREATE_STAGE_FAILURE,
      payload: errorMessage,
    });
  }
};

export const getAllStagesByTeacherAndSemesterAction =
  (requestData) => async (dispatch) => {
    dispatch({
      type: actionTypes.GET_ALL_STAGES_BY_INSTRUCTOR_AND_SEMESTER_REQUEST,
    });

    try {
      const params = new URLSearchParams();

      if (requestData?.semesterId)
        params.append("semesterId", requestData.semesterId);

      const response = await axiosAPI.get(
        `/instructor/stages?${params.toString()}`
      );

      console.log(response.data);

      dispatch({
        type: actionTypes.GET_ALL_STAGES_BY_INSTRUCTOR_AND_SEMESTER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      dispatch({
        type: actionTypes.GET_ALL_STAGES_BY_INSTRUCTOR_AND_SEMESTER_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const deleteStageFileByIdAction = (requestData) => async (dispatch) => {
  dispatch({
    type: actionTypes.DELETE_STAGEFILE_BY_STAGEFILEID_REQUEST,
  });

  try {
    const response = await axiosAPI.delete(
      `/instructor/stages/stageFile/${requestData.stageFileId}`
    );

    console.log(response.data);

    dispatch({
      type: actionTypes.DELETE_STAGEFILE_BY_STAGEFILEID_SUCCESS,
      payload: requestData.stageFileId,
    });

    if (response.data)
      requestData.toast.success("Xóa tài liệu giai đoạn thành công");
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.DELETE_STAGEFILE_BY_STAGEFILEID_FAILURE,
      payload: errorMessage,
    });
  }
};

export const getAllStageStatusesAction = () => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_ALL_STAGESTATUSES_REQUEST,
  });

  try {
    const response = await axiosAPI.get(`/instructor/stages/stageStatuses`);

    console.log(response.data);

    dispatch({
      type: actionTypes.GET_ALL_STAGESTATUSES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.GET_ALL_STAGESTATUSES_FAILURE,
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
      `/instructor/stages/${requestData.stageId}`
    );

    console.log(response.data);

    dispatch({
      type: actionTypes.GET_STAGE_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.GET_STAGE_BY_ID_FAILURE,
      payload: errorMessage,
    });
  }
};

export const updateStageStatusAction = (requestData) => async (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_STAGESTATUS_REQUEST,
  });

  try {
    const { updateStageStatusData } = requestData;

    const response = await axiosAPI.patch(
      `/instructor/stages/stageStatus?stageId=${updateStageStatusData.stageId}&stageStatusId=${updateStageStatusData.stageStatusId}`
    );

    console.log(response.data);

    dispatch({
      type: actionTypes.UPDATE_STAGESTATUS_SUCCESS,
      payload: response.data,
    });

    if (response.data)
      requestData.toast.success("Cập nhật trạng thái giai đoạn thành công");
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.UPDATE_STAGESTATUS_FAILURE,
      payload: errorMessage,
    });
  }
};

export const updateStageAction = (requestData) => async (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_STAGE_REQUEST,
  });

  try {
    const { stageId, stageData } = requestData;

    const response = await axiosAPI.put(
      `/instructor/stages/${stageId}`,
      stageData
    );

    console.log(response.data);

    dispatch({
      type: actionTypes.UPDATE_STAGE_SUCCESS,
      payload: response.data,
    });

    if (response.data) {
      requestData.toast.success("Cập nhật giai đoạn thành công");
      requestData.navigate("/teacher/stages");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.UPDATE_STAGE_FAILURE,
      payload: errorMessage,
    });
  }
};

export const deleteStageAction = (requestData) => async (dispatch) => {
  dispatch({
    type: actionTypes.DELETE_STAGE_REQUEST,
  });

  try {
    const response = await axiosAPI.delete(
      `/instructor/stages/${requestData.stageId}`
    );

    console.log(response.data);

    dispatch({
      type: actionTypes.DELETE_STAGE_SUCCESS,
      payload: requestData.stageId,
    });

    if (response.data) {
      requestData.toast.success("Xóa giai đoạn thành công");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.DELETE_STAGE_FAILURE,
      payload: errorMessage,
    });
  }
};
