import { useParams } from "react-router-dom";
import "./category.styles.scss";
import { useEffect, useState } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import { useSelector } from "react-redux";
import { selectCategory } from "../../store/category/category.selector";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategory);
  const [products, setProducts] = useState(categoriesMap[category]);
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  // console.log(products);
  return (
    <div>
      <h2 className="title-category">{category.toUpperCase()}</h2>
      <div className="category-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} products={product} />
          ))}
      </div>
    </div>
  );
};

export default Category;
