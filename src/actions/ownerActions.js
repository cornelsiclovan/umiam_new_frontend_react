import {
  ADD_PLACE,
  ADD_PLACE_REQUEST,
  CATEGORIES_REQUEST,
  DELETE_PLACE,
  DELETE_PLACE_REQUEST,
  EDIT_PLACE,
  EDIT_PLACE_REQUEST,
  GET_CATEGORIES,
  GET_PLACE,
  GET_PLACES,
  GET_PLACE_REQUEST,
  GET_TYPES,
  PLACES_REQUEST,
  TYPES_REQUEST,
} from "../types";

export const placeServiceRequest = (token) => async (dispatch) => {
  dispatch({
    type: PLACES_REQUEST,
  });
};

export const getPlaces = (token) => async (dispatch) => {
  dispatch(placeServiceRequest());
  const res = await fetch("http://localhost:8080/admin/places", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  dispatch({
    type: GET_PLACES,
    payload: data,
  });
};

export const addPlaceRequest = () => async (dispatch) => {
  dispatch({
    type: ADD_PLACE_REQUEST,
  });
};

export const addPlace = (token, place) => async (dispatch) => {
  dispatch(addPlaceRequest());
  const res = await fetch("http://localhost:8080/admin/places", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(place),
  });
  const data = await res.json();

  dispatch({
    type: ADD_PLACE,
    payload: data,
  });
};

export const editPlaceRequest = () => async (dispatch) => {
  dispatch({
    type: EDIT_PLACE_REQUEST,
  });
};

export const editPlace = (token, place, placeId) => async (dispatch) => {
  dispatch(editPlaceRequest());

  const res = await fetch(`http://localhost:8080/admin/places/${placeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(place),
  });

  const data = await res.json();

  dispatch({
    type: EDIT_PLACE,
    payload: data,
  });
};

export const deletePlaceRequest = () => async (dispatch) => {
  dispatch({
    type: DELETE_PLACE_REQUEST,
  });
};

export const deletePlace = (token, placeId) => async (dispatch) => {
  dispatch(deletePlaceRequest());

  const res = await fetch(`http://localhost:8080/admin/places/${placeId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  dispatch({
    type: DELETE_PLACE,
    payload: data
  });
};

export const getPlaceRequest = () => async (dispatch) => {
  dispatch({
    type: GET_PLACE_REQUEST
  });
};

export const getPlace = (token, placeId) => async (dispatch) => {
  dispatch(getPlaceRequest());

  const res = await fetch(`http://localhost:8080/admin/places/${placeId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await res.json();

  dispatch({
    type: GET_PLACE,
    payload: data
  })
}

export const getCategoriesRequest = () => async (dispatch) => {
  dispatch({
    type: CATEGORIES_REQUEST
  });
}

export const getCategories = (token) => async (dispatch) => {
  dispatch(getCategoriesRequest());

  const res = await fetch(`http://localhost:8080/admin/categories`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();

  dispatch({
    type: GET_CATEGORIES,
    payload: data
  })
}

export const getTypesRequest = () => async (dispatch) => {
  dispatch({
    type: TYPES_REQUEST
  })
}

export const getTypes = (token, placeId) => async (dispatch) => {
  dispatch(getTypesRequest());

  const res = await fetch(`http://localhost:8080/admin/places/${placeId}/types`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  const data = await res.json();

  dispatch({
    type: GET_TYPES,
    payload: data
  });
} 

