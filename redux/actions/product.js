import { ADD_PRODUCT, REMOVE_PRODUCT } from "./types";
export const addProduct = (productName) => {
  console.log("product name----", productName);
  return {
    type: ADD_PRODUCT,
    payload: productName,
  };
};

export const removeProduct = (productId) => {
  console.log("productId ----", productId);
  return {
    type: REMOVE_PRODUCT,
    payload: productId,
  };
};
