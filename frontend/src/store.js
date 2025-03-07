
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Slices/productsSlice";
import productReducer from "./Slices/productSlice";
import loginReducer from "./Slices/loginSlice"
import authReducer from "./Slices/authSlice"
import cartReducer from "./Slices/cartSlice"
import { thunk } from "redux-thunk";

const store = configureStore({
    reducer: {
      productsState: productsReducer,
      productState:productReducer,
      loginState:loginReducer,
      authState:authReducer,
      cartState:cartReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(thunk), // Add thunk to middleware
  });
  
  export default store;