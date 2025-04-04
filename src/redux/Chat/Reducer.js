import * as actionTypes from "./ActionType";

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
  success: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CHAT_MESSAGES_BY_PROJECT_ID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.GET_CHAT_MESSAGES_BY_PROJECT_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        messages: action.payload,
      };

    case actionTypes.GET_CHAT_MESSAGES_BY_PROJECT_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default chatReducer;
