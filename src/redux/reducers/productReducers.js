import { createReducer } from "@reduxjs/toolkit";

export const productReducer = createReducer(
  {},
  {
    createProductRequest: (state) => {
      state.productloading = true;
    },
    createProductSuccess: (state, action) => {
      state.productloading = false;
      state.message = action.payload.message;
    },
    createProductFail: (state, action) => {
      state.productloading = false;
      state.error = action.payload;
    },
    getProductsRequest: (state) => {
      state.productloading = true;
    },
    getProductsSuccess: (state, action) => {
      state.productloading = false;
      state.products = action.payload.products;
      state.totalPage = action.payload.totalPage;
      state.totalProducts = action.payload.totalProduct;
    },
    getProductsFail: (state, action) => {
      state.productloading = false;
      state.error = action.payload;
    },
    loadMoreRequest: (state) => {
      state.moreLoading = true;
    },
    loadMoreSuccess: (state, action) => {
      state.moreLoading = false;
      state.products = state.products.concat(action.payload);
    },
    loadMoreFail: (state, action) => {
      state.moreLoading = false;
      state.error = action.payload;
    },
    deleteProductRequest: (state) => {
      state.deleteLoading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.deleteLoading = false;
      state.message = action.payload.message;
    },
    deleteProductFail: (state, action) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },
    getProductDetailRequest: (state) => {
      state.getoneProductLoading = true;
    },
    getProductDetailSuccess: (state, action) => {
      state.getoneProductLoading = false;
      state.oneProduct = action.payload.product;
    },
    getProductDetailFail: (state, action) => {
      state.getoneProductLoading = false;
      state.error = action.payload;
    },
    updateProductRequest: (state) => {
      state.productloading = true;
    },
    updateProductSuccess: (state, action) => {
      state.productloading = false;
      state.oneProduct = action.payload.product;
      state.message = action.payload.message;
    },
    updateProductFail: (state, action) => {
      state.productloading = false;
      state.error = action.payload;
    },
    updateProductImageRequest: (state) => {
      state.imageUpdateLoading = true;
    },
    updateProductImageSuccess: (state, action) => {
      state.imageUpdateLoading = false;
      state.oneProduct = action.payload.product;
      state.message = action.payload.message;
    },
    updateProductImageFail: (state, action) => {
      state.imageUpdateLoading = false;
      state.error = action.payload;
    },
    getSingleProductRequest: (state) => {
      state.getSingleProductLoading = true;
    },
    getSingleProductSuccess: (state, action) => {
      state.getSingleProductLoading = false;
      state.singleProduct = action.payload.product;
    },
    getSingleProductFail: (state, action) => {
      state.getSingleProductLoading = false;
      state.error = action.payload;
    },

    reviewRequest: (state) => {
      state.reviewLoading = true;
    },
    reviewSuccess: (state, action) => {
      state.reviewLoading = false;
      state.message = action.payload.message;
      state.singleProduct = action.payload.product;
    },
    reviewFail: (state, action) => {
      state.reviewLoading = false;
      state.error = action.payload;
    },

    clearSuccess: (state) => {
      state.success = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);
