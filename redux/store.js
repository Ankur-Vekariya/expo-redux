// store.js
import { createStore, combineReducers } from "redux";
import productReducer from "./reducers/productReducer";
const rootReducer = combineReducers({
  product: productReducer,
});
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
