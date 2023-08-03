import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.type";

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

const addCartItem = (cartItems, productToAdd) => {
  const existingProduct = cartItems.find((item) => item.id === productToAdd.id);

  if (existingProduct) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// cart item decrement or remove item
const decrementCartItem = (cartItems, productToRmove) => {
  const existingProduct = cartItems.find(
    (item) => item.id === productToRmove.id
  );

  if (existingProduct.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productToRmove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === productToRmove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItem, productToRmove) =>
  cartItem.filter((cartItem) => cartItem.id !== productToRmove.id);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// remove item to cart or decrease the quantity in the cart
export const removeItemToCart = (cartItems, productToRmove) => {
  const newCartItems = decrementCartItem(cartItems, productToRmove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const clearItemsFromCart = (cartItems, productToRmove) => {
  const newCartItems = clearCartItem(cartItems, productToRmove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
