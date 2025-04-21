import { axiosAPI } from "../../config/api";
import * as actionTypes from "./ActionType";

export const getStudentByStudentCodeAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_STUDENT_BY_STUDENTCODE_REQUEST });

    try {
      const response = await axiosAPI.get(
        `/students/${requestData.studentCode}`
      );

      console.log(response.data);

      dispatch({
        type: actionTypes.GET_STUDENT_BY_STUDENTCODE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.log(errorMessage);

      dispatch({
        type: actionTypes.GET_STUDENT_BY_STUDENTCODE_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const getAllStudentsByFacultyAndKeyword =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_STUDENTS_BY_FACULTY_AND_KEYWORD_REQUEST });

    try {
      const { keyword, studentPagination } = requestData;
      const params = new URLSearchParams();

      params.append("keyword", keyword);

      if (studentPagination?.pageNumber)
        params.append("pageNumber", studentPagination.pageNumber);

      if (studentPagination?.pageSize)
        params.append("pageSize", studentPagination.pageSize);

      if (studentPagination?.sortBy)
        params.append("sortBy", studentPagination.sortBy);

      if (studentPagination?.sortDir)
        params.append("sortDir", studentPagination.sortDir);

      const response = await axiosAPI.get(
        `/students/faculty/search?${params.toString()}`
      );
      console.log(response.data);

      dispatch({
        type: actionTypes.GET_STUDENTS_BY_FACULTY_AND_KEYWORD_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.log(error);
      dispatch({
        type: actionTypes.GET_STUDENTS_BY_FACULTY_AND_KEYWORD_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const filterAllStudentsAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.FILTER_ALL_STUDENTS_REQUEST });

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

    if (studentPagination?.semesterId)
      params.append("semesterId", studentPagination.semesterId);

    if (studentPagination?.classId)
      params.append("classId", studentPagination.classId);

    if (studentPagination?.facultyId)
      params.append("facultyId", studentPagination.facultyId);

    const response = await axiosAPI.get(
      `/admin/students/filter?${params.toString()}`
    );
    console.log(response.data);

    dispatch({
      type: actionTypes.FILTER_ALL_STUDENTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.log(error);
    dispatch({
      type: actionTypes.FILTER_ALL_STUDENTS_FAILURE,
      payload: errorMessage,
    });
  }
};

export const getInstructorByStudentIdAction =
  (requestData) => async (dispatch) => {
    dispatch({
      type: actionTypes.GET_INSTRUCTOR_BY_STUDENTID_IN_CURRENT_SEMESTER_REQUEST,
    });

    try {
      const response = await axiosAPI.get(
        `/students/${requestData.studentId}/instructor`
      );

      dispatch({
        type: actionTypes.GET_INSTRUCTOR_BY_STUDENTID_IN_CURRENT_SEMESTER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.log(error);
      dispatch({
        type: actionTypes.GET_INSTRUCTOR_BY_STUDENTID_IN_CURRENT_SEMESTER_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const updateEnableStatusOfStudentAction =
  (requestData) => async (dispatch) => {
    dispatch({
      type: actionTypes.UPDATE_ENABLE_STATUS_REQUEST,
    });

    try {
      const response = await axiosAPI.patch(
        `/admin/students/enableStatus`,
        requestData
      );

      dispatch({
        type: actionTypes.UPDATE_ENABLE_STATUS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.log(error);
      dispatch({
        type: actionTypes.UPDATE_ENABLE_STATUS_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const getAllStudentsAccountAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_ALL_STUDENTS_ACCOUNT_REQUEST });

    try {
      const { keyword, studentAccountPagination } = requestData;
      const params = new URLSearchParams();

      if (keyword) params.append("keyword", keyword.trim());

      if (studentAccountPagination?.pageNumber)
        params.append("pageNumber", studentAccountPagination.pageNumber);

      if (studentAccountPagination?.pageSize)
        params.append("pageSize", studentAccountPagination.pageSize);

      if (studentAccountPagination?.sortBy)
        params.append("sortBy", studentAccountPagination.sortBy);

      if (studentAccountPagination?.sortDir)
        params.append("sortDir", studentAccountPagination.sortDir);

      if (studentAccountPagination?.classId)
        params.append("classId", studentAccountPagination.classId);

      if (studentAccountPagination?.facultyId)
        params.append("facultyId", studentAccountPagination.facultyId);

      const response = await axiosAPI.get(
        `/admin/students?${params.toString()}`
      );
      console.log(response.data);

      dispatch({
        type: actionTypes.GET_ALL_STUDENTS_ACCOUNT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.log(error);
      dispatch({
        type: actionTypes.GET_ALL_STUDENTS_ACCOUNT_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const createStudentAccountAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.CREATE_STUDENT_ACCOUNT_REQUEST });

  try {
    const response = await axiosAPI.post(
      `/admin/accounts/student`,
      requestData.studentData
    );
    console.log(response.data);

    if (response.data) {
      requestData.toast.success("Tạo tài khoản sinh viên thành công");
      requestData.navigate("/admin/manage-student");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.CREATE_STUDENT_ACCOUNT_FAILURE,
      payload: errorMessage,
    });

    if (errorMessage) requestData.toast.error(errorMessage);
  }
};

export const updateStudentAccountAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_STUDENT_ACCOUNT_REQUEST });

  try {
    const response = await axiosAPI.put(
      `/admin/accounts/student/${requestData.studentId}`,
      requestData.studentData
    );
    console.log(response.data);

    if (response.data) {
      requestData.toast.success("Cập nhật tài khoản sinh viên thành công");
      requestData.navigate("/admin/manage-student");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.UPDATE_STUDENT_ACCOUNT_FAILURE,
      payload: errorMessage,
    });

    if (errorMessage) requestData.toast.error(errorMessage);
  }
};

// START METHODS FOR MANAGING REGISTERED STUDENT
export const getAllStudentsNotEnrolledInCurrentSemesterAction =
  (requestData) => async (dispatch) => {
    dispatch({
      type: actionTypes.GET_ALL_STUDENTS_NOT_ENROLLED_IN_CURRENT_SEMESTER_REQUEST,
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

      if (studentPagination?.facultyId)
        params.append("facultyId", studentPagination.facultyId);

      const response = await axiosAPI.get(
        `/admin/students/not-enrolled?${params.toString()}`
      );
      console.log(response.data);

      dispatch({
        type: actionTypes.GET_ALL_STUDENTS_NOT_ENROLLED_IN_CURRENT_SEMESTER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.log(error);
      dispatch({
        type: actionTypes.GET_ALL_STUDENTS_NOT_ENROLLED_IN_CURRENT_SEMESTER_FAILURE,
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
  (requestData) => async (dispatch) => {
    try {
      dispatch({
        type: actionTypes.REMOVE_STUDENT_FROM_TEMPORARY_LIST_SUCCESS,
        payload: requestData.studentCode,
      });

      requestData.toast.success("Xóa sinh viên khỏi danh sách tạm thành công");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({
        type: actionTypes.REMOVE_STUDENT_FROM_TEMPORARY_LIST_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const addStudentToCurrentSemesterAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.ADD_STUDENT_TO_CURRENT_SEMESTER_REQUEST });
    try {
      const response = await axiosAPI.post(
        `/admin/students/studentSemester`,
        requestData.data
      );

      dispatch({
        type: actionTypes.ADD_STUDENT_TO_CURRENT_SEMESTER_SUCCESS,
      });

      if (response.data) {
        requestData.toast.success(
          "Thêm sinh viên vào học kỳ ĐATN hiện tại thành công"
        );
        requestData.navigate("/admin/manage-registerStudent");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({
        type: actionTypes.ADD_STUDENT_TO_CURRENT_SEMESTER_FAILURE,
        payload: errorMessage,
      });

      if (errorMessage)
        requestData.toast.error(
          "Xảy ra lỗi trong quá trình thêm sinh viên vào học kỳ ĐATN hiện tại"
        );
    }
  };

export const deleteStudentInCurrentSemesterAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.DELETE_STUDENT_IN_CURRENT_SEMESTER_REQUEST });
    try {
      const params = new URLSearchParams();

      params.append("studentId", requestData.studentId);
      params.append("semesterId", requestData.semesterId);

      const response = await axiosAPI.delete(
        `/admin/students/studentSemester?${params.toString()}`
      );

      if (response.data) {
        requestData.toast.success(
          "Xóa sinh viên ra khỏi học kỳ ĐATN hiện tại thành công"
        );

        dispatch(filterAllStudentsAction({}));
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({
        type: actionTypes.DELETE_STUDENT_IN_CURRENT_SEMESTER_FAILURE,
        payload: errorMessage,
      });

      if (errorMessage)
        requestData.toast.error(
          "Xảy ra lỗi trong quá trình xóa sinh viên ra khỏi học kỳ ĐATN hiện tại"
        );
    }
  };

// END METHODS FOR MANAGING REGISTERED STUDENT
