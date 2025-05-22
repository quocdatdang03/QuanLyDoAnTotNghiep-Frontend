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

  loading: {
    students: false,
    instructors: false,
    classes: false,
    assign: false,
    projects: false,
  },
};

const teacherLeaderReducer = (state = initialState, action) => {
  switch (action.type) {
    // ===== STUDENTS WITHOUT INSTRUCTOR =====
    case actionTypes.GET_ALL_STUDENTS_WITHOUT_INSTRUCTOR_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, students: true },
        error: null,
        success: null,
      };
    case actionTypes.GET_ALL_STUDENTS_WITHOUT_INSTRUCTOR_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, students: false },
        studentPagination: action.payload,
      };
    case actionTypes.GET_ALL_STUDENTS_WITHOUT_INSTRUCTOR_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, students: false },
        error: action.payload,
      };

    // ===== INSTRUCTORS =====
    case actionTypes.GET_ALL_INSTRUCTOS_BY_FACULTY_OF_TEACHER_LEADER_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, instructors: true },
        error: null,
      };
    case actionTypes.GET_ALL_INSTRUCTOS_BY_FACULTY_OF_TEACHER_LEADER_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, instructors: false },
        instructors: action.payload,
      };
    case actionTypes.GET_ALL_INSTRUCTOS_BY_FACULTY_OF_TEACHER_LEADER_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, instructors: false },
        error: action.payload,
      };

    // ===== CLASSES =====
    case actionTypes.GET_ALL_CLASSES_BY_FACULTY_OF_TEACHER_LEADER_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, classes: true },
        error: null,
      };
    case actionTypes.GET_ALL_CLASSES_BY_FACULTY_OF_TEACHER_LEADER_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, classes: false },
        classes: action.payload,
      };
    case actionTypes.GET_ALL_CLASSES_BY_FACULTY_OF_TEACHER_LEADER_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, classes: false },
        error: action.payload,
      };

    // ===== ASSIGN INSTRUCTOR TO STUDENTS =====
    case actionTypes.ASSIGN_INSTRUCTOR_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, assign: true },
        error: null,
        success: null,
      };
    case actionTypes.ASSIGN_INSTRUCTOR_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, assign: false },
        success: action.payload,
        choosenInstructor: null,
        choosenStudents: [],
      };
    case actionTypes.ASSIGN_INSTRUCTOR_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, assign: false },
        error: action.payload,
      };

    // ===== CHOOSE/REMOVE STUDENTS TEMPORARILY =====
    case actionTypes.CHOOSE_STUDENT_SUCCESS:
      return {
        ...state,
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
        choosenStudents: state.choosenStudents.filter(
          (item) => item.studentCode !== action.payload
        ),
      };

    // ===== CHOOSE/REMOVE INSTRUCTOR TEMPORARILY =====
    case actionTypes.CHOOSE_INSTRUCTOR_SUCCESS:
      return {
        ...state,
        choosenInstructor: action.payload,
      };
    case actionTypes.REMOVE_INSTRUCTOR_SUCCESS:
      return {
        ...state,
        choosenInstructor: null,
      };

    // ===== STUDENTS HAVING INSTRUCTORS =====
    case actionTypes.GET_ALL_STUDENTS_HAVING_INSTRUCTOR_BY_FACULTY_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, students: true },
        error: null,
      };
    case actionTypes.GET_ALL_STUDENTS_HAVING_INSTRUCTOR_BY_FACULTY_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, students: false },
        studentHavingInstructorPagination: action.payload,
      };
    case actionTypes.GET_ALL_STUDENTS_HAVING_INSTRUCTOR_BY_FACULTY_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, students: false },
        error: action.payload,
      };

    case actionTypes.CHANGE_INSTRUCTOR_OF_STUDENT_SUCCESS:
      return {
        ...state,
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

    // ===== PROJECTS =====
    case actionTypes.GET_ALL_PROJECTS_REQUEST:
    case actionTypes.GET_ALL_PROJECTS_FOR_EXPORT_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, projects: true },
        error: null,
      };
    case actionTypes.GET_ALL_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, projects: false },
        projectSummaryPagination: action.payload,
      };
    case actionTypes.GET_ALL_PROJECTS_FOR_EXPORT_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, projects: false },
        projectsForExport: action.payload,
      };
    case actionTypes.GET_ALL_PROJECTS_FAILURE:
    case actionTypes.GET_ALL_PROJECTS_FOR_EXPORT_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, projects: false },
        error: action.payload,
      };

    // ===== DEFAULT =====
    default:
      return state;
  }
};

export default teacherLeaderReducer;
