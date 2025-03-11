import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./Auth/Reducer";
import studentReducer from "./Student/Reducer";
import { teamReducer } from "./Team/Reducer";
import chatReducer from "./Chat/Reducer";
import schoolYearReducer from "./SchoolYear/Reducer";
import semesterReducer from "./Semester/Reducer";
import facultyReducer from "./Faculty/Reducer";
import classReducer from "./Class/Reducer";
import teacherLeaderReducer from "./TeacherLeader/Reducer";

const rootReducer = combineReducers({
  authReducer: authReducer,
  studentReducer: studentReducer,
  teamReducer: teamReducer,
  chatReducer: chatReducer,
  schoolYearReducer: schoolYearReducer,
  semesterReducer: semesterReducer,
  facultyReducer: facultyReducer,
  classReducer: classReducer,
  teacherLeaderReducer: teacherLeaderReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
