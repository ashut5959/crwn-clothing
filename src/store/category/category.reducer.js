import { CATEGORY_ACTION_TYPE } from "./category.type";

const INITIAL_STATE = {
  categoriesMap: {},
};

export const cartegoryReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORY_ACTION_TYPE.SET_CATEGORY_MAP:
      return {
        ...state,
        categoriesMap: payload,
      };
    default:
      return state;
  }
};
