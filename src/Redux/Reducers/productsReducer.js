const InitState = {
  products: [],
  catWiseProduct: [],
};

const productsReducer = (state = InitState, action) => {
  switch (action.type) {
    case "GET_ALL_PRODUCT":
      return {
        ...state,
        products: action.payload,
      };

    case "GET_CATEGORY_WISE_PRODUCT":
      return {
        ...state,
        catWiseProduct: [...state.catWiseProduct, ...action.payload],
      };

    case "REMOVE_CATEGORY_WISE_PRODUCT":
      const afterFilter = state.catWiseProduct.filter((item) => {
        return item.category !== action.payload;
      });
      return {
        ...state,
        catWiseProduct: afterFilter,
      };

    default:
      return state;
  }
};

export default productsReducer;
