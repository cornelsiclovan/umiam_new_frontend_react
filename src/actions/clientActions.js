import { GET_PLACES_BY_CLIENT, PLACES_REQUEST_BY_CLIENT } from "../types";

export const placeServiceRequest = (token) => async (dispatch) => {
    dispatch({
      type: PLACES_REQUEST_BY_CLIENT,
    });
  };
  
  export const getPlaces = () => async (dispatch) => {

    dispatch(placeServiceRequest());
    const res = await fetch("http://localhost:8080/places", {
      method: "GET"
    });
    const data = await res.json();
    
    dispatch({
      type: GET_PLACES_BY_CLIENT,
      payload: data,
    });
  };
  