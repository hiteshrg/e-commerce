export const addToCart = (id, cart) => {
  return {
    type: "ADD_TO_CART",
    payload: id,
    cart,
  };
};

export const removeToCart = (removeItem) => {
  return {
    type: "REMOVE_TO_CART",
    payload: removeItem,
  };
};

export const getAllProduct = (products) => {
  return {
    type: "GET_ALL_PRODUCT",
    payload: products,
  };
};

export const getCatWiseProduct = (products) => {
  return {
    type: "GET_CATEGORY_WISE_PRODUCT",
    payload: products,
  };
};

export const removeCatWiseProduct = (catagoryName) => {
  return {
    type: "REMOVE_CATEGORY_WISE_PRODUCT",
    payload: catagoryName,
  };
};
