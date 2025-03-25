import axios from "axios";
import { axiosAPI } from "../../config/api";
import * as actionTypes from "./ActionType";

export const getAllStudentsWithoutInstructor =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_ALL_STUDENTS_WITHOUT_INSTRUCTOR_REQUEST });

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

      const response = await axiosAPI.get(
        `/instructor-leader/students/no-instructor?${params.toString()}`
      );
      console.log(response.data);

      dispatch({
        type: actionTypes.GET_ALL_STUDENTS_WITHOUT_INSTRUCTOR_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      dispatch({
        type: actionTypes.GET_ALL_STUDENTS_WITHOUT_INSTRUCTOR_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const getAllClassesByFacultyOfTeacherLeaderAction =
  () => async (dispatch) => {
    dispatch({
      type: actionTypes.GET_ALL_CLASSES_BY_FACULTY_OF_TEACHER_LEADER_REQUEST,
    });

    try {
      const response = await axiosAPI.get("/instructor-leader/classes");

      console.log(response.data);

      dispatch({
        type: actionTypes.GET_ALL_CLASSES_BY_FACULTY_OF_TEACHER_LEADER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      dispatch({
        type: actionTypes.GET_ALL_CLASSES_BY_FACULTY_OF_TEACHER_LEADER_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const chooseStudentAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.CHOOSE_STUDENT_REQUEST });

  try {
    const response = await axiosAPI.get(`/students/${requestData.studentCode}`);

    dispatch({
      type: actionTypes.CHOOSE_STUDENT_SUCCESS,
      payload: response.data,
    });

    if (response.data) {
      requestData.toast.success("Chọn sinh viên thành công");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: actionTypes.CHOOSE_STUDENT_FAILURE,
      payload: errorMessage,
    });
  }
};

export const removeStudentFromTemporaryList =
  (studentCode) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.REMOVE_STUDENT_FROM_TEMPORARY_LIST_SUCCESS,
        payload: studentCode,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({
        type: actionTypes.REMOVE_STUDENT_FROM_TEMPORARY_LIST_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const getAllInstructorsByFacultyOfTeacherLeaderAction =
  () => async (dispatch) => {
    dispatch({
      type: actionTypes.GET_ALL_INSTRUCTOS_BY_FACULTY_OF_TEACHER_LEADER_REQUEST,
    });

    try {
      const response = await axiosAPI.get(`/instructor-leader/faculty`);

      console.log(response.data);

      dispatch({
        type: actionTypes.GET_ALL_INSTRUCTOS_BY_FACULTY_OF_TEACHER_LEADER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({
        type: actionTypes.GET_ALL_CLASSES_BY_FACULTY_OF_TEACHER_LEADER_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const chooseInstructorAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.CHOOSE_INSTRUCTOR_REQUEST });

  try {
    const response = await axiosAPI.get(`/teachers/${requestData.teacherCode}`);

    dispatch({
      type: actionTypes.CHOOSE_INSTRUCTOR_SUCCESS,
      payload: response.data,
    });

    if (response.data) requestData.toast.success("Chọn GVHD thành công");
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: actionTypes.CHOOSE_INSTRUCTOR_FAILURE,
      payload: errorMessage,
    });
  }
};

export const removeChoosenInstructorAction =
  (requestData) => async (dispatch) => {
    try {
      if (requestData.teacherCode) {
        dispatch({
          type: actionTypes.REMOVE_INSTRUCTOR_SUCCESS,
        });

        requestData.toast.success("Hủy GVHD thành công");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({
        type: actionTypes.CHOOSE_INSTRUCTOR_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const assignInstructorAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.ASSIGN_INSTRUCTOR_REQUEST });

  try {
    const response = await axiosAPI.put(
      `/instructor-leader/assign-students`,
      requestData.assignInstructorData
    );

    dispatch({
      type: actionTypes.ASSIGN_INSTRUCTOR_SUCCESS,
      payload: response.data,
    });

    if (response.data) requestData.navigate("results");
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch({
      type: actionTypes.ASSIGN_INSTRUCTOR_FAILURE,
      payload: errorMessage,
    });
  }
};

export const getAllStudentsHavingInstructorAction =
  (requestData) => async (dispatch) => {
    dispatch({
      type: actionTypes.GET_ALL_STUDENTS_HAVING_INSTRUCTOR_BY_FACULTY_REQUEST,
    });

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

      if (studentPagination?.instructorCode)
        params.append("instructorCode", studentPagination.instructorCode);

      const response = await axiosAPI.get(
        `/instructor-leader/students/having-instructor?${params.toString()}`
      );

      console.log(response.data);

      dispatch({
        type: actionTypes.GET_ALL_STUDENTS_HAVING_INSTRUCTOR_BY_FACULTY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({
        type: actionTypes.GET_ALL_STUDENTS_HAVING_INSTRUCTOR_BY_FACULTY_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const removeInstructorFromStudentAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.REMOVE_INSTRUCTOR_FROM_STUDENT_REQUEST });

    try {
      const response = await axiosAPI.patch(
        "/instructor-leader/remove-instructor",
        requestData.removeInstructorData
      );

      // ++++++ Bỏ dispatch này không cần nữa
      // dispatch({
      //   type: actionTypes.REMOVE_INSTRUCTOR_FROM_STUDENT_SUCCESS,
      //   payload: response.data,
      // });

      console.log(response.data);

      if (response.data) {
        const requestGetAllStudentsData = {};

        requestData.dispatch(
          getAllStudentsHavingInstructorAction(requestGetAllStudentsData)
        );

        requestData.toast.success("Hủy bỏ GVHD thành công");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({
        type: actionTypes.REMOVE_INSTRUCTOR_FROM_STUDENT_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const changeInstructorOfStudentAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.CHANGE_INSTRUCTOR_OF_STUDENT_REQUEST });

    try {
      const response = await axiosAPI.patch(
        "/instructor-leader/change-instructor",
        requestData.changeInstructorData
      );

      dispatch({
        type: actionTypes.CHANGE_INSTRUCTOR_OF_STUDENT_SUCCESS,
        payload: response.data,
      });

      if (response.data) requestData.toast.success("Thay đổi GVHD thành công");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({
        type: actionTypes.CHANGE_INSTRUCTOR_OF_STUDENT_FAILURE,
        payload: errorMessage,
      });
    }
  };
