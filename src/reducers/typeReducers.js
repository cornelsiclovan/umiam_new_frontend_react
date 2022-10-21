import { FILTER_TYPES_BY_CATEGORY, GET_TYPES, TYPES_REQUEST } from "../types";

export const typesReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case FILTER_TYPES_BY_CATEGORY: 
        return {
          ...state,
          category: action.payload.category,
          filteredTypes: action.payload.items
        }
    case TYPES_REQUEST:
        return {
            isFetching: true
        }
    case GET_TYPES:
       
      return {
        isFetching: false,
        types: action.payload.types
      }
    default:
      return state;
  }
};
