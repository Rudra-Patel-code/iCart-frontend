import axios from "axios";
import { server } from "../store";

export const addToCart = (id) => async (dispatch) => {
  try {
    dispatch({ type: "addToCartRequest", payload: id });

    const link = `${server}/cart/add`;

    const { data } = await axios.put(
      link,
      { productId: id },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );

    dispatch({ type: "addToCartSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "addToCartFail",
      payload: error.response?.data.message || error.message,
    });
  }
};

export const loadCart = () => async (dispatch) => {
  try {
    dispatch({ type: "loadCartRequest" });

    const link = `${server}/cart/get_all`;

    const { data } = await axios.get(link, { withCredentials: true });

    dispatch({ type: "loadCartSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "loadCartFail",
      payload: error.response?.data.message || error.message,
    });
  }
};

export const deleteItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteItemRequest", payload: id });

    const link = `${server}/cart/${id}`;

    const { data } = await axios.delete(link, { withCredentials: true });

    dispatch({ type: "deleteItemSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteItemFail",
      payload: error.response?.data.message || error.message,
    });
  }
};
