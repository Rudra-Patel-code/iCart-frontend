import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducers";
import { utilReducer } from "./reducers/utilReducers";
import { productReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    utils: utilReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

// export const server = "http://localhost:4000/api/v1";
export const server = "https://icart-nz2x.onrender.com/api/v1";

export default store;
