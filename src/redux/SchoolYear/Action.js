import { axiosAPI } from "../../config/api";
import * as actionTypes from "./ActionType";

export const getAllSchoolYearAction = () => async (dispatch) => {
  dispatch({ type: actionTypes.GET_ALL_SCHOOL_YEAR_REQUEST });

  try {
    const response = await axiosAPI.get("/schoolYears");
    console.log(response.data);

    dispatch({
      type: actionTypes.GET_ALL_SCHOOL_YEAR_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: actionTypes.GET_ALL_SCHOOL_YEAR_FAILURE,
      payload: errorMessage,
    });
  }
};

export const getAllSchoolYearsByPaginationAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_ALL_SCHOOL_YEAR_BY_PAGINATION_REQUEST });

    try {
      const { schoolYearPagination } = requestData;
      const params = new URLSearchParams();

      if (schoolYearPagination?.pageNumber)
        params.append("pageNumber", schoolYearPagination.pageNumber);

      if (schoolYearPagination?.pageSize)
        params.append("pageSize", schoolYearPagination.pageSize);

      if (schoolYearPagination?.sortBy)
        params.append("sortBy", schoolYearPagination.sortBy);

      if (schoolYearPagination?.sortDir)
        params.append("sortDir", schoolYearPagination.sortDir);

      const response = await axiosAPI.get(
        `/schoolYears/pagination?${params.toString()}`
      );

      console.log("++++++++++++++++++++++++++++++");
      console.log(response.data);
      dispatch({
        type: actionTypes.GET_ALL_SCHOOL_YEAR_BY_PAGINATION_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({
        type: actionTypes.GET_ALL_SCHOOL_YEAR_BY_PAGINATION_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const createSchoolYearAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_SCHOOL_YEAR_REQUEST });

  try {
    const response = await axiosAPI.post(
      "/admin/schoolYears",
      requestData.schoolYearData
    );
    console.log(response.data);

    dispatch({
      type: actionTypes.CREATE_SCHOOL_YEAR_SUCCESS,
      payload: response.data,
    });

    if (response.data) {
      const requestDataSchoolYear = {
        schoolYearPagination: {},
      };
      dispatch(getAllSchoolYearsByPaginationAction(requestDataSchoolYear));

      // success notification
      requestData.toast.success("Tạo năm học thành công");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: actionTypes.CREATE_SCHOOL_YEAR_FAILURE,
      payload: errorMessage,
    });
    if (errorMessage === "SchoolYearName should be unique") {
      requestData.toast.error(
        "Tên năm học " +
          requestData.schoolYearData.startYear +
          "-" +
          requestData.schoolYearData.endYear +
          " đã tồn tại"
      );
    }
  }
};

export const deleteSchoolYearAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.DELETE_SCHOOL_YEAR_REQUEST });

  try {
    const response = await axiosAPI.delete(
      `/admin/schoolYears/${requestData.schoolYearId}`
    );

    console.log(response.data);
    dispatch({
      type: actionTypes.DELETE_SCHOOL_YEAR_SUCCESS,
      payload: requestData.schoolYearId,
    });

    if (response.data) {
      const requestDataSchoolYear = {
        schoolYearPagination: {},
      };
      dispatch(getAllSchoolYearsByPaginationAction(requestDataSchoolYear));

      // success notification
      requestData.toast.success("Xóa năm học thành công");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: actionTypes.DELETE_SCHOOL_YEAR_FAILURE,
      payload: errorMessage,
    });
  }
};

export const getSchoolYearByIdAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_SCHOOL_YEAR_BY_ID_REQUEST });

  try {
    const response = await axiosAPI.get(
      `/admin/schoolYears/${requestData.schoolYearId}`
    );

    console.log(response.data);

    dispatch({
      type: actionTypes.GET_SCHOOL_YEAR_BY_ID_SUCCESS,
      payload: response.data,
    });

    if (response.data && !requestData.isSchoolYearLoading)
      requestData.navigate("schoolYear/edit");
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: actionTypes.GET_SCHOOL_YEAR_BY_ID_FAILURE,
      payload: errorMessage,
    });
  }
};

export const updateSchoolYearAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_SCHOOL_YEAR_REQUEST });

  try {
    const response = await axiosAPI.put(
      `/admin/schoolYears/${requestData.schoolYearId}`,
      requestData.schoolYearData
    );

    dispatch({
      type: actionTypes.UPDATE_SCHOOL_YEAR_SUCCESS,
      payload: response.data,
    });

    if (response.data) {
      requestData.toast.success("Cập nhật năm học thành công");
      requestData.navigate("/admin/manage-semester");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: actionTypes.UPDATE_SCHOOL_YEAR_FAILURE,
      payload: errorMessage,
    });
    if (errorMessage === "SchoolYearName should be unique") {
      requestData.toast.error(
        "Tên năm học " +
          requestData.schoolYearData.startYear +
          "-" +
          requestData.schoolYearData.endYear +
          " đã tồn tại"
      );
    }
  }
};
