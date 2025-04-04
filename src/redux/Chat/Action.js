import { axiosAPI } from "../../config/api";
import * as actionTypes from "./ActionType";

// export const getChatRoomByTeamIdAction = (requestData) => async (dispatch) => {
//   dispatch({ type: actionTypes.GET_CHATROOM_BY_TEAMID_REQUEST });

//   try {
//     const response = await axiosAPI.get(
//       `/chatRooms/team/${requestData.teamId}`
//     );

//     dispatch({
//       type: actionTypes.GET_CHATROOM_BY_TEAMID_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message;
//     dispatch({
//       type: actionTypes.GET_CHATROOM_BY_TEAMID_FAILURE,
//       payload: errorMessage,
//     });
//   }
// };

// export const getChatMessagesByRoomIdAction =
//   (requestData) => async (dispatch) => {
//     dispatch({ type: actionTypes.GET_CHATMESSAGES_BY_TEAMID_REQUEST });

//     try {
//       const response = await axiosAPI.get(
//         `chatMessages/room/${requestData.roomId}`
//       );
//       dispatch({
//         type: actionTypes.GET_CHATMESSAGES_BY_TEAMID_SUCCESS,
//         payload: response.data,
//       });
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || error.message;
//       dispatch({
//         type: actionTypes.GET_CHATMESSAGES_BY_TEAMID_FAILURE,
//         payload: errorMessage,
//       });
//     }
//   };

export const getChatMessagesByProjectIdAction =
  (requestData) => async (dispatch) => {
    dispatch({ type: actionTypes.GET_CHAT_MESSAGES_BY_PROJECT_ID_REQUEST });

    try {
      const response = await axiosAPI.get(
        `chatMessages/project/${requestData.projectId}`
      );
      dispatch({
        type: actionTypes.GET_CHAT_MESSAGES_BY_PROJECT_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      dispatch({
        type: actionTypes.GET_CHAT_MESSAGES_BY_PROJECT_ID_FAILURE,
        payload: errorMessage,
      });
    }
  };
