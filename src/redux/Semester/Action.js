import { axiosAPI } from "../../config/api";
import * as actionTypes from "./ActionType";

export const getAllSemestersAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_ALL_SEMESTER_REQUEST });

  try {
    const { semesterPagination } = requestData;
    const params = new URLSearchParams();

    if (semesterPagination?.pageNumber)
      params.append("pageNumber", semesterPagination.pageNumber);

    if (semesterPagination?.pageSize)
      params.append("pageSize", semesterPagination.pageSize);

    if (semesterPagination?.sortDir)
      params.append("sortDir", semesterPagination.sortDir);

    const response = await axiosAPI.get(
      `/admin/semesters?${params.toString()}`
    );

    console.log(response.data);

    dispatch({
      type: actionTypes.GET_ALL_SEMESTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: actionTypes.GET_ALL_SEMESTER_FAILURE,
      payload: errorMessage,
    });
  }
};

export const getCurrentSemesterAction = () => async (dispatch) => {
  dispatch({ type: actionTypes.GET_CURRENT_SEMESTER_REQUEST });

  try {
    const response = await axiosAPI.get(`/semesters/current`);

    console.log(response.data);
    dispatch({
      type: actionTypes.GET_CURRENT_SEMESTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: actionTypes.GET_CURRENT_SEMESTER_FAILURE,
      payload: errorMessage,
    });
  }
};

export const createSemesterAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_SEMESTER_REQUEST });

  try {
    const response = await axiosAPI.post(`/admin/semesters`, requestData);

    dispatch({
      type: actionTypes.CREATE_SEMESTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: actionTypes.CREATE_SEMESTER_FAILURE,
      payload: errorMessage,
    });
  }
};

export const deleteSemesterAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.DELETE_SEMESTER_REQUEST });

  try {
    const response = await axiosAPI.delete(
      `/admin/semesters/${requestData.semesterId}`
    );

    console.log(response.data);

    dispatch({
      type: actionTypes.DELETE_SEMESTER_SUCCESS,
      payload: requestData.semesterId,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.DELETE_SEMESTER_FAILURE,
      error: errorMessage,
    });
  }
};

export const getSemesterByIdAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_SEMESTER_BY_ID_REQUEST });

  try {
    const response = await axiosAPI.get(
      `/admin/semesters/${requestData.semesterId}`
    );

    console.log(response.data);

    dispatch({
      type: actionTypes.GET_SEMESTER_BY_ID_SUCCESS,
      payload: response.data,
    });

    if (response.data && !requestData.isSemesterLoading)
      requestData.navigate("semester/edit");
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: actionTypes.GET_SEMESTER_BY_ID_SUCCESS,
      payload: errorMessage,
    });
  }
};

export const updateSemesterAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_SEMESTER_BY_ID_REQUEST });

  try {
    const response = await axiosAPI.put(
      `/admin/semesters/${requestData.semesterId}`,
      requestData.semesterData
    );

    console.log(response.data);

    dispatch({
      type: actionTypes.UPDATE_SEMESTER_BY_ID_SUCCESS,
      payload: response.data,
    });

    if (response.data && !requestData.isSemesterLoading)
      requestData.navigate("/admin/manage-semester");
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: actionTypes.UPDATE_SEMESTER_BY_ID_FAILURE,
      payload: errorMessage,
    });
  }
};

export const getAllSemestersWithoutPaginationAction =
  () => async (dispatch) => {
    dispatch({ type: actionTypes.GET_ALL_SEMESTER_WITHOUT_PAGINATION_REQUEST });

    try {
      const response = await axiosAPI.get(`/semesters`);

      dispatch({
        type: actionTypes.GET_ALL_SEMESTER_WITHOUT_PAGINATION_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({
        type: actionTypes.GET_ALL_SEMESTER_WITHOUT_PAGINATION_FAILURE,
        payload: errorMessage,
      });
    }
  };
