import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { cartegoryReducer } from "./category/category.reducer";
import { cartReducer } from "./cart/cart.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  category: cartegoryReducer,
  cart: cartReducer,
});
