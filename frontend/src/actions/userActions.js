import axios from "axios";
import {
  clereError,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  loginFail,
  loginRequest,
  loginSuccess,
  logoutFail,
  logoutSuccess,
  registerFail,
  registerRequest,
  registerSuccess,
  updatePasswordFail,
  updatePasswordRequest,
  updatePasswordSuccess,
  updateProfileFail,
  updateProfileRequest,
  updateProfileSuccess,
} from "../slices/authSlce";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axios.post("/api/v1/login", { email, password });
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
  }
};

export const clearAuthError = (dispatch) => {
  dispatch(clereError);
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());

    const config = {
      headers: {
        "Content-Type": "multipart/form-data", // Corrected Content-Type
      },
    };
    const { data } = await axios.post("/api/v1/register", userData, config);
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFail(error.response.data.message));
  }
};

export const loadUser = async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get("/api/v1/myprofile");
    dispatch(loadUserSuccess(data));
  } catch (error) {  
    dispatch(loadUserFail(error.response.data.message));
  }
};


export const logout = async (dispatch) => {
  try {
    

    await axios.get("/api/v1/logout");
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFail(error.response.data.message));
  }
};


export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch(updateProfileRequest());

    const config = {
      headers: {
        "Content-Type": "multipart/form-data", // Corrected Content-Type
      },
    };
    const { data } = await axios.put("/api/v1/update", userData, config);
    dispatch(updateProfileSuccess(data));
  } catch (error) {
    dispatch(updateProfileFail(error.response.data.message));
  }
};


export const updatePassword = (formData) => async (dispatch) => {
  try {
    dispatch(updatePasswordRequest());
     const config = {
      headers: {
      "Content-Type": "application/json", // Corrected Content-Type
      },
     };
    
     await axios.put("/api/v1/password/change", formData, config);
    dispatch(updatePasswordSuccess());
  } catch (error) {
    dispatch(updatePasswordFail(error.response.data.message));
  }
};