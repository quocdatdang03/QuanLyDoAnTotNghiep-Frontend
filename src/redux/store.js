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
import projectReducer from "./Project/Reducer";
import teacherReducer from "./Teacher/Reducer";
import instructorProjectReducer from "./InstructorProject/Reducer";
import instructorStageReducer from "./InstructorStage/Reducer";
import progressReportReducer from "./ProgressReport/Reducer";
import instructorProgressReducer from "./InstructorProgress/Reducer";
import notificationReducer from "./Notification/Reducer";
import degreeReducer from "./Degree/Reducer";
import { recommendedTeacherReducer } from "./RecommendedTeacher/Reducer";
import dashboardReducer from "./Dashboard/Reducer";

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
  projectReducer: projectReducer,
  teacherReducer: teacherReducer,
  instructorProjectReducer: instructorProjectReducer,
  instructorStageReducer: instructorStageReducer,
  progressReportReducer: progressReportReducer,
  instructorProgressReducer: instructorProgressReducer,
  notificationReducer: notificationReducer,
  degreeReducer: degreeReducer,
  recommendedTeacherReducer: recommendedTeacherReducer,
  dashboardReducer: dashboardReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
