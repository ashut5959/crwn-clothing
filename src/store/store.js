import { compose, createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

const loggerMiddlware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("state: ", store.getState());

  next(action);
  console.log("next state", store.getState());
};

const middleWares = [loggerMiddlware];

const composeEnhancers = compose(applyMiddleware(...middleWares));

export const Store = createStore(rootReducer, undefined, composeEnhancers);
