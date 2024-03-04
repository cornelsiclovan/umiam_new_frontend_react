import { CLEAR_ORDER, CREATE_ORDER, GET_ORDERS } from "../types";

export const orderReducer = (state = {
  orders: null
}, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return {
        order: action.payload,
      };
    case CLEAR_ORDER:
      return {
        order: null,
      };
    case GET_ORDERS:
      return {
        orders: action.payload.orders,
      };
    default:
      return state;
  }
};
