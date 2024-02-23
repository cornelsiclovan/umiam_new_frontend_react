import {
  ADD_CATEGORY,
  CATEGORIES_REQUEST,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  GET_CATEGORIES,
} from "../types";

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
        isFetching: true,
      };
    case GET_CATEGORIES:
      return {
        categories: action.payload.categories,
        isFetching: false,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [action.payload.category, ...state.categories],
      };
    case EDIT_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((element, index) => {

          if (element.id === action.payload.category.id) {
            return action.payload.category;
          }
          return element;
        }),
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(item => item.id !== action.payload.category)
      };
    default:
      return state;
  }
};
