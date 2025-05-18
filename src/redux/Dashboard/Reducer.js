import * as actionTypes from "./ActionType";

const initialState = {
  studentNumber: 0,
  teacherNumber: 0,
  studentSemesterNumber: 0,
  registeredProjectStudentNumber: 0,
  isLoading: false,
  error: null,
  success: null,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COUNT_ALL_STUDENTS_REQUEST:
    case actionTypes.COUNT_ALL_TEACHERS_REQUEST:
    case actionTypes.COUNT_ALL_STUDENT_SEMESTERS_REQUEST:
    case actionTypes.COUNT_ALL_REGISTERED_PROJECT_STUDENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };

    case actionTypes.COUNT_ALL_STUDENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        studentNumber: action.payload,
        error: null,
      };

    case actionTypes.COUNT_ALL_TEACHERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        teacherNumber: action.payload,
        error: null,
      };

    case actionTypes.COUNT_ALL_STUDENT_SEMESTERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        studentSemesterNumber: action.payload,
        error: null,
      };

    case actionTypes.COUNT_ALL_REGISTERED_PROJECT_STUDENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        registeredProjectStudentNumber: action.payload,
        error: null,
      };

    case actionTypes.COUNT_ALL_STUDENTS_FAILURE:
    case actionTypes.COUNT_ALL_TEACHERS_FAILURE:
    case actionTypes.COUNT_ALL_STUDENT_SEMESTERS_FAILURE:
    case actionTypes.COUNT_ALL_REGISTERED_PROJECT_STUDENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: null,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
