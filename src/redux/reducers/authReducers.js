import { createReducer } from "@reduxjs/toolkit";

export const authReducer = createReducer(
  {},
  {
    registerRequest: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuth = true;
      state.message = action.payload.message;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuth = false;
    },
    loadUserRequest: (state) => {
      state.loading = true;
    },

    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload.user;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    loginRequest: (state) => {
      state.loading = true;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },

    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.isAuth = null;
      state.message = action.payload.message;
    },
    logoutFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addShippingInfoRequest: (state) => {
      state.isaddingShippingInfo = true;
    },
    addShippingInfoSuccess: (state, action) => {
      state.isaddingShippingInfo = false;
      state.user = action.payload.user;
      state.message = action.payload.message;
      state.shippingInfo = action.payload.shippingInfo;
    },
    addShippingInfoFail: (state, action) => {
      state.isaddingShippingInfo = false;
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);
