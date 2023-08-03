import CheckOutItems from "../../components/checkout-items/checkout-item.component";
import { useSelector } from "react-redux";
import {
  selectCartCartTotal,
  selectCartItems,
} from "../../store/cart/cart.selector";
import "./checkout.style.scss";

const CheckOut = () => {
  const cartTotal = useSelector(selectCartCartTotal);
  const cartItems = useSelector(selectCartItems);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="checkout-block">
          <span>Product</span>
        </div>
        <div className="checkout-block">
          <span>Description</span>
        </div>
        <div className="checkout-block">
          <span>Quantity</span>
        </div>
        <div className="checkout-block">
          <span>Price</span>
        </div>
        <div className="checkout-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => {
        return <CheckOutItems key={cartItem.id} cartItem={cartItem} />;
      })}
      <span className="total">Total: ${cartTotal}</span>
    </div>
  );
};

export default CheckOut;
