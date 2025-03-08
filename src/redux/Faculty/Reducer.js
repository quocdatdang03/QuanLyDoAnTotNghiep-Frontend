import * as actionTypes from "./ActionType";

const initialState = {
  faculties: [],
  faculty: null,
  isLoading: false,
  error: null,
  success: null,
};

const facultyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_FACULTY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };

    case actionTypes.GET_ALL_FACULTY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        faculties: action.payload,
        error: null,
      };

    case actionTypes.GET_ALL_FACULTY_FAILURE:
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

export default facultyReducer;
