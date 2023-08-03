import { CATEGORY_ACTION_TYPE } from "./category.type";

const INITIAL_STATE = {
  categories:[],
};

export const cartegoryReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORY_ACTION_TYPE.SET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    default:
      return state;
  }
};
