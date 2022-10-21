import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import { orderReducer } from "./reducers/orderReducers";
import { productsReducer } from "./reducers/productReducers";
import { authReducer } from "./reducers/authReducers";
import { placesReducer } from "./reducers/placeReducers";
import { categoriesReducer } from "./reducers/categoryReducers";
import { typesReducer } from "./reducers/typeReducers";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    products: productsReducer,
    cart: cartReducer,
    order: orderReducer,
    auth: authReducer,
    places: placesReducer,
    categories: categoriesReducer,
    types: typesReducer
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);


export default store;