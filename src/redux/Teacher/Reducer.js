import * as actionTypes from "./ActionType";

const initialState = {
  teacherPagination: null,
  studentsOfInstructorPagination: null,
  teacher: null,
  classes: null,
  error: null,
  success: null,
  isLoading: false,
};

const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_STUDENTS_BY_INSTRUCTOR_REQUEST:
    case actionTypes.GET_ALL_CLASSES_BY_FACULTY_OF_TEACHER_REQUEST:
    case actionTypes.GET_ALL_TEACHERS_REQUEST:
    case actionTypes.GET_TEACHER_BY_CODE_REQUEST:
    case actionTypes.UPDATE_TEACHER_REQUEST:
    case actionTypes.UPDATE_ENABLE_STATUS_OF_TEACHER_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: null,
        error: null,
      };

    case actionTypes.GET_ALL_STUDENTS_BY_INSTRUCTOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        studentsOfInstructorPagination: action.payload,
        error: null,
      };

    case actionTypes.GET_ALL_CLASSES_BY_FACULTY_OF_TEACHER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        classes: action.payload,
        error: null,
      };

    case actionTypes.GET_ALL_TEACHERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        teacherPagination: action.payload,
        error: null,
      };

    case actionTypes.GET_TEACHER_BY_CODE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        teacher: action.payload,
        error: null,
      };

    case actionTypes.UPDATE_ENABLE_STATUS_OF_TEACHER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        teacherPagination: {
          ...state.teacherPagination,
          content: state.teacherPagination.content.map((item) =>
            item.teacherCode === action.payload.teacherCode
              ? action.payload
              : item
          ),
        },
        error: null,
      };

    case actionTypes.GET_ALL_STUDENTS_BY_INSTRUCTOR_FAILURE:
    case actionTypes.GET_ALL_CLASSES_BY_FACULTY_OF_TEACHER_FAILURE:
    case actionTypes.GET_ALL_TEACHERS_FAILURE:
    case actionTypes.GET_TEACHER_BY_CODE_FAILURE:
    case actionTypes.UPDATE_TEACHER_FAILURE:
    case actionTypes.UPDATE_ENABLE_STATUS_OF_TEACHER_FAILURE:
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

export default teacherReducer;
