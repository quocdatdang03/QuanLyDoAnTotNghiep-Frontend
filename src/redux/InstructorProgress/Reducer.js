import * as actionTypes from "./ActionType";

const initialState = {
  progressReports: null,
  progressReport: null,
  progressReview: null,
  project: null,
  stages: null,
  isLoading: false,
  error: null,
  success: null,
};

const instructorProgressReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PROJECT_BY_PROJECTID_REQUEST:
    case actionTypes.GET_ALL_STAGES_BY_PROJECT_REQUEST:
    case actionTypes.GET_ALL_PROGRESSREPORTS_BY_PROJECT_REQUEST:
    case actionTypes.GET_PROGRESS_REPORT_BY_ID_REQUEST:
    case actionTypes.GET_PROGRESS_REVIEW_BY_ID_REQUEST:
    case actionTypes.CREATE_PROGRESS_REVIEW_REQUEST:
    case actionTypes.UPDATE_PROGRESS_REVIEW_REQUEST:
    case actionTypes.DELETE_PROGRESS_REVIEW_FILE_BY_ID_REQUEST:
    case actionTypes.DELETE_PROGRESS_REVIEW_BY_ID_REQUEST:
      return {
        ...state,
        isLoading: false,
        error: null,
        success: null,
      };

    case actionTypes.GET_PROJECT_BY_PROJECTID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        project: action.payload,
        error: null,
      };

    case actionTypes.GET_ALL_STAGES_BY_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stages: action.payload,
        error: null,
      };

    case actionTypes.GET_ALL_PROGRESSREPORTS_BY_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        progressReports: action.payload,
        error: null,
      };

    case actionTypes.GET_PROGRESS_REPORT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        progressReport: action.payload,
        error: null,
      };

    case actionTypes.GET_PROGRESS_REVIEW_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        progressReview: action.payload,
        error: null,
      };

    case actionTypes.DELETE_PROGRESS_REVIEW_FILE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        progressReports: state.progressReports.map((progressReport) => {
          return {
            ...progressReport,
            progressReviews: progressReport.progressReviews.map(
              (progressReview) => {
                return {
                  ...progressReview,
                  progressReviewFiles:
                    progressReview.progressReviewFiles.filter(
                      (item) => item.progressReviewFileId !== action.payload
                    ),
                };
              }
            ),
          };
        }),
      };

    case actionTypes.DELETE_PROGRESS_REVIEW_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        progressReports: state.progressReports.map((progressReport) => {
          return {
            ...progressReport,
            progressReviews: progressReport.progressReviews.filter(
              (item) => item.progressReviewId !== action.payload
            ),
          };
        }),
      };

    case actionTypes.GET_ALL_STAGES_BY_PROJECT_FAILURE:
    case actionTypes.GET_PROJECT_BY_PROJECTID_FAILURE:
    case actionTypes.GET_PROGRESS_REVIEW_BY_ID_FAILURE:
    case actionTypes.GET_ALL_PROGRESSREPORTS_BY_PROJECT_FAILURE:
    case actionTypes.CREATE_PROGRESS_REVIEW_FAILURE:
    case actionTypes.UPDATE_PROGRESS_REVIEW_FAILURE:
    case actionTypes.GET_PROGRESS_REPORT_BY_ID_FAILURE:
    case actionTypes.DELETE_PROGRESS_REVIEW_FILE_BY_ID_FAILURE:
    case actionTypes.DELETE_PROGRESS_REVIEW_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default instructorProgressReducer;
