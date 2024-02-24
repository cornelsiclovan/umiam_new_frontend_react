import {
  ADD_TO_CART,
  CLEAR_CART,
  ERROR,
  GET_CART,
  REMOVE_FROM_CART,
} from "../types";

export const getCart = (token, tableId) => async (dispatch) => {
  try {
    const res = await fetch(`http://localhost:8080/cart?tableId=${tableId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (res.status !== 200) {
      throw new Error("No cart available");
    }

    const data = await res.json();

    dispatch({
      type: GET_CART,
      payload: data,
    });

    localStorage.setItem("cartItems", JSON.stringify(data.productsInCart));
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: "Cannot get cart, please retry",
    });
  }
};

export const addToCart =
  (product, token, tableId, fishWeight) => async (dispatch, getState) => {
    //  const cartItems = getState().cart.cartItems.slice();
    //  let alreadyExists = false;
    //  console.log(cartItems);

    // cartItems.forEach((item) => {
    //   if (item.id === product.id) {
    //     alreadyExists = true;
    //     item.count++;
    //   }
    // });

    // // if (!alreadyExists) {

    // //   cartItems.push({ ...product, {} });
    // // }
    // console.log(token);

    try {
      const res = await fetch("http://localhost:8080/cart", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product.id, tableId: tableId, fishWeight }),
      });

      if (res.status !== 200) {
        throw new Error("Adding to cart failed");
      }

      const data = await res.json();

      dispatch({
        type: ADD_TO_CART,
        payload: data.productsInCart,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: "There is an error updating your cart. Check connection!",
      });
    }

    //localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

export const removeFromCart =
  (product, token, tableId) => async (dispatch, getState) => {
    let cartItems;
    let res;

    if (product.id === 111 || product.id === 112) {
      cartItems = getState()
        .cart.cartItems.slice()
        .filter((item) => item.cartItem.id !== product.cartItem.id);
      res = await fetch(`http://localhost:8080/cart?tableId=${tableId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product.cartItem.id }),
      });
    } else {
      cartItems = getState()
        .cart.cartItems.slice()
        .filter((item) => item.id !== product.id);
      res = await fetch(`http://localhost:8080/cart?tableId=${tableId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product.cartItem.id }),
      });
    }

    try {
      if (res.status !== 200) {
        throw new Error("Adding to cart failed");
      }

      const data = await res.json();

      dispatch({
        type: REMOVE_FROM_CART,
        payload: { cartItems },
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: "There is an error updating your cart. Check connection!",
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

export const clearCart = () => (dispatch) => {
  localStorage.removeItem("cartItems");
  dispatch({
    type: CLEAR_CART,
  });
};
