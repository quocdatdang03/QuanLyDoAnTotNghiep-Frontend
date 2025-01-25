import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "./Auth/Reducer";
import studentReducer from "./Student/Reducer";

const rootReducer = combineReducers({
  authReducer: authReducer,
  studentReducer: studentReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
