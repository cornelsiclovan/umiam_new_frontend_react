import {
  ADD_PLACE,
  ADD_PLACE_REQUEST,
  EDIT_PLACE,
  EDIT_PLACE_REQUEST,
  GET_PLACES,
  GET_PLACE_REQUEST,
  GET_PLACE,
  PLACES_REQUEST,
  PLACES_REQUEST_BY_CLIENT,
  GET_PLACES_BY_CLIENT,
} from "../types";

export const placesReducer = (
  state = {
    clientPlaceList: null,
    placeList: null,
    isFetching: false,
    isEditing: false,
    place: null,
  },
  action
) => {
  switch (action.type) {
    case PLACES_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case GET_PLACES: {
      return {
        ...state,
        isFetching: false,
        placeList: action.payload.places,
      };
    }
    case PLACES_REQUEST_BY_CLIENT:
      return {
        ...state,
        isFetching: true,
      };
    case GET_PLACES_BY_CLIENT: {
      return { 
        isFetching: false,
        clientPlaceList: action.payload.places
      }
    }
    case ADD_PLACE_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case ADD_PLACE: {
      return {
        ...state,
        isFetching: false,
        placeList: action.payload.place
          ? state.placeList.concat(action.payload.place)
          : state.placeList,
      };
    }
    case EDIT_PLACE_REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case EDIT_PLACE: {
      const placeIndex = state.placeList.findIndex(
        (p) => p.id === action.payload.place.id
      );

      return {
        ...state,
        isFetching: false,
        placeList: action.payload.place
          ? state.placeList
              .slice(0, placeIndex)
              .concat(action.payload.place)
              .concat(state.placeList.slice(placeIndex + 1))
          : state.placeList,
      };
    }
    case GET_PLACE_REQUEST: {
      return {
        isFetching: true,
      };
    }
    case GET_PLACE: {
      return {
        isFetching: false,
        place: action.payload.place,
      };
    }
    default:
      return state;
  }
};
