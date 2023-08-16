import { createReducer } from "@reduxjs/toolkit";

export const cartReducer = createReducer(
  {},
  {
    addToCartRequest: (state, action) => {
      state.addLoading = true;
      state.addingId = action.payload;
    },
    addToCartSuccess: (state, action) => {
      state.addLoading = false;
      state.message = action.payload.message;
      if (action.payload.newItem) state.cart.push(action.payload.newItem);
      state.addingId = null;
    },
    addToCartFail: (state, action) => {
      state.addLoading = false;
      state.error = action.payload;
      state.addingId = null;
    },

    loadCartRequest: (state) => {
      state.cartLoading = true;
    },
    loadCartSuccess: (state, action) => {
      state.cartLoading = false;
      state.cart = action.payload.cartItems;
    },
    loadCartFail: (state, action) => {
      state.cartLoading = false;
      state.cart = action.payload;
    },
    deleteItemRequest: (state, action) => {
      state.deleteLoading = true;
      state.deletignItemId = action.payload;
    },
    deleteItemSuccess: (state, action) => {
      state.deleteLoading = false;
      state.deletignItemId = null;
      state.message = action.payload.message;
      state.cart = action.payload.cart;
    },
    deleteItemFail: (state, action) => {
      state.deleteLoading = false;
      state.deletignItemId = null;
      state.error = action.payload.message;
    },

    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);
