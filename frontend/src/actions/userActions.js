import axios from "axios";
import {
  loadUserFailure,
  loadUserRequest,
  loadUserSuccess,
  loginFailure,
  loginRequest,
  loginSuccess,
  registerFailure,
  registerRequest,
  registerSuccess,
} from "../Slices/authSlice";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const response = await axios.post(
      "http://localhost:5010/api/v1/auth/login",
      { email, password }
    );
    dispatch(loginSuccess(response.data));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An error occurred while fetching products";
    dispatch(loginFailure(errorMessage));
  }
};

export const register = (name, email, password, avatar) => async (dispatch) => {
  try {
    dispatch(registerRequest());

    const response = await axios.post(
      "http://localhost:5010/api/v1/auth/register",
      { name, email, password, avatar }
    );
    dispatch(registerSuccess(response.data));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An error occurred while fetching products";
    dispatch(registerFailure(errorMessage));
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const response = await axios.get("http://localhost:5010/api/v1/auth");
    dispatch(loadUserSuccess(response.data));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An error occurred while fetching products";
    dispatch(loadUserFailure(errorMessage));
  }
};
