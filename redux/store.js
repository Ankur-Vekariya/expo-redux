// store.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import productReducer from "./reducers/productReducer";
import logger from "redux-logger";

const middlewares = [logger];

const rootReducer = combineReducers({
  cart: productReducer,
});
const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(...middlewares));
};
export default configureStore;
