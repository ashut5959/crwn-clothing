import { useNavigate } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";
import "./category-preview.styles.scss";
const CategoryPreview = ({ title, products }) => {
  const navigate = useNavigate();
  const navigateHandler = () => navigate(`/shop/${title}`)
  // console.log(products);
  return (
    <div className="category-preview-container">
      <h2>
        <span className="title" onClick={navigateHandler} id= {title}>{title.toUpperCase()}</span>
      </h2>
      <div className="preview">
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} products={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
