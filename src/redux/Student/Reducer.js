import { isStudentPresentInList } from "../../config/logic";
import * as actionTypes from "./ActionType";

const initialState = {
  studentPagination: null,
  studentAccountPagination: null,
  studentNotEnrolledInCurrentSemesterPagination: null,
  choosenStudents: [],
  student: null,
  instructor: null,
  error: null,
  success: null,
  isLoading: false,
  isStudentAccountLoading: false,
  isRegisteredStudentLoading: false,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_STUDENT_BY_STUDENTCODE_REQUEST:
    case actionTypes.GET_INSTRUCTOR_BY_STUDENTID_IN_CURRENT_SEMESTER_REQUEST:
    case actionTypes.UPDATE_ENABLE_STATUS_REQUEST:
    case actionTypes.CREATE_STUDENT_ACCOUNT_REQUEST:
    case actionTypes.GET_ALL_STUDENTS_NOT_ENROLLED_IN_CURRENT_SEMESTER_REQUEST:
    case actionTypes.CHOOSE_STUDENT_REQUEST:
    case actionTypes.REMOVE_STUDENT_FROM_TEMPORARY_LIST_REQUEST:
    case actionTypes.ADD_STUDENT_TO_CURRENT_SEMESTER_REQUEST:
    case actionTypes.DELETE_STUDENT_IN_CURRENT_SEMESTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: null,
        error: null,
      };

    case actionTypes.GET_ALL_STUDENTS_ACCOUNT_REQUEST:
      return {
        ...state,
        isStudentAccountLoading: true,
        success: null,
        error: null,
      };

    case actionTypes.FILTER_ALL_STUDENTS_REQUEST:
      return {
        ...state,
        isRegisteredStudentLoading: true,
        success: null,
        error: null,
      };

    case actionTypes.GET_STUDENT_BY_STUDENTCODE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        student: action.payload,
        error: null,
      };

    case actionTypes.FILTER_ALL_STUDENTS_SUCCESS:
      return {
        ...state,
        isRegisteredStudentLoading: false,
        studentPagination: action.payload,
        error: null,
      };

    case actionTypes.GET_INSTRUCTOR_BY_STUDENTID_IN_CURRENT_SEMESTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        instructor: action.payload,
        error: null,
      };

    case actionTypes.UPDATE_ENABLE_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        studentAccountPagination: {
          ...state.studentAccountPagination,
          content: state.studentAccountPagination.content.map((item) =>
            item.studentCode === action.payload.studentCode
              ? action.payload
              : item
          ),
        },
        error: null,
      };

    case actionTypes.GET_ALL_STUDENTS_ACCOUNT_SUCCESS:
      return {
        ...state,
        isStudentAccountLoading: false,
        studentAccountPagination: action.payload,
        error: null,
      };

    case actionTypes.GET_ALL_STUDENTS_NOT_ENROLLED_IN_CURRENT_SEMESTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        studentNotEnrolledInCurrentSemesterPagination: action.payload,
        error: null,
      };

    case actionTypes.CHOOSE_STUDENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        choosenStudents: isStudentPresentInList(
          action.payload,
          state.choosenStudents
        )
          ? state.choosenStudents
          : [...state.choosenStudents, action.payload],
        error: null,
      };

    case actionTypes.REMOVE_STUDENT_FROM_TEMPORARY_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        choosenStudents: state.choosenStudents.filter(
          (item) => item.studentCode !== action.payload
        ),
        error: null,
      };

    case actionTypes.ADD_STUDENT_TO_CURRENT_SEMESTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        choosenStudents: [],
        error: null,
      };

    case actionTypes.GET_STUDENT_BY_STUDENTCODE_FAILURE:
    case actionTypes.GET_INSTRUCTOR_BY_STUDENTID_IN_CURRENT_SEMESTER_FAILURE:
    case actionTypes.UPDATE_ENABLE_STATUS_FAILURE:
    case actionTypes.CREATE_STUDENT_ACCOUNT_FAILURE:
    case actionTypes.GET_ALL_STUDENTS_NOT_ENROLLED_IN_CURRENT_SEMESTER_FAILURE:
    case actionTypes.CHOOSE_STUDENT_FAILURE:
    case actionTypes.REMOVE_STUDENT_FROM_TEMPORARY_LIST_FAILURE:
    case actionTypes.ADD_STUDENT_TO_CURRENT_SEMESTER_FAILURE:
    case actionTypes.DELETE_STUDENT_IN_CURRENT_SEMESTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        success: null,
        error: action.payload,
      };

    case actionTypes.GET_ALL_STUDENTS_ACCOUNT_FAILURE:
      return {
        ...state,
        isStudentAccountLoading: false,
        success: null,
        error: action.payload,
      };

    case actionTypes.FILTER_ALL_STUDENTS_FAILURE:
      return {
        ...state,
        isRegisteredStudentLoading: false,
        success: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default studentReducer;
