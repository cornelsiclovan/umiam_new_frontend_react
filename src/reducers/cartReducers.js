import { ADD_TO_CART, CLEAR_CART, ERROR, GET_CART, REMOVE_FROM_CART } from "../types";

export const cartReducer = (
  state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"), error: null},
  action
) => {
  switch (action.type) {
    case GET_CART: {
      //console.log(action.payload);
      return {
        ...state,
        cartItems: action.payload.productsInCart
      }
    }
    case ADD_TO_CART:
      return {
        cartItems: action.payload,
      };
    case REMOVE_FROM_CART:
      return {
        cartItems: action.payload.cartItems,
      };
    case ERROR: {
        return {
            ...state,
            error: action.payload
        }
    }
    case CLEAR_CART: {
      return {
        ...state,
        cartItems: []
      }
    }
    default:
      return state;
  }
};
