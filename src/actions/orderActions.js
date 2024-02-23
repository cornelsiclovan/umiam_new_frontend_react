import { CLEAR_CART, CLEAR_ORDER, CREATE_ORDER } from "../types";

export const createOrder = (order, token, tableId) => async (dispatch) => {
  console.log(order);
  const res = await fetch(`http://localhost:8080/orders?tableId=${tableId}`, {
    method: "POST",
    headers: {
      Authorization  : `Bearer ${token}`,
      "Content-Type" : "application/json",
    },
    body: JSON.stringify(order),
  });
  const data = await res.json();
  dispatch({
    type: CREATE_ORDER,
    payload: data,
  });
 
};

export const clearOrder = () => (dispatch) => {
  dispatch({ type: CLEAR_ORDER });
};
