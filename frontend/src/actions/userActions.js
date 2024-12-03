import axios from "axios";
import Cookies from 'js-cookie';
import {
  clearErrorstate,
  forgotPasswordFail,
  forgotPasswordrequest,
  forgotPasswordSuccess,
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
  resetPasswordFail,
  resetPasswordRequest,
  resetPasswordSuccess,
  updatePasswordFail,
  updatePasswordrequest,
  updatePasswordSuccess,
  updateProfileFail,
  updateProfileRequest,
  updateProfileSuccess,
} from "../Slices/authSlice";

// API URL
const API_URL = "http://localhost:5010/api/v1/auth";

// Session expiration time (1 hour)
const SESSION_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

// Login Action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const response = await axios.post(`${API_URL}/login`, { email, password });

    const { token } = response.data;

    // Store the token and expiration time in localStorage
    const expirationTime = new Date().getTime() + SESSION_EXPIRATION_TIME;
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', expirationTime);

    dispatch(loginSuccess(response.data)); // Dispatch full response data, which might include user details
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Login failed. Please try again.";
    dispatch(loginFailure(errorMessage));
  }
};

// Clear error state action
export const clearError = () => async (dispatch) => {
  dispatch(clearErrorstate());
};

// Register Action
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

// Load User Action (fetch user profile)
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("No token found");
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token, // Attach token to headers for authorization
      },
    };

    const response = await axios.get(`${API_URL}/getProfile`, config);
    dispatch(loadUserSuccess(response.data)); // Dispatch user data on success
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to load user data.";
    dispatch(loadUserFailure(errorMessage));
  }
};
export const logout = () => async (dispatch) => {
  try {
    dispatch(logOutUserLoad());

    // Optional: Call the API to log the user out from the server
    await axios.post(`${API_URL}/logout`);

    // Clear session data from localStorage and cookies
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    Cookies.remove('token');

    // Clear Redux state
    dispatch(logOutUser());
  } catch (error) {
    dispatch(logOutFailure());
  }
};



// Update User Profile Action
export const updateProfile = (userData) => async (dispatch, getState) => {
  try {
    dispatch(updateProfileRequest());

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token, // Attach token to headers
      },
    };

    const { data } = await axios.put(`${API_URL}/updateProfile`, userData, config);
    dispatch(updateProfileSuccess(data)); // Dispatch updated user data
  } catch (error) {
    dispatch(updateProfileFail(error.response ? error.response.data.message : error.message));
  }
};

// Update Password Action
export const updatePassword = (oldPassword, newPassword) => async (dispatch, getState) => {
  try {
    dispatch(updatePasswordrequest());

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token, // Attach token to headers
      },
    };

    const response = await axios.put(`${API_URL}/changePassword`, { oldPassword, newPassword }, config);
    dispatch(updatePasswordSuccess(response.data)); // Dispatch updated password data
  } catch (error) {
    dispatch(updatePasswordFail(error.response ? error.response.data.message : error.message));
  }
};

// Forgot Password Action
export const forgotPassword = (email) => async (dispatch, getState) => {
  try {
    dispatch(forgotPasswordrequest());

    const response = await axios.post(`${API_URL}/forgotpassword`, { email });
    dispatch(forgotPasswordSuccess(response.data));
  } catch (error) {
    dispatch(forgotPasswordFail(error.response ? error.response.data.message : error.message));
  }
};

// Reset Password Action
export const resetPassword = (password, confirmPassword, token) => async (dispatch, getState) => {
  try {
    dispatch(resetPasswordRequest());

    const response = await axios.post(`${API_URL}/resetpassword/${token}`, { password, confirmPassword });
    dispatch(resetPasswordSuccess(response.data));
  } catch (error) {
    dispatch(resetPasswordFail(error.response ? error.response.data.message : error.message));
  }
};

// Check Authentication on Load (check if token exists and is not expired)
export const checkAuthOnLoad = () => (dispatch) => {
  const token = localStorage.getItem('token');
  const tokenExpiration = localStorage.getItem('tokenExpiration');

  // If there's no token or the token has expired, log the user out
  if (!token || !tokenExpiration || new Date().getTime() > tokenExpiration) {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    dispatch(logout()); // Dispatch logout if token expired
  } else {
    // Token is valid, restore user session (you might want to dispatch user details here)
    dispatch(loginSuccess({ token })); // You can extend this to dispatch user data if needed
  }
};
