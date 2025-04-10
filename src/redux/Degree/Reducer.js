import * as actionTypes from "./ActionType";

const initialState = {
  degrees: [],
  isLoading: false,
  error: null,
  success: null,
};

const degreeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_DEGREES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };

    case actionTypes.GET_ALL_DEGREES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        degrees: action.payload,
        error: null,
      };

    case actionTypes.GET_ALL_DEGREES_FAILURE:
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

export default degreeReducer;
