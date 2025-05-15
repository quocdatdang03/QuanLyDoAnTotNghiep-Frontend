import * as actionTypes from "./ActionType";

const initialState = {
  classes: [],
  clazz: null,
  isLoading: false,
  error: null,
  success: null,
};

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_CLASSES_REQUEST:
    case actionTypes.GET_ALL_CLASSES_BY_FACULTY_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };

    case actionTypes.GET_ALL_CLASSES_SUCCESS:
    case actionTypes.GET_ALL_CLASSES_BY_FACULTY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        classes: action.payload,
        error: null,
      };

    case actionTypes.GET_ALL_CLASSES_FAILURE:
    case actionTypes.GET_ALL_CLASSES_BY_FACULTY_FAILURE:
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

export default classReducer;
