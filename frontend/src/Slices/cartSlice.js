import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    items: localStorage.getItem("cart-items")
      ? JSON.parse(localStorage.getItem("cart-items"))
      : [],
    shippingInfo: localStorage.getItem("shippinginfo")
      ? JSON.parse(localStorage.getItem("shippinginfo"))
      : {},
    error: null,
  },
  reducers: {
    addCartRequest(state, action) {
      state.loading = true;
    },

    addCartSuccess(state, action) {
      const item = action.payload;
      const isItemExist = state.items.find((i) => i.product === item.product);

      if (isItemExist) {
        state.loading = false;
      } else {
        state.items.push(item);
      }

      localStorage.setItem("cart-items", JSON.stringify(state.items));
    },

    increaseQuantity(state, action) {
      state.items = state.items.map((item) => {
        if (item.product === action.payload) {
          item.quantity = item.quantity + 1;
        }
        return item;
      });
      localStorage.setItem("cart-items", JSON.stringify(state.items));
    },

    decreaseQuantity(state, action) {
      state.items = state.items.map((item) => {
        if (item.product === action.payload) {
          item.quantity = item.quantity - 1;
        }
        return item;
      });
      localStorage.setItem("cart-items", JSON.stringify(state.items));
    },

    removefromCart(state, action) {
      const filterItems = state.items.filter((item) => item.product !== action.payload);
      localStorage.setItem("cart-items", JSON.stringify(filterItems));
      state.items = filterItems;
    },

    saveShippingInfo(state, action) {
      const shippingData = action.payload;
      localStorage.setItem("shippinginfo", JSON.stringify(shippingData));
      state.shippingInfo = shippingData;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  addCartRequest,
  addCartSuccess,
  increaseQuantity,
  decreaseQuantity,
  removefromCart,
  saveShippingInfo,
  setError,
} = cartSlice.actions;

export default cartSlice.reducer;
