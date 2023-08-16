import { createReducer } from "@reduxjs/toolkit";

export const utilReducer = createReducer(
  {},
  {
    getCategoriesRequest: (state) => {
      state.loading = true;
    },
    getCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload.category;
    },
    getCategoriesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCategoryRequest: (state) => {
      state.deleteLoading = true;
    },
    deleteCategorySuccess: (state, action) => {
      state.deleteLoading = false;
      state.message = action.payload.message;
    },
    deleteCategoryFail: (state, action) => {
      state.deleteLoading = false;
      state.error = action.payload;
    },
    createCategoryRequest: (state) => {
      state.createLoading = true;
    },
    createCategorySuccess: (state, action) => {
      state.createLoading = false;
      state.message = action.payload.message;
    },
    createCategoryFail: (state, action) => {
      state.createLoading = false;
      state.error = action.payload;
    },
    updateCategoryRequest: (state) => {
      state.updateLoading = true;
    },
    updateCategorySuccess: (state, action) => {
      state.updateLoading = false;
      state.message = action.payload.message;
    },

    updateCategoryFail: (state, action) => {
      state.updateLoading = false;
      state.error = action.payload;
    },
    oneCategoryRequest: (state) => {
      state.oneCategoryLoading = true;
    },
    oneCategorySuccess: (state, action) => {
      state.oneCategoryLoading = false;
      state.oneCategory = action.payload.category;
    },

    oneCategoryFail: (state, action) => {
      state.oneCategoryLoading = false;
      state.error = action.payload;
    },

    getAllUsersRequest: (state) => {
      state.getUserLoading = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.getUserLoading = false;
      state.users = action.payload.users;
    },
    getAllUsersFail: (state, action) => {
      state.getUserLoading = false;
      state.error = action.payload;
    },
    changeRoleRequest: (state, action) => {
      state.roleLoading = true;
      state.changingId = action.payload;
    },
    changeRoleSuccess: (state, action) => {
      state.roleLoading = false;
      state.changingId = null;
      state.message = action.payload.message;
      state.users = action.payload.users;
    },
    changeRoleFail: (state, action) => {
      state.roleLoading = false;
      state.changingId = null;
      state.error = action.payload;
    },
    deleteUserRequest: (state, action) => {
      state.deleteLoading = true;
      state.deletingId = action.payload;
    },
    deleteUserSuccess: (state, action) => {
      state.deleteLoading = false;
      state.deletingId = null;
      state.message = action.payload.message;
      state.users = action.payload.users;
    },
    deleteUserFail: (state, action) => {
      state.deleteLoading = false;
      state.deletingId = null;
      state.error = action.payload;
    },

    createOrderRequest: (state) => {
      state.isCreatingOrder = true;
    },
    createOrderSuccess: (state) => {
      state.isCreatingOrder = false;
    },
    createOrderFail: (state, action) => {
      state.isCreatingOrder = false;
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
