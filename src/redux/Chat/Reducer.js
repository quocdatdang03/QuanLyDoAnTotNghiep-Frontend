import * as actionTypes from "./ActionType";

const initialState = {
  chatRoom: null,
  messages: [],
  isLoading: false,
  error: null,
  success: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CHATROOM_BY_TEAMID_REQUEST:
    case actionTypes.GET_CHATMESSAGES_BY_TEAMID_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.GET_CHATROOM_BY_TEAMID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        chatRoom: action.payload,
      };

    case actionTypes.GET_CHATMESSAGES_BY_TEAMID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        messages: action.payload,
      };

    case actionTypes.GET_CHATROOM_BY_TEAMID_FAILURE:
    case actionTypes.GET_CHATMESSAGES_BY_TEAMID_FAILURE:
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
