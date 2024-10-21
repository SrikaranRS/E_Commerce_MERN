
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Slices/productsSlice";
import productReducer from "./Slices/productSlice";
import { thunk } from "redux-thunk";

const store = configureStore({
    reducer: {
      productsState: productsReducer,
      productState:productReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(thunk), // Add thunk to middleware
  });
  
  export default store;