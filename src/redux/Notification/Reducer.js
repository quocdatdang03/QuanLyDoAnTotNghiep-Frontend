import * as actionTypes from "./ActionType";

const initialState = {
  notifications: [],
  isLoading: false,
  error: null,
  success: null,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_NOTIFICATIONS_BY_TEACHER_AND_SEMESTER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.GET_ALL_NOTIFICATIONS_BY_TEACHER_AND_SEMESTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        notifications: action.payload,
      };

    case actionTypes.GET_ALL_NOTIFICATIONS_BY_TEACHER_AND_SEMESTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default notificationReducer;
