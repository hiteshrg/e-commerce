const InitState = {
  cartItems: [],
};

const CartReducer = (state = InitState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let check = state.cartItems.find((item) => item.id === action.payload.id);
      if (check) {
        let index = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        check.quantity = action.payload.quantity;
        check.price = action.payload.price;
        check.total = check.price * check.quantity;
        state.cartItems[index] = check;
        return state;
      } else {
        return { ...state, cartItems: [...state.cartItems, action.payload] };
      }

    case "REMOVE_TO_CART":
      return {
        ...state,
        cartItems: [
          ...state.cartItems.filter((item) => item.id !== action.payload),
        ],
      };

    default:
      return state;
  }
};

export default CartReducer;
