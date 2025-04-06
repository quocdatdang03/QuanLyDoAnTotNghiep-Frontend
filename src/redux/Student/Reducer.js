import * as actionTypes from "./ActionType";

const initialState = {
  studentPagination: null,
  instructor: null,
  error: null,
  success: null,
  isLoading: false,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FILTER_ALL_STUDENTS_REQUEST:
    case actionTypes.GET_INSTRUCTOR_BY_STUDENTID_IN_CURRENT_SEMESTER_REQUEST:
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

    case actionTypes.FILTER_ALL_STUDENTS_FAILURE:
    case actionTypes.GET_INSTRUCTOR_BY_STUDENTID_IN_CURRENT_SEMESTER_FAILURE:
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
