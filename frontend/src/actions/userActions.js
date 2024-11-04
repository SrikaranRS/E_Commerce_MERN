import axios from "axios";
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
    const token = localStorage.getItem('token'); // Adjust based on where your token is stored
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token, // Ensure the token is included
        },
        withCredentials: true, // For cookie handling
    };
    const response = await axios.get('http://localhost:5010/api/v1/auth/getProfile',config);
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


export const updateProfile = (userData) => async (dispatch, getState) => {
  try {
      dispatch(updateProfileRequest());

      const token = localStorage.getItem('token'); // Adjust based on where your token is stored
      const config = {
          headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token, // Ensure the token is included
          },
          withCredentials: true, // For cookie handling
      };

      const { data } = await axios.put(`http://localhost:5010/api/v1/auth/updateProfile`, userData, config);
      dispatch(updateProfileSuccess(data));
  } catch (error) {
      dispatch(updateProfileFail(error.response ? error.response.data.message : error.message));
  }
};




export const updatePassword = (oldPassword,password) => async (dispatch, getState) => {
  try {
      dispatch(updatePasswordrequest());
      
      const token = localStorage.getItem('token'); // Adjust based on where your token is stored
      const config = {
          headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token, // Ensure the token is included
          },
          withCredentials: true, // For cookie handling
      };

     const response=  await axios.put(`http://localhost:5010/api/v1/auth/changePassword`, {oldPassword,password}, config);
     
      dispatch(updatePasswordSuccess(response.data));
  } catch (error) {
      dispatch(updatePasswordFail(error.response ? error.response.data.message : error.message));
  }
};


export const forgotPassword = (email) => async (dispatch, getState) => {
  try {
      dispatch(forgotPasswordrequest());
      
    //  const token = localStorage.getItem('token'); // Adjust based on where your token is stored

     const response=  await axios.post(`http://localhost:5010/api/v1/auth/forgotpassword`,{email});
     
      dispatch(forgotPasswordSuccess(response.data));
  } catch (error) {
      dispatch(forgotPasswordFail(error.response ? error.response.data.message : error.message));
  }
};

export const resetPassword = (password,confirmPassword,token) => async (dispatch, getState) => {
  try {
      dispatch(resetPasswordRequest());
      
   

     const response=  await axios.post(`http://localhost:5010/api/v1/auth/resetpassword/${token}`,{password,confirmPassword});
     
      dispatch(resetPasswordSuccess(response.data));
  } catch (error) {
      dispatch(resetPasswordFail(error.response ? error.response.data.message : error.message));
  }
};

