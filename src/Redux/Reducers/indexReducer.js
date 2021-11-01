import { combineReducers } from "redux";
import CartReducer from "./cartReducer";
import ProductsReducer from "./productsReducer";

const Reducer = combineReducers({
  cart: CartReducer,
  allProducts: ProductsReducer,
});
export default Reducer;
