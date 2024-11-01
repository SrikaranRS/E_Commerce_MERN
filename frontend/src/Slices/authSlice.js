import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: false,
    error: null,
    //token:null
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
   //   state.token=action.payload.token
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
      state.error = null;
    },
    loadUserFailure(state, action) {
      state.loading = false;
      state.isAuthenticated = false;/* 
      state.error = action.payload; */
    },
    logOutUserLoad(state, action) {
      state.loading = true;
    },
    logOutUser(state, action) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    logOutFailure(state, action){

      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error=action.payload

    }
    ,

    clearErrorstate(state,action){
      state.loading=false;
      state.isAuthenticated=false;
      state.error=null;
    }
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
  clearErrorstate
} = authSlice.actions;

export default authSlice.reducer;
