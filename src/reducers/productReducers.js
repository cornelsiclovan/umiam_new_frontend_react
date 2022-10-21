import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_TYPE,
  ORDER_PRODUCTS_BY_PRICE,
  FILTER_PRODUCTS_BY_CATEGORY,
} from "../types";

export const productsReducer = (state = {
  
}, action) => {
  switch (action.type) {
    case FILTER_PRODUCTS_BY_TYPE:
      return {
        ...state,
        type: action.payload.type,
        filteredItems: action.payload.items,
      };
    case FILTER_PRODUCTS_BY_CATEGORY:
      
      return {
        ...state,
        category: action.payload.category,
        filteredItems: action.payload.items,
      };
    case ORDER_PRODUCTS_BY_PRICE:
      return {
        ...state,
        sort: action.payload.sort,
        filteredItems: action.payload.items,
      };
    case FETCH_PRODUCTS:
      return {
        items: action.payload.products,
        filteredItems: action.payload.products,
      };
    default:
      return state;
  }
};
