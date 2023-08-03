import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { rootReducer } from "./root-reducer";
import storage from "redux-persist/lib/storage";
// import loggerMiddlware from "./middleware/logger";
import thunk from "redux-thunk";
import logger from "redux-logger";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["user"],
};

const persistedReducar = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  thunk,
].filter(Boolean);

// const thunkMiddleWare = (store) => (next) => (action) => {
//   if(typeof(action) === 'function')
//   action(dispatch);
// }

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const Store = createStore(persistedReducar, undefined, composeEnhancers);

export const persistor = persistStore(Store);
