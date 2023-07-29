import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import "./checkout-items.styles.scss";

const CheckOutItems = ({ cartItems }) => {
  const { clearItemsFromCart, addItemToCart, removeItemToCart } =
    useContext(CartContext);
  const { name, quantity, imageUrl, price } = cartItems;

  const addItemHandler = () => addItemToCart(cartItems);
  const removeItemHandler = () => removeItemToCart(cartItems);
  const clearItemHandler = () => clearItemsFromCart(cartItems);
  return (
    <div className="checkout-item-container" key={cartItems.id}>
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
