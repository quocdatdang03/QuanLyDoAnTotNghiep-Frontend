import * as actionTypes from "./ActionType";

const initialState = {
  studentPagination: null,
  studentAccountPagination: null,
  instructor: null,
  error: null,
  success: null,
  isLoading: false,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FILTER_ALL_STUDENTS_REQUEST:
    case actionTypes.GET_ALL_STUDENTS_ACCOUNT_REQUEST:
    case actionTypes.GET_INSTRUCTOR_BY_STUDENTID_IN_CURRENT_SEMESTER_REQUEST:
    case actionTypes.UPDATE_ENABLE_STATUS_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: null,
        error: null,
      };

    case actionTypes.FILTER_ALL_STUDENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
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
        isLoading: false,
        studentAccountPagination: action.payload,
        error: null,
      };

    case actionTypes.FILTER_ALL_STUDENTS_FAILURE:
    case actionTypes.GET_ALL_STUDENTS_ACCOUNT_FAILURE:
    case actionTypes.GET_INSTRUCTOR_BY_STUDENTID_IN_CURRENT_SEMESTER_FAILURE:
    case actionTypes.UPDATE_ENABLE_STATUS_FAILURE:
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

export default studentReducer;
