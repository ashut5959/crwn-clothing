import { ReactComponent as ShoppingIcon } from "../../assets/shopping-cart.svg";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import "./cart.styles.scss";

const Cart = () => {
  const { cartCount, isCartOpen, setIsCartOpen } = useContext(CartContext);

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default Cart;
