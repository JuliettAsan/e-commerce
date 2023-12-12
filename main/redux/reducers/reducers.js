import { notifyReducer, cartReducer } from "./notifyReducers";

const { combineReducers } = require("redux");

const reducers = combineReducers({
  notify: notifyReducer,
  cart: cartReducer,
});

export default reducers;
