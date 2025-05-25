import * as actionTypes from "./ActionType";

const initialState = {
  semesterPagination: null,
  semesters: null,
  semester: null,
  currentSemester: null,
  isLoading: false,
  isSemesterLoading: false,
  error: null,
  success: null,
};

const semesterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_SEMESTER_REQUEST:
    case actionTypes.DELETE_SEMESTER_REQUEST:
    case actionTypes.GET_SEMESTER_BY_ID_REQUEST:
    case actionTypes.UPDATE_SEMESTER_BY_ID_REQUEST:
    case actionTypes.GET_ALL_SEMESTER_WITHOUT_PAGINATION_REQUEST:
    case actionTypes.GET_CURRENT_SEMESTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: null,
        error: null,
      };

    case actionTypes.GET_ALL_SEMESTER_REQUEST:
      return {
        ...state,
        isSemesterLoading: true,
        success: null,
        error: null,
      };

    case actionTypes.GET_ALL_SEMESTER_SUCCESS:
      return {
        ...state,
        isSemesterLoading: false,
        semesterPagination: action.payload,
        error: null,
      };

    case actionTypes.GET_CURRENT_SEMESTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentSemester: action.payload,
        error: null,
      };

    // case actionTypes.CREATE_SEMESTER_SUCCESS:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     semesterPagination: {
    //       ...state.semesterPagination,
    //       content: [...state.semesterPagination.content, action.payload],
    //     },
    //     error: null,
    //   };

    // case actionTypes.DELETE_SEMESTER_SUCCESS:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     semesterPagination: {
    //       ...state.semesterPagination,
    //       content: state.semesterPagination.content.filter(
    //         (item) => item.semesterId !== action.payload
    //       ),
    //     },
    //     error: null,
    //   };

    case actionTypes.GET_SEMESTER_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        semester: action.payload,
        error: null,
      };

    case actionTypes.UPDATE_SEMESTER_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        semesterPagination: {
          ...state.semesterPagination,
          content: state.semesterPagination.content.map((item) =>
            item.semesterId === action.payload.semesterId
              ? action.payload
              : item
          ),
        },
      };

    case actionTypes.GET_ALL_SEMESTER_WITHOUT_PAGINATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        semesters: action.payload,
        error: null,
      };

    case actionTypes.CREATE_SEMESTER_FAILURE:
    case actionTypes.DELETE_SEMESTER_FAILURE:
    case actionTypes.GET_SEMESTER_BY_ID_FAILURE:
    case actionTypes.UPDATE_SEMESTER_BY_ID_FAILURE:
    case actionTypes.GET_ALL_SEMESTER_WITHOUT_PAGINATION_FAILURE:
    case actionTypes.GET_CURRENT_SEMESTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case actionTypes.GET_ALL_SEMESTER_FAILURE:
      return {
        ...state,
        isSemesterLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default semesterReducer;
