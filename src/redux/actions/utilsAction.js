import axios from "axios";
import { server } from "../store";

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "getCategoriesRequest" });
    const link = `${server}/category/getAll`;

    const { data } = await axios.get(link, { withCredentials: true });

    dispatch({ type: "getCategoriesSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getCategoriesFail",
      payload: error.response?.data.message || error.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteCategoryRequest" });

    const link = `${server}/category/${id}`;

    const { data } = await axios.delete(link, { withCredentials: true });

    dispatch({ type: "deleteCategorySuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteCategoryFail",
      payload: error.response?.data.message || error.message,
    });
  }
};

export const updateCategory = (id, name) => async (dispatch) => {
  try {
    dispatch({ type: "updateCategoryRequest" });
    const link = `${server}/category/${id}`;

    const { data } = await axios.put(
      link,
      { name },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch({ type: "updateCategorySuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "updateCategoryFail",
      payload: error.response?.data.message || error.messasge,
    });
  }
};

export const createCategory = (name) => async (dispatch) => {
  try {
    dispatch({ type: "createCategoryRequest" });

    const link = `${server}/category/create`;

    const { data } = await axios.post(
      link,
      { name },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );

    dispatch({ type: "createCategorySuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "createCategoryFail",
      payload: error.response?.data.message || error.message,
    });
  }
};

export const getOneCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: "oneCategoryRequest" });

    const link = `${server}/category/${id}`;

    const { data } = await axios.get(link, { withCredentials: true });

    dispatch({ type: "oneCategorySuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "oneCategoryFail",
      payload: error.response?.data.message || error.message,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllUsersRequest" });
    const link = `${server}/auth/getAll`;

    const { data } = await axios.get(link, { withCredentials: true });

    dispatch({ type: "getAllUsersSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getAllUsersFail",
      payload: error.response?.data.message || error.message,
    });
  }
};

export const changeRole = (id, role) => async (dispatch) => {
  try {
    dispatch({ type: "changeRoleRequest", payload: id });

    const link = `${server}/auth/change-role`;

    const { data } = await axios.put(
      link,
      { id, role },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );

    dispatch({ type: "changeRoleSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "changeRoleFail",
      payload: error.response?.data.message || error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteUserRequest", payload: id });

    const link = `${server}/auth/${id}`;

    const { data } = await axios.delete(link, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    dispatch({ type: "deleteUserSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteUserFail",
      payload: error.response?.data.message || error.message,
    });
  }
};

export const createOrder = (orderInfo, paymentId) => async (dispatch) => {
  try {
    dispatch({ type: "createOrderRequest" });

    const link = `${server}/order/new`;

    await axios.post(
      link,
      {
        cart: orderInfo.cart,
        totalPrice: orderInfo.totalPrice,
        paymentId: paymentId,
      },
      { withCredentials: true, headers: { "Content-Type": "application/json" } }
    );

    dispatch({ type: "createOrderSuccess" });
  } catch (error) {
    dispatch({
      type: "createOrderFail",
      payload: error.response?.data.message || error.message,
    });
  }
};
