import { useSelector } from "react-redux";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-cart.svg";
import { useDispatch } from "react-redux";

import "./cart.styles.scss";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
  const handleNavigate = () => navigate('/checkout')
  return (
    <div
      className="cart-icon-container"
      onMouseEnter={toggleIsCartOpen}
      onMouseLeave={toggleIsCartOpen}
      onClick={handleNavigate}
    >
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default Cart;
