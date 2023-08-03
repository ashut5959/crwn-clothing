import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  clearItemsFromCart,
  removeItemToCart,
} from "../../store/cart/cart.action";
import "./checkout-items.styles.scss";
import { selectCartItems } from "../../store/cart/cart.selector";

const CheckOutItems = ({ cartItem }) => {
  const dispatch = useDispatch();
  console.log(cartItem);
  const { name, quantity, imageUrl, price } = cartItem;
  const cartItems = useSelector(selectCartItems);
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () =>
    dispatch(removeItemToCart(cartItems, cartItem));
  const clearItemHandler = () =>
    dispatch(clearItemsFromCart(cartItems, cartItem));
  return (
    <div className="checkout-item-container" key={cartItem.id}>
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        {quantity}
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <span className="remove-button" onClick={clearItemHandler}>
        &#10005;
      </span>
    </div>
  );
};

export default CheckOutItems;
