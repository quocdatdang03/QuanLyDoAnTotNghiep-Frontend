import * as actionTypes from "./ActionType";

const initialState = {
  project: null,
  instructor: null,
  isLoading: false,
  error: null,
  success: null,
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_PROJECT_REQUEST:
    case actionTypes.GET_PROJECT_BY_STUDENTCODE_REQUEST:
    case actionTypes.GET_INSTRUCTOR_OF_PROJECT_BY_STUDENTCODE_REQUEST:
    case actionTypes.DELETE_PROJECT_FILE_BY_ID_REQUEST:
    case actionTypes.UPDATE_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: null,
      };

    case actionTypes.CREATE_PROJECT_SUCCESS:
    case actionTypes.GET_PROJECT_BY_STUDENTCODE_SUCCESS:
    case actionTypes.UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        project: action.payload,
        error: null,
      };

    case actionTypes.GET_INSTRUCTOR_OF_PROJECT_BY_STUDENTCODE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        instructor: action.payload,
        error: null,
      };

    case actionTypes.DELETE_PROJECT_FILE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        project: {
          ...state.project,
          projectFiles: state.project.projectFiles.filter(
            (item) => item.projectFileId !== action.payload
          ),
        },
        error: null,
      };

    case actionTypes.CREATE_PROJECT_FAILURE:
    case actionTypes.GET_PROJECT_BY_STUDENTCODE_FAILURE:
    case actionTypes.GET_INSTRUCTOR_OF_PROJECT_BY_STUDENTCODE_FAILURE:
    case actionTypes.DELETE_PROJECT_FILE_BY_ID_FAILURE:
    case actionTypes.UPDATE_PROJECT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default projectReducer;
