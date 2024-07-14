import { ADD_PRODUCT, REMOVE_PRODUCT } from "../actions/types";
const initialState = {
  productName: "",
  products: [],
};
const productReducer = (state = initialState, action) => {
  console.log("action payload", action.payload);
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: state.products.concat(action.payload),
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};
export default productReducer;
