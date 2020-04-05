import { combineReducers } from "redux";
import authReducer from "../framework/redux/module/Authorization";

export default combineReducers({
  auth: authReducer,
});
