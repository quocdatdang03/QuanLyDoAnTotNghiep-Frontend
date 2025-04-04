import * as actionTypes from "./ActionType";

const initialState = {
  progressReports: null,
  progressReport: null,
  stages: null,
  stage: null,
  currentStage: null,
  isLoading: false,
  error: null,
  success: null,
};

const progressReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_STAGES_BY_PROJECT_REQUEST:
    case actionTypes.GET_ALL_PROGRESSREPORTS_BY_PROJECT_REQUEST:
    case actionTypes.GET_STAGE_BY_ID_REQUEST:
    case actionTypes.DELETE_PROGRESSREPORTFILE_BY_ID_REQUEST:
    case actionTypes.GET_PROGRESSREPORT_BY_ID_REQUEST:
    case actionTypes.CREATE_PROGRESSREPORT_REQUEST:
    case actionTypes.UPDATE_PROGRESSREPORT_REQUEST:
    case actionTypes.DELETE_PROGRESSREPORT_REQUEST:
    case actionTypes.GET_CURRENT_STAGE_BY_PROJECT_ID_REQUEST:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: null,
      };

    case actionTypes.GET_ALL_STAGES_BY_PROJECT_SUCCESS:
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

    case actionTypes.GET_ALL_PROGRESSREPORTS_BY_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        progressReports: action.payload,
        error: null,
      };

    case actionTypes.GET_PROGRESSREPORT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        progressReport: action.payload,
        error: null,
      };

    case actionTypes.DELETE_PROGRESSREPORTFILE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        progressReports: state.progressReports.map((item) => {
          return {
            ...item,
            progressReportFiles: item.progressReportFiles.filter(
              (file) => file.progressReportFileId !== action.payload
            ),
          };
        }),
        error: null,
      };

    case actionTypes.DELETE_PROGRESSREPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        progressReports: state.progressReports.filter(
          (item) => item.progressReportId !== action.payload
        ),
        error: null,
      };

    case actionTypes.GET_CURRENT_STAGE_BY_PROJECT_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentStage: action.payload,
        error: null,
      };

    case actionTypes.GET_ALL_STAGES_BY_PROJECT_FAILURE:
    case actionTypes.GET_ALL_PROGRESSREPORTS_BY_PROJECT_FAILURE:
    case actionTypes.GET_STAGE_BY_ID_FAILURE:
    case actionTypes.DELETE_PROGRESSREPORTFILE_BY_ID_FAILURE:
    case actionTypes.GET_PROGRESSREPORT_BY_ID_FAILURE:
    case actionTypes.CREATE_PROGRESSREPORT_FAILURE:
    case actionTypes.UPDATE_PROGRESSREPORT_FAILURE:
    case actionTypes.DELETE_PROGRESSREPORT_FAILURE:
    case actionTypes.GET_CURRENT_STAGE_BY_PROJECT_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default progressReportReducer;
