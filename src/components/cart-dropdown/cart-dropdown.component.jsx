import Button from "../button/button.componenet";
import "./cart-dropdown.styles.scss";
const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items" />
      <Button>Go to CheckOut</Button>
    </div>
  );
};
export default CartDropdown;
