import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_TYPE,
  ORDER_PRODUCTS_BY_PRICE,
  FILTER_PRODUCTS_BY_CATEGORY,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
} from "../types";

export const productsReducer = (
  state = {
    items: null,
    filteredItems: null,
  },
  action
) => {
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
        filteredItems: (action.payload.category === "") ? state.items : state.items.filter((x) => x.categoryId === +action.payload.category),
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
    case ADD_PRODUCT:
      return {
        ...state,
        items: [action.payload.product, ...state.items],
        filteredItems: [action.payload.product, ...state.filteredItems],
      };
    case EDIT_PRODUCT: {

      return {
        ...state,
        filteredItems: state.filteredItems.map((element, index) => {
          if (element.id === action.payload.product.id) {
            return action.payload.product;
          }
          return element;
        }),
      };
    }
    case DELETE_PRODUCT: {
      return {
        ...state,
        filteredItems: state.filteredItems.filter(item => item.id !== action.payload.product)
      };
    }
    default:
      return state;
  }
};
