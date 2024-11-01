import axios from "axios";
import {
  clearErrorstate,
  loadUserFailure,
  loadUserRequest,
  loadUserSuccess,
  loginFailure,
  loginRequest,
  loginSuccess,
  logOutFailure,
  logOutUser,
  logOutUserLoad,
  registerFailure,
  registerRequest,
  registerSuccess,
} from "../Slices/authSlice";

const API_URL = "http://localhost:5010/api/v1/auth";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const response = await axios.post(`${API_URL}/login`, { email, password });
    dispatch(loginSuccess(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Login failed. Please try again.";
    dispatch(loginFailure(errorMessage));
  }
};

export const clearError=()=>async (dispatch)=>{
  dispatch(clearErrorstate())
}

export const register = (name, email, password, avatar) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const response = await axios.post(`${API_URL}/register`, { name, email, password, avatar });
    dispatch(registerSuccess(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Registration failed. Please try again.";
    dispatch(registerFailure(errorMessage));
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const response = await axios.get('http://localhost:5010/api/v1/auth/getProfile');
    dispatch(loadUserSuccess(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to load user data.";
    dispatch(loadUserFailure(errorMessage));
  }
};

export const logoutUsers = () =>async (dispatch) => {

  try {
    dispatch(logOutUserLoad())
    await axios.post('http://localhost:5010/api/v1/auth/logout')
    dispatch(logOutUser())
   

    
  } catch (error) {
    dispatch(logOutFailure())
  }
};
