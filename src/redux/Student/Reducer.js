import * as actionTypes from "./ActionType";

const initialState = {
  studentPagination: null,
  error: null,
  success: null,
  isLoading: false,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_STUDENTS_BY_FACULTY_AND_KEYWORD_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: null,
        error: null,
      };

    case actionTypes.GET_STUDENTS_BY_FACULTY_AND_KEYWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        studentPagination: action.payload,
        error: null,
      };

    case actionTypes.GET_STUDENTS_BY_FACULTY_AND_KEYWORD_FAILURE:
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
