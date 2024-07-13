import { ADD_PRODUCT } from "./types";
export const addProduct = (productName) => {
  console.log("product name----", productName);
  return {
    type: ADD_PRODUCT,
    payload: productName,
  };
};
