import {
  ADD_CATEGORY,
  ADD_CATEGORY_REQUEST,
  ADD_PLACE,
  ADD_PLACE_REQUEST,
  ADD_TYPE,
  ADD_TYPE_REQUEST,
  CATEGORIES_REQUEST,
  DELETE_CATEGORY,
  DELETE_CATEGORY_REQUEST,
  DELETE_PLACE,
  DELETE_PLACE_REQUEST,
  DELETE_TYPE,
  DELETE_TYPE_REQUEST,
  EDIT_CATEGORY,
  EDIT_CATEGORY_REQUEST,
  EDIT_PLACE,
  EDIT_PLACE_REQUEST,
  EDIT_TYPE,
  EDIT_TYPE_REQUEST,
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
    payload: data,
  });
};

export const getPlaceRequest = () => async (dispatch) => {
  dispatch({
    type: GET_PLACE_REQUEST,
  });
};

export const getPlace = (token, placeId) => async (dispatch) => {
  dispatch(getPlaceRequest());


  const res = await fetch(`http://localhost:8080/admin/places/${placeId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  dispatch({
    type: GET_PLACE,
    payload: data,
  });
};

export const getCategoriesRequest = () => async (dispatch) => {
  dispatch({
    type: CATEGORIES_REQUEST,
  });
};

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
    payload: data,
  });
};

export const getTypesRequest = () => async (dispatch) => {
  dispatch({
    type: TYPES_REQUEST,
  });
};

export const getTypes = (token, placeId) => async (dispatch) => {
  dispatch(getTypesRequest());

  const res = await fetch(
    `http://localhost:8080/admin/places/${placeId}/types`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  dispatch({
    type: GET_TYPES,
    payload: data,
  });
};

export const addTypeRequest = () => async (dispatch) => {
  dispatch({
    type: ADD_TYPE_REQUEST,
  });
};

export const addType = (token, type) => async (dispatch) => {
  dispatch(addTypeRequest());

  const res = await fetch("http://localhost:8080/admin/types", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(type),
  });
  const data = await res.json();
  dispatch({
    type: ADD_TYPE,
    payload: {
      type: data.type,
    },
  });

  console.log("add type");
};

export const deleteTypeRequest = () => async (dispatch) => {
  dispatch({
    type: DELETE_TYPE_REQUEST,
  });
};

export const deleteType = (token, typeId) => async (dispatch) => {
  dispatch(deleteTypeRequest());

  const res = await fetch(`http://localhost:8080/admin/types/${typeId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  dispatch({
    type: DELETE_TYPE,
    payload: {
      type: typeId,
    },
  });

  console.log("delete type");
};

export const editTypeRequest = () => async (dispatch) => {
  dispatch({
    type: EDIT_TYPE_REQUEST,
  });
};

export const editType = (token, type, typeId) => async (dispatch) => {
  dispatch(editTypeRequest());

  const res = await fetch(`http://localhost:8080/admin/types/${typeId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(type),
  });
  const data = await res.json();
  dispatch({
    type: EDIT_TYPE,
    payload: {
      type: data.type,
    },
  });

  console.log("edit type");
};

export const addCategoryRequest = () => async (dispatch) => {
  dispatch({
    type: ADD_CATEGORY_REQUEST,
  });
};

export const addCategory = (token, category) => async (dispatch) => {
  dispatch(addCategoryRequest());

  console.log(category);

  const res = await fetch("http://localhost:8080/admin/categories", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
  const data = await res.json();
  dispatch({
    type: ADD_CATEGORY,
    payload: {
      category: data.category,
    },
  });

  console.log("add category");
};

export const deleteCategoryRequest = () => async (dispatch) => {
  dispatch({
    type: DELETE_CATEGORY_REQUEST,
  });
};

export const deleteCategory = (token, categoryId) => async (dispatch) => {
  dispatch(deleteCategoryRequest());

  const res = await fetch(
    `http://localhost:8080/admin/categories/${categoryId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  dispatch({
    type: DELETE_CATEGORY,
    payload: {
      category: categoryId,
    },
  });

  console.log("delete category");
};

export const editCategoryRequest = () => async (dispatch) => {
  dispatch({
    type: EDIT_CATEGORY_REQUEST,
  });
};

export const editCategory =
  (token, category, categoryId) => async (dispatch) => {
    dispatch(editCategoryRequest());

    const res = await fetch(
      `http://localhost:8080/admin/categories/${categoryId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      }
    );
    const data = await res.json();
    dispatch({
      type: EDIT_CATEGORY,
      payload: {
        category: data.category,
      },
    });

    console.log("edit category");
  };
