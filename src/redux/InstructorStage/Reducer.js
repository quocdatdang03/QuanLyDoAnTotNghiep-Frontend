import * as actionTypes from "./ActionType";

const initialState = {
  stages: null,
  stage: null,
  stageStatuses: null,
  isLoading: false,
  error: null,
  success: null,
};

const instructorStageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_STAGE_REQUEST:
    case actionTypes.GET_ALL_STAGES_BY_INSTRUCTOR_AND_SEMESTER_REQUEST:
    case actionTypes.GET_STAGE_BY_ID_REQUEST:
    case actionTypes.DELETE_STAGEFILE_BY_STAGEFILEID_REQUEST:
    case actionTypes.GET_ALL_STAGESTATUSES_REQUEST:
    case actionTypes.UPDATE_STAGESTATUS_REQUEST:
    case actionTypes.UPDATE_STAGE_REQUEST:
    case actionTypes.DELETE_STAGE_REQUEST:
    case actionTypes.UPDATE_STAGEORDER_REQUEST:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: null,
      };

    case actionTypes.GET_ALL_STAGES_BY_INSTRUCTOR_AND_SEMESTER_SUCCESS:
    case actionTypes.UPDATE_STAGEORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stages: action.payload,
        error: null,
      };

    case actionTypes.GET_STAGE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stage: action.payload,
        error: null,
      };

    case actionTypes.CREATE_STAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stages: [...state.stages, action.payload],
        error: null,
      };

    case actionTypes.DELETE_STAGEFILE_BY_STAGEFILEID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stages: state.stages.map((stage) => {
          return {
            ...stage,
            stageFiles: stage.stageFiles.filter(
              (item) => item.stageFileId !== action.payload
            ),
          };
        }),
        error: null,
      };

    case actionTypes.GET_ALL_STAGESTATUSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stageStatuses: action.payload,
        error: null,
      };

    case actionTypes.UPDATE_STAGESTATUS_SUCCESS:
    case actionTypes.UPDATE_STAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stages: state.stages.map((item) =>
          item.stageId === action.payload.stageId ? action.payload : item
        ),
      };

    case actionTypes.DELETE_STAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stages: state.stages.filter((item) => item.stageId !== action.payload),
        error: null,
      };

    case actionTypes.CREATE_STAGE_FAILURE:
    case actionTypes.GET_ALL_STAGES_BY_INSTRUCTOR_AND_SEMESTER_FAILURE:
    case actionTypes.GET_STAGE_BY_ID_FAILURE:
    case actionTypes.DELETE_STAGEFILE_BY_STAGEFILEID_FAILURE:
    case actionTypes.GET_ALL_STAGESTATUSES_FAILURE:
    case actionTypes.UPDATE_STAGESTATUS_FAILURE:
    case actionTypes.UPDATE_STAGE_FAILURE:
    case actionTypes.DELETE_STAGE_FAILURE:
    case actionTypes.UPDATE_STAGEORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default instructorStageReducer;
