import { isPresentInChoosenStudentsList } from "../../config/logic";
import * as actionTypes from "./ActionType";

const initialState = {
  studentPagination: null,
  choosenStudents: [],
  classes: null,
  instructors: null,
  choosenInstructor: null,
  error: null,
  success: null,
  isLoading: false,
};

const teacherLeaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_STUDENTS_WITHOUT_INSTRUCTOR_REQUEST:
    case actionTypes.GET_ALL_CLASSES_BY_FACULTY_OF_TEACHER_LEADER_REQUEST:
    case actionTypes.CHOOSE_STUDENT_REQUEST:
    case actionTypes.CHOOSE_INSTRUCTOR_REQUEST:
    case actionTypes.REMOVE_STUDENT_FROM_TEMPORARY_LIST_REQUEST:
    case actionTypes.GET_ALL_INSTRUCTOS_BY_FACULTY_OF_TEACHER_LEADER_REQUEST:
    case actionTypes.REMOVE_INSTRUCTOR_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: null,
        error: null,
      };

    case actionTypes.GET_ALL_STUDENTS_WITHOUT_INSTRUCTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        studentPagination: action.payload,
        error: null,
      };

    case actionTypes.GET_ALL_CLASSES_BY_FACULTY_OF_TEACHER_LEADER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        classes: action.payload,
        error: null,
      };

    case actionTypes.CHOOSE_STUDENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        choosenStudents: isPresentInChoosenStudentsList(
          action.payload,
          state.choosenStudents
        )
          ? state.choosenStudents
          : [...state.choosenStudents, action.payload],
      };

    case actionTypes.REMOVE_STUDENT_FROM_TEMPORARY_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        choosenStudents: state.choosenStudents.filter(
          (item) => item.studentCode !== action.payload
        ),
      };

    case actionTypes.GET_ALL_INSTRUCTOS_BY_FACULTY_OF_TEACHER_LEADER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        instructors: action.payload,
        error: null,
      };

    case actionTypes.CHOOSE_INSTRUCTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        choosenInstructor: action.payload,
        error: null,
      };

    case actionTypes.REMOVE_INSTRUCTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        choosenInstructor: null,
        error: null,
      };

    case actionTypes.GET_ALL_STUDENTS_WITHOUT_INSTRUCTOR_FAILURE:
    case actionTypes.GET_ALL_CLASSES_BY_FACULTY_OF_TEACHER_LEADER_FAILURE:
    case actionTypes.CHOOSE_STUDENT_FAILURE:
    case actionTypes.CHOOSE_INSTRUCTOR_FAILURE:
    case actionTypes.REMOVE_STUDENT_FROM_TEMPORARY_LIST_FAILURE:
    case actionTypes.GET_ALL_INSTRUCTOS_BY_FACULTY_OF_TEACHER_LEADER_FAILURE:
    case actionTypes.REMOVE_INSTRUCTOR_FAILURE:
      return {
        ...state,
        isLoading: false,
        success: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default teacherLeaderReducer;
