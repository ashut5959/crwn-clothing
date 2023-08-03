import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { rootReducer } from "./root-reducer";
import storage from "redux-persist/lib/storage";

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

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['user'],


}

const persistedReducar = persistReducer(persistConfig, rootReducer)

const middleWares = [loggerMiddlware];

const composeEnhancers = compose(applyMiddleware(...middleWares));

export const Store = createStore(persistedReducar, undefined, composeEnhancers);

export const persistor = persistStore(Store)
