import * as actionTypes from "./ActionType";

const initialState = {
  schoolYearPagination: null,
  schoolYears: null,
  schoolYear: null,
  isLoading: false,
  isSchoolYearLoading: false,
  success: null,
  error: null,
};

const schoolYearReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_SCHOOL_YEAR_REQUEST:
    case actionTypes.CREATE_SCHOOL_YEAR_REQUEST:
    case actionTypes.DELETE_SCHOOL_YEAR_REQUEST:
    case actionTypes.GET_SCHOOL_YEAR_BY_ID_REQUEST:
    case actionTypes.UPDATE_SCHOOL_YEAR_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: null,
        error: null,
      };

    case actionTypes.GET_ALL_SCHOOL_YEAR_BY_PAGINATION_REQUEST:
      return {
        ...state,
        isSchoolYearLoading: true,
        success: null,
        error: null,
      };

    case actionTypes.GET_ALL_SCHOOL_YEAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        schoolYears: action.payload,
        error: null,
      };

    case actionTypes.GET_ALL_SCHOOL_YEAR_BY_PAGINATION_SUCCESS:
      return {
        ...state,
        isSchoolYearLoading: false,
        schoolYearPagination: action.payload,
        error: null,
      };

    // case actionTypes.CREATE_SCHOOL_YEAR_SUCCESS:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     schoolYearPagination: {
    //       ...state.schoolYearPagination,
    //       content: [action.payload, ...state.schoolYearPagination.content],
    //     },
    //   };

    // case actionTypes.DELETE_SCHOOL_YEAR_SUCCESS:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     schoolYearPagination: {
    //       ...state.schoolYearPagination,
    //       content: state.schoolYearPagination.content.filter(
    //         (item) => item.schoolYearId !== action.payload
    //       ),
    //     },
    //     error: null,
    //   };

    case actionTypes.GET_SCHOOL_YEAR_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        schoolYear: action.payload,
        error: null,
      };

    case actionTypes.UPDATE_SCHOOL_YEAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        schoolYearPagination: {
          ...state.schoolYearPagination,
          content: state.schoolYearPagination.content.map((item) =>
            item.schoolYearId === action.payload.schoolYearId
              ? action.payload
              : item
          ),
        },
      };

    case actionTypes.GET_ALL_SCHOOL_YEAR_FAILURE:
    case actionTypes.CREATE_SCHOOL_YEAR_FAILURE:
    case actionTypes.DELETE_SCHOOL_YEAR_FAILURE:
    case actionTypes.GET_SCHOOL_YEAR_BY_ID_FAILURE:
    case actionTypes.UPDATE_SCHOOL_YEAR_FAILURE:
      return {
        ...state,
        isLoading: false,
        success: null,
        error: action.payload,
      };

    case actionTypes.GET_ALL_SCHOOL_YEAR_BY_PAGINATION_FAILURE:
      return {
        ...state,
        isSchoolYearLoading: false,
        success: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default schoolYearReducer;
