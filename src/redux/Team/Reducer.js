import { isPresentInTemporaryTeamMember } from "../../config/logic";
import * as actionTypes from "./ActionType";

const initialValues = {
  teamDetails: null,
  teamId: null,
  temporaryTeamMember: [],
  isLoading: false,
  error: null,
  success: null,
};

export const teamReducer = (state = initialValues, action) => {
  switch (action.type) {
    case actionTypes.ADD_STUDENT_TO_TEAM_REQUEST:
    case actionTypes.CREATE_TEAM_REQUEST:
    case actionTypes.GET_TEAM_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };

    case actionTypes.ADD_STUDENT_TO_TEAM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        temporaryTeamMember: isPresentInTemporaryTeamMember(
          action.payload,
          state.temporaryTeamMember
        )
          ? state.temporaryTeamMember
          : [...state.temporaryTeamMember, action.payload],
        error: null,
      };

    case actionTypes.REMOVE_STUDENT_FROM_TEAM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        temporaryTeamMember: state.temporaryTeamMember.filter(
          (item) => item.studentCode !== action.payload
        ),
        error: null,
      };

    case actionTypes.CREATE_TEAM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        teamId: action.payload.teamId,
        error: null,
      };

    case actionTypes.GET_TEAM_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        teamDetails: action.payload,
        error: null,
      };

    case actionTypes.ADD_STUDENT_TO_TEAM_FAILURE:
    case actionTypes.REMOVE_STUDENT_FROM_TEAM_FAILURE:
    case actionTypes.CREATE_TEAM_FAILURE:
    case actionTypes.GET_TEAM_DETAILS_FAILURE:
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
