import Button from "../button/button.componenet";
import { CartContext } from "../../context/cart.context";
import "./product-card.styles.scss";
import { useContext } from "react";

const ProductCard = ({ products }) => {
  const { addItemToCart } = useContext(CartContext);
  const { name, price, imageUrl } = products;
  const addProductToCart = () => addItemToCart(products);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
