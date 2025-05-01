import * as actionTypes from "./ActionType";

const initialState = {
  teacherPagination: null,
  recommendedTeachers: [],
  isLoading: false,
  error: null,
  success: null,
};

export const recommendedTeacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_TEACHERS_BY_FACULTY_REQUEST:
    case actionTypes.GET_ALL_RECOMMENDED_TEACHER_REQUEST:
    case actionTypes.ADD_RECOMMENDED_TEACHER_REQUEST:
    case actionTypes.REMOVE_RECOMMENDED_TEACHER_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case actionTypes.GET_ALL_TEACHERS_BY_FACULTY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        teacherPagination: action.payload,
      };

    case actionTypes.GET_ALL_RECOMMENDED_TEACHER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        recommendedTeachers: action.payload,
        error: null,
      };

    case actionTypes.ADD_RECOMMENDED_TEACHER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        recommendedTeachers: [...state.recommendedTeachers, action.payload],
        error: null,
      };

    case actionTypes.REMOVE_RECOMMENDED_TEACHER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        recommendedTeachers: state.recommendedTeachers.filter(
          (item) => item.teacherCode !== action.payload.teacherCode
        ),
        error: null,
      };

    case actionTypes.GET_ALL_TEACHERS_BY_FACULTY_FAILURE:
    case actionTypes.GET_ALL_RECOMMENDED_TEACHER_FAILURE:
    case actionTypes.ADD_RECOMMENDED_TEACHER_FAILURE:
    case actionTypes.REMOVE_RECOMMENDED_TEACHER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
