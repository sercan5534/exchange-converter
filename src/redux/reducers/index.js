import { combineReducers } from "redux";
import exchange from "./exchange";
import history from "./history";

export default () => combineReducers({
    exchange, history
});