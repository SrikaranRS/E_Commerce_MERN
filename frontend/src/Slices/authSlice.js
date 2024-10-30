import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: false,
    error: false,
  },
  reducers: {
    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = false;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = false;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    registerRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = false;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = false;
    },
    registerFailure(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    loadUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = false;
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = false;
    },
    loadUserFailure(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginSuccess,
  loginRequest,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  loadUserRequest,
loadUserSuccess,loadUserFailure
} = authSlice.actions;

export default authSlice.reducer;
