import { createContext, useState, useEffect } from "react";

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
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearItemsFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

//cart Provider
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  //if cart item changes we use useeffect to update
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    setCartTotal(newCartTotal);
  }, [cartItems]);

  // add item to cart or increment the item quantity in cart
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  // remove item to cart or decrease the quantity in the cart
  const removeItemToCart = (productToRmove) => {
    setCartItems(decrementCartItem(cartItems, productToRmove));
  };
  const clearItemsFromCart = (productToRmove) => {
    setCartItems(clearCartItem(cartItems, productToRmove));
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
