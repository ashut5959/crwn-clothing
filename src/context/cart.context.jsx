// import { createContext, useState, useEffect } from "react";

// const addCartItem = (cartItems, productToAdd) => {
//   const existingProduct = cartItems.find((item) => item.id === productToAdd.id);

//   if (existingProduct) {
//     return cartItems.map((cartItem) =>
//       cartItem.id === productToAdd.id
//         ? { ...cartItem, quantity: cartItem.quantity + 1 }
//         : cartItem
//     );
//   }

//   return [...cartItems, { ...productToAdd, quantity: 1 }];
// };

// // cart item decrement or remove item
// const decrementCartItem = (cartItems, productToRmove) => {
//   const existingProduct = cartItems.find(
//     (item) => item.id === productToRmove.id
//   );

//   if (existingProduct.quantity === 1) {
//     return cartItems.filter((cartItem) => cartItem.id !== productToRmove.id);
//   }

//   return cartItems.map((cartItem) =>
//     cartItem.id === productToRmove.id
//       ? { ...cartItem, quantity: cartItem.quantity - 1 }
//       : cartItem
//   );
// };

// //clear cart item
// const clearCartItem = (cartItem, productToRmove) =>
//   cartItem.filter((cartItem) => cartItem.id !== productToRmove.id);

// //Create cart Context
// export const CartContext = createContext({
//   isCartOpen: false,
//   setIsCartOpen: () => {},
//   cartItems: [],
//   addItemToCart: () => {},
//   removeItemToCart: () => {},
//   clearItemsFromCart: () => {},
//   cartCount: 0,
//   cartTotal: 0,
// });

// //cart Provider
// export const CartProvider = ({ children }) => {
//   const [isCartOpen, setIsCartOpen] = useState();
//   const [cartItems, setCartItems] = useState([]);
//   const [cartCount, setCartCount] = useState(0);
//   const [cartTotal, setCartTotal] = useState(0);

//   //if cart item changes we use useeffect to update
//   useEffect(() => {
//     const newCartCount = cartItems.reduce(
//       (total, cartItem) => total + cartItem.quantity,
//       0
//     );
//     setCartCount(newCartCount);
//   }, [cartItems]);

//   useEffect(() => {
//     const newCartTotal = cartItems.reduce(
//       (total, cartItem) => total + cartItem.quantity * cartItem.price,
//       0
//     );

//     setCartTotal(newCartTotal);
//   }, [cartItems]);

//   // add item to cart or increment the item quantity in cart
//   const addItemToCart = (productToAdd) => {
//     setCartItems(addCartItem(cartItems, productToAdd));
//   };

//   // remove item to cart or decrease the quantity in the cart
//   const removeItemToCart = (productToRmove) => {
//     setCartItems(decrementCartItem(cartItems, productToRmove));
//   };
//   const clearItemsFromCart = (productToRmove) => {
//     setCartItems(clearCartItem(cartItems, productToRmove));
//   };

//   //value that are passed to the provider
//   const value = {
//     isCartOpen,
//     setIsCartOpen,
//     addItemToCart,
//     cartItems,
//     removeItemToCart,
//     clearItemsFromCart,
//     cartCount,
//     cartTotal,
//   };

//   //return the cartcontext provider to the index page
//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };

import { createContext, useReducer } from "react";

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

//clear cart item
const clearCartItem = (cartItem, productToRmove) =>
  cartItem.filter((cartItem) => cartItem.id !== productToRmove.id);

//Create cart Context
export const CartContext = createContext({
  isCartOpen: true,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearItemsFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const CAR_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CAR_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CAR_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
};

//cart Provider
export const CartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    dispatch({
      type: CAR_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      },
    });
  };

  // add item to cart or increment the item quantity in cart
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  // remove item to cart or decrease the quantity in the cart
  const removeItemToCart = (productToRmove) => {
    const newCartItems = decrementCartItem(cartItems, productToRmove);
    updateCartItemsReducer(newCartItems);
  };
  const clearItemsFromCart = (productToRmove) => {
    const newCartItems = clearCartItem(cartItems, productToRmove);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch({ type: CAR_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool });
  };

  //value that are passed to the provider
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    removeItemToCart,
    clearItemsFromCart,
    cartCount,
    cartTotal,
  };

  //return the cartcontext provider to the index page
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
