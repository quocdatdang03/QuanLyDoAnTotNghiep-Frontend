import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./Auth/Reducer";
import studentReducer from "./Student/Reducer";
import { teamReducer } from "./Team/Reducer";
import chatReducer from "./Chat/Reducer";

const rootReducer = combineReducers({
  authReducer: authReducer,
  studentReducer: studentReducer,
  teamReducer: teamReducer,
  chatReducer: chatReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
