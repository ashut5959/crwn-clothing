import { Routes, Route } from "react-router-dom";

import "./shop.styles.scss";
import CategoriesPreviews from "../mycategoriespreviews/categories.component";
import Category from "../category/category.component";
const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreviews />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
