import { ADD_TYPE, DELETE_TYPE, EDIT_TYPE, FILTER_TYPES_BY_CATEGORY, GET_TYPES, TYPES_REQUEST } from "../types";

export const typesReducer = (
  state = {
    types: null,
    filteredTypes: null
  },
  action
) => {

  switch (action.type) {
    case FILTER_TYPES_BY_CATEGORY: 
  
        return {
          ...state,
          category: action.payload.category,
          filteredTypes:  (action.payload.category === "" ? state.types : state.types.filter((x =>  +x.categoryId === +action.payload.category)))
        }
    case TYPES_REQUEST:
        return {
            isFetching: true
        }
    case GET_TYPES:
      
      return {
        isFetching: false,
        types: action.payload.types,
        filteredTypes: action.payload.types
      }
    case ADD_TYPE: {

      return {
        ...state,
        types: [action.payload.type, ...state.types],
        filteredTypes:  [action.payload.type, ...state.filteredTypes],
      }
    }
    case EDIT_TYPE: {
      return {
        ...state,
        filteredTypes: state.filteredTypes.map((element, index) => {

          if (element.id === action.payload.type.id) {
            return action.payload.type;
          }
          return element;
        }),
      }
    }
    case DELETE_TYPE: {
      return {
        ...state,
        filteredTypes: state.filteredTypes.filter(item => item.id !== action.payload.type)
      }
    }
    default:
      return state;
  }
};
