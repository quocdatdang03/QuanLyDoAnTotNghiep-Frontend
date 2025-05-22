import * as actionTypes from "./ActionType";

const initialState = {
  projectPagination: null,
  project: null,
  isLoading: false,
  isProjectLoading: false,
  error: null,
  success: null,
};

const instructorProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PROJECT_BY_STUDENTCODE_REQUEST:
    case actionTypes.APPROVE_PROJECT_REQUEST:
    case actionTypes.DECLINE_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };

    case actionTypes.GET_ALL_PROJECTS_BY_INSTRUCTOR_REQUEST:
      return {
        ...state,
        isProjectLoading: true,
        error: null,
        success: null,
      };

    case actionTypes.GET_ALL_PROJECTS_BY_INSTRUCTOR_SUCCESS:
      return {
        ...state,
        isProjectLoading: false,
        projectPagination: action.payload,
        error: null,
      };

    case actionTypes.GET_PROJECT_BY_STUDENTCODE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        project: action.payload,
        error: null,
      };

    case actionTypes.APPROVE_PROJECT_SUCCESS:
    case actionTypes.DECLINE_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projectPagination: {
          ...state.projectPagination,
          content: state.projectPagination.content.map((item) =>
            item.projectId === action.payload.projectId ? action.payload : item
          ),
        },
      };

    case actionTypes.GET_PROJECT_BY_STUDENTCODE_FAILURE:
    case actionTypes.APPROVE_PROJECT_FAILURE:
    case actionTypes.DECLINE_PROJECT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case actionTypes.GET_ALL_PROJECTS_BY_INSTRUCTOR_FAILURE:
      return {
        ...state,
        isProjectLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default instructorProjectReducer;
