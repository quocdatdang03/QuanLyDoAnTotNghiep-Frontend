import { isStudentPresentInList } from "../../config/logic";
import * as actionTypes from "./ActionType";

const initialState = {
  studentPagination: null,
  studentHavingInstructorPagination: null,
  projectSummaryPagination: null,
  projectsForExport: null,
  choosenStudents: [],
  classes: null,
  instructors: null,
  choosenInstructor: null,
  error: null,
  success: null,
  isLoading: false,
  isStudentsLoading: false,
};

const teacherLeaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_CLASSES_BY_FACULTY_OF_TEACHER_LEADER_REQUEST:
    case actionTypes.CHOOSE_STUDENT_REQUEST:
    case actionTypes.CHOOSE_INSTRUCTOR_REQUEST:
    case actionTypes.REMOVE_STUDENT_FROM_TEMPORARY_LIST_REQUEST:
    case actionTypes.GET_ALL_INSTRUCTOS_BY_FACULTY_OF_TEACHER_LEADER_REQUEST:
    case actionTypes.REMOVE_INSTRUCTOR_REQUEST:
    case actionTypes.ASSIGN_INSTRUCTOR_REQUEST:
    case actionTypes.GET_ALL_STUDENTS_HAVING_INSTRUCTOR_BY_FACULTY_REQUEST:
    case actionTypes.REMOVE_INSTRUCTOR_FROM_STUDENT_REQUEST:
    case actionTypes.CHANGE_INSTRUCTOR_OF_STUDENT_REQUEST:
    case actionTypes.GET_ALL_PROJECTS_REQUEST:
    case actionTypes.GET_ALL_PROJECTS_FOR_EXPORT_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: null,
        error: null,
      };

    case actionTypes.GET_ALL_STUDENTS_WITHOUT_INSTRUCTOR_REQUEST:
      return {
        ...state,
        isStudentsLoading: true,
        success: null,
        error: null,
      };

    case actionTypes.GET_ALL_STUDENTS_WITHOUT_INSTRUCTOR_SUCCESS:
      return {
        ...state,
        isStudentsLoading: false,
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
        choosenStudents: isStudentPresentInList(
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

    case actionTypes.ASSIGN_INSTRUCTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: action.payload,
        choosenInstructor: null,
        choosenStudents: [],
        error: null,
      };

    case actionTypes.GET_ALL_STUDENTS_HAVING_INSTRUCTOR_BY_FACULTY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        studentHavingInstructorPagination: action.payload,
        error: null,
      };

    // case actionTypes.REMOVE_INSTRUCTOR_FROM_STUDENT_SUCCESS:
    //   return {
    //     ...state,
    //     isLoading: false,

    //     studentHavingInstructorPagination: {
    //       ...state.studentHavingInstructorPagination,
    //       content: state.studentHavingInstructorPagination.content.filter(
    //         (item) => item.studentCode !== action.payload.studentCode
    //       ),
    //     },

    //     error: null,
    //   };

    case actionTypes.CHANGE_INSTRUCTOR_OF_STUDENT_SUCCESS:
      return {
        ...state,
        isLoading: false,

        studentHavingInstructorPagination: {
          ...state.studentHavingInstructorPagination,
          content: state.studentHavingInstructorPagination.content.map(
            (item) =>
              item.studentCode === action.payload.studentCode
                ? action.payload
                : item
          ),
        },
      };

    case actionTypes.GET_ALL_PROJECTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projectSummaryPagination: action.payload,
        error: null,
      };

    case actionTypes.GET_ALL_PROJECTS_FOR_EXPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projectsForExport: action.payload,
        error: null,
      };

    case actionTypes.GET_ALL_CLASSES_BY_FACULTY_OF_TEACHER_LEADER_FAILURE:
    case actionTypes.CHOOSE_STUDENT_FAILURE:
    case actionTypes.CHOOSE_INSTRUCTOR_FAILURE:
    case actionTypes.REMOVE_STUDENT_FROM_TEMPORARY_LIST_FAILURE:
    case actionTypes.GET_ALL_INSTRUCTOS_BY_FACULTY_OF_TEACHER_LEADER_FAILURE:
    case actionTypes.REMOVE_INSTRUCTOR_FAILURE:
    case actionTypes.ASSIGN_INSTRUCTOR_FAILURE:
    case actionTypes.GET_ALL_STUDENTS_HAVING_INSTRUCTOR_BY_FACULTY_FAILURE:
    case actionTypes.REMOVE_INSTRUCTOR_FROM_STUDENT_FAILURE:
    case actionTypes.CHANGE_INSTRUCTOR_OF_STUDENT_FAILURE:
    case actionTypes.GET_ALL_PROJECTS_FAILURE:
    case actionTypes.GET_ALL_PROJECTS_FOR_EXPORT_FAILURE:
      return {
        ...state,
        isLoading: false,
        success: null,
        error: action.payload,
      };

    case actionTypes.GET_ALL_STUDENTS_WITHOUT_INSTRUCTOR_FAILURE:
      return {
        ...state,
        isStudentsLoading: false,
        success: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default teacherLeaderReducer;
