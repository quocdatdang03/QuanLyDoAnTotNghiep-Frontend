import { axiosAPI } from "../../config/api";
import * as actionTypes from "./ActionType";

export const getAllStudentsByInstructorAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_ALL_STUDENTS_BY_INSTRUCTOR_REQUEST });

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

      if (studentPagination?.classId)
        params.append("classId", studentPagination.classId);

      if (studentPagination?.semesterId)
        params.append("semesterId", studentPagination.semesterId);

      params.append("havingProject", studentPagination.havingProject);

      const response = await axiosAPI.get(
        `/instructor/students?${params.toString()}`
      );
      console.log(response.data);

      dispatch({
        type: actionTypes.GET_ALL_STUDENTS_BY_INSTRUCTOR_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      dispatch({
        type: actionTypes.GET_ALL_STUDENTS_BY_INSTRUCTOR_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const getAllClassesByFacultyOfTeacherAction = () => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_ALL_CLASSES_BY_FACULTY_OF_TEACHER_REQUEST,
  });

  try {
    const response = await axiosAPI.get("/instructor/classes");

    console.log(response.data);

    dispatch({
      type: actionTypes.GET_ALL_CLASSES_BY_FACULTY_OF_TEACHER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.GET_ALL_CLASSES_BY_FACULTY_OF_TEACHER_FAILURE,
      payload: errorMessage,
    });
  }
};

export const getAllTeachersAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_ALL_TEACHERS_REQUEST });

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

    if (studentPagination?.facultyId)
      params.append("facultyId", studentPagination.facultyId);

    const response = await axiosAPI.get(`/admin/teachers?${params.toString()}`);
    console.log(response.data);

    dispatch({
      type: actionTypes.GET_ALL_TEACHERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.GET_ALL_TEACHERS_FAILURE,
      payload: errorMessage,
    });
  }
};

export const createTeacherAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_TEACHER_REQUEST });

  try {
    const response = await axiosAPI.post(
      `/admin/accounts/teacher`,
      requestData.teacherData
    );
    console.log(response.data);

    // dispatch({
    //   type: actionTypes.CREATE_TEACHER_SUCCESS,
    //   payload: response.data,
    // });

    if (response.data) {
      requestData.toast.success("Tạo tài khoản giảng viên thành công");
      requestData.navigate("/admin/manage-teacher");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.CREATE_TEACHER_FAILURE,
      payload: errorMessage,
    });

    if (errorMessage) requestData.toast.error(errorMessage);
  }
};

export const getTeacherByCodeAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_TEACHER_BY_CODE_REQUEST });

  try {
    const response = await axiosAPI.get(
      `/admin/teachers/${requestData.teacherCode}`
    );
    console.log(response.data);

    dispatch({
      type: actionTypes.GET_TEACHER_BY_CODE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.GET_TEACHER_BY_CODE_FAILURE,
      payload: errorMessage,
    });

    if (errorMessage) requestData.toast.error(errorMessage);
  }
};

export const updateTeacherAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_TEACHER_REQUEST });

  try {
    const response = await axiosAPI.put(
      `/admin/accounts/teacher/${requestData.teacherId}`,
      requestData.teacherData
    );
    console.log(response.data);

    // dispatch({
    //   type: actionTypes.CREATE_TEACHER_SUCCESS,
    //   payload: response.data,
    // });

    if (response.data) {
      requestData.toast.success("Cập nhật tài khoản giảng viên thành công");
      requestData.navigate("/admin/manage-teacher");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.UPDATE_TEACHER_FAILURE,
      payload: errorMessage,
    });

    if (errorMessage) requestData.toast.error(errorMessage);
  }
};
