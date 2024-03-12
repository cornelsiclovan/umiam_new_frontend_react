import { ADD_TO_CART, CLEAR_CART, ERROR, GET_CART, GET_CARTS, REMOVE_FROM_CART } from "../types";

export const cartReducer = (
  state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"), error: null, carts: []},
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
    case GET_CARTS: {
      return {
        ...state,
        carts: action.payload.carts
      }
    }
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: action.payload,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
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
