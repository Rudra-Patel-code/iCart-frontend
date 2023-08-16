import axios from "axios";
import { server } from "../store";

export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "createProductRequest" });

    const link = `${server}/product/create`;

    const { data } = await axios.post(link, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch({ type: "createProductSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "createProductFail",
      payload: error.reponse?.data?.message,
    });
  }
};

export const getProduct =
  (keyword = "", minPrice = "", maxPrice = "", page = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: "getProductsRequest" });

      let link = `${server}/product/get_all?keyword=${keyword}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}`;

      const { data } = await axios.get(
        link,
        { keyword, minPrice, maxPrice, page },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch({ type: "getProductsSuccess", payload: data });
    } catch (error) {
      dispatch({
        type: "getProductsFail",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const deleteProductAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProductRequest" });
    const link = `${server}/product/${id}`;

    const { data } = await axios.delete(link, { withCredentials: true });

    dispatch({ type: "deleteProductSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "deleteProductFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getOneProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getProductDetailRequest" });

    const link = `${server}/product/${id}`;

    const { data } = await axios.get(link, { withCredentials: true });

    dispatch({ type: "getProductDetailSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getProductDetailFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateProduct = (details, id) => async (dispatch) => {
  try {
    dispatch({ type: "updateProductRequest" });

    let link = `${server}/product/${id}`;

    const { data } = await axios.put(link, details, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });

    dispatch({ type: "updateProductSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "updateProductFail",
      payload: error.response?.data.message || error.message,
    });
  }
};

export const updateProductImage = (myData, id) => async (dispatch) => {
  try {
    dispatch({ type: "updateProductImageRequest" });
    const link = `${server}/product/update/image/${id}`;

    const { data } = await axios.put(link, myData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch({ type: "updateProductImageSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "updateProductImageFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getSingleProductRequest" });

    const link = `${server}/product/${id}`;

    const { data } = await axios.get(link, { withCredentials: true });

    dispatch({ type: "getSingleProductSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "getSingleProductFail",
      payload: error.response?.data.message || error.message,
    });
  }
};

export const handleReviews = (id, comment, rating) => async (dispatch) => {
  try {
    dispatch({ type: "reviewRequest" });

    const link = `${server}/product/review/${id}`;

    const { data } = await axios.put(
      link,
      { comment, rating },
      {
        withCredentials: true,
        headers: { "Content-type": "application/json" },
      }
    );

    dispatch({ type: "reviewSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "reviewFail",
      payload: error.response?.data.message || error.message,
    });
  }
};
