import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: false,
    error: null,
    token: null,
    isUpdated: false,
    message:null
  },
  reducers: {
    loginRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      state.token = action.payload.token;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    registerRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
    },
    registerFailure(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    loadUserRequest(state, action) {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = null;
    },
    loadUserSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;

      state.token = action.payload.token;
      state.error = null;
    },
    loadUserFailure(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      // state.error = action.payload;
    },
    logOutUserLoad(state, action) {
      state.loading = true;
    },
    logOutUser(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token=null;
    },
    logOutFailure(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    clearErrorstate(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = null;
    },
    updateProfileRequest(state, action) {
      state.loading = true;
      state.isUpdated = false;
    },
    updateProfileSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.isUpdated = true;
    },
    updateProfileFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updatePasswordrequest(state, action) {
      state.loading = true;
      state.isUpdated = false;
    },
    updatePasswordSuccess(state, action) {
      state.loading = false;
      // state.user = action.payload.message;
      state.error = null;
      state.message = action.payload.message;

      state.isUpdated = true;
    },
    updatePasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    forgotPasswordrequest(state, action) {
      state.loading = true;
      state.isUpdated = false;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      // state.user = action.payload.message;
      state.error = null;
      state.message = action.payload.message;
    },
    forgotPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetPasswordRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated=true;
      state.user = action.payload.user;
      state.error = null;
      state.message = null;
      state.isUpdated=true
    },
    resetPasswordFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
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
  loadUserSuccess,
  loadUserFailure,
  logOutUser,
  logOutUserLoad,
  logOutFailure,
  clearErrorstate,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFail,
  updatePasswordFail,
  updatePasswordSuccess,
  updatePasswordrequest,
  forgotPasswordrequest,
  forgotPasswordSuccess,
  forgotPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFail,
} = authSlice.actions;

export default authSlice.reducer;
