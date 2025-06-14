import { axiosAPI } from "../../config/api";
import * as actionTypes from "./ActionType";

export const getAllProjectsByInstructorAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_ALL_PROJECTS_BY_INSTRUCTOR_REQUEST });

    try {
      const { keyword, projectPagination } = requestData;
      const params = new URLSearchParams();

      params.append("keyword", keyword);

      if (projectPagination?.pageNumber)
        params.append("pageNumber", projectPagination.pageNumber);

      if (projectPagination?.pageSize)
        params.append("pageSize", projectPagination.pageSize);

      if (projectPagination?.sortBy)
        params.append("sortBy", projectPagination.sortBy);

      if (projectPagination?.sortDir)
        params.append("sortDir", projectPagination.sortDir);

      if (projectPagination?.semesterId)
        params.append("semesterId", projectPagination.semesterId);

      if (projectPagination?.classId)
        params.append("classId", projectPagination.classId);

      const response = await axiosAPI.get(
        `/instructor/projects?${params.toString()}`
      );
      console.log(response.data);

      dispatch({
        type: actionTypes.GET_ALL_PROJECTS_BY_INSTRUCTOR_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.log(error);
      dispatch({
        type: actionTypes.GET_ALL_PROJECTS_BY_INSTRUCTOR_FAILURE,
        payload: errorMessage,
      });
    }
  };

export const getProjectByStudentCodeAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_PROJECT_BY_STUDENTCODE_REQUEST });

    try {
      const response = await axiosAPI.get(
        `/instructor/projects/student/${requestData.studentCode}?semesterId=${requestData.semesterIdOfProject}`
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

export const approveProjectAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.APPROVE_PROJECT_REQUEST });

  try {
    const response = await axiosAPI.patch(
      `/instructor/projects/${requestData.projectId}/approve`
    );

    console.log(response.data);

    dispatch({
      type: actionTypes.APPROVE_PROJECT_SUCCESS,
      payload: response.data,
    });

    if (response.data) requestData.toast.success("Phê duyệt đề tài thành công");
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.APPROVE_PROJECT_FAILURE,
      payload: errorMessage,
    });
  }
};

export const declineProjectAction = (requestData) => async (dispatch) => {
  dispatch({ type: actionTypes.DECLINE_PROJECT_REQUEST });

  try {
    const response = await axiosAPI.patch(
      `/instructor/projects/${requestData.projectId}/decline`
    );

    console.log(response.data);

    dispatch({
      type: actionTypes.DECLINE_PROJECT_SUCCESS,
      payload: response.data,
    });

    if (response.data) requestData.toast.success("Phê duyệt đề tài thành công");
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    dispatch({
      type: actionTypes.DECLINE_PROJECT_FAILURE,
      payload: errorMessage,
    });
  }
};

export const applyAllStagesToProjectAction =
  (requestData, toast) => async (dispatch) => {
    dispatch({ type: actionTypes.APPLY_ALL_STAGES_TO_PROJECT_REQUEST });

    try {
      const params = new URLSearchParams();
      params.append("semesterId", requestData.semesterId);
      params.append("projectId", requestData.projectId);

      const response = await axiosAPI.post(
        `/instructor/stages/project/apply?${params.toString()}`
      );

      if (response.data) {
        toast.success("Thêm các giai đoạn vào đề tài của sinh viên thành công");

        // load all projects by instructor after applying stages
        const requestProjectData = {
          keyword: "",
          projectPagination: {
            semesterId: "",
            classId: "",
            pageNumber: 1,
            pageSize: 5,
            sortDir: "asc",
            sortBy: "studentSemester.student.account.fullName",
          },
        };
        dispatch(getAllProjectsByInstructorAction(requestProjectData));
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;

      dispatch({
        type: actionTypes.APPLY_ALL_STAGES_TO_PROJECT_FAILURE,
        payload: errorMessage,
      });
    }
  };
