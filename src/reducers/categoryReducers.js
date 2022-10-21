import { CATEGORIES_REQUEST, GET_CATEGORIES } from "../types";

export const categoriesReducer = (
  state = {
    categories: null,
    isFetching: false,
  },
  action
) => {
  switch (action.type) {
    case CATEGORIES_REQUEST: 
      return {
        isFetching: true
      }
    case GET_CATEGORIES:
      return {
        categories: action.payload.categories,
        isFetching: false
      }
    default:
      return state;
  }
};
