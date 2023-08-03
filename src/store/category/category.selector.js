import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.category;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategory = createSelector(
  [selectCategories],
  (categories) => {
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);
