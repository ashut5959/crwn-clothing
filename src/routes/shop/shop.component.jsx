import { Routes, Route } from "react-router-dom";

import "./shop.styles.scss";
import CategoriesPreviews from "../mycategoriespreviews/categories.component";
import Category from "../category/category.component";
import { useEffect } from "react";

// import { setCategories } from "../../store/category/category.action";
// import { fecthCategoriesAsync } from "../../store/category/category.action";
import { useDispatch } from "react-redux";
import { fetchCategoriesStart } from "../../store/category/category.action";
const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreviews />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
