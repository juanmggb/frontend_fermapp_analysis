import axios from "axios";
import {
  FAIL_CREATE_USER,
  FAIL_LOGIN_USER,
  FAIL_UPDATE_USER,
  FAIL_USER_LIST,
  REQUEST_CREATE_USER,
  REQUEST_LOGIN_USER,
  REQUEST_UPDATE_USER,
  REQUEST_USER_LIST,
  RESET_CREATE_USER,
  RESET_LOGIN_USER,
  RESET_USER_LIST,
  SUCCESS_CREATE_USER,
  SUCCESS_LOGIN_USER,
  SUCCESS_UPDATE_USER,
  SUCCESS_USER_LIST,
} from "../constants/userConstants";
import { RESET_PLOT_SIMULATION } from "../constants/simulationConstants";
import {
  RESET_OPT_DATA,
  RESET_OPT_PARMS,
} from "../constants/optimizationConstants";
import { RESET_STORE } from "../constants/storeConstants";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/users/",
});

export const getUserList = () => async (dispatch, getState) => {
  dispatch({ type: REQUEST_USER_LIST });

  try {
    //   const {
    //     usuarioInfo: { token },
    //   } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        //   Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await api.get("", config);

    dispatch({ type: SUCCESS_USER_LIST, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_USER_LIST, payload: error.message });
  }
};

export const createUser = (formData) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_CREATE_USER });

  try {
    //   const {
    //     usuarioInfo: { token },
    //   } = getState();

    const config = {
      headers: {
        // I THINK THE CHANGE MUST BE HERE
        "Content-type": "multipart/form-data",
        //   Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await api.post("register/", formData, config);

    dispatch({ type: SUCCESS_CREATE_USER, payload: data });

    dispatch({ type: RESET_USER_LIST });
  } catch (error) {
    dispatch({ type: FAIL_CREATE_USER, payload: error.message });
  }
};

export const login = (credentials) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_LOGIN_USER });

  try {
    const config = {
      headers: {
        "Content-type": "application/json",
        //   Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await api.post("token/", credentials, config);

    dispatch({ type: SUCCESS_LOGIN_USER, payload: data });

    localStorage.setItem("token", JSON.stringify(data.access));
  } catch (error) {
    dispatch({ type: FAIL_LOGIN_USER, payload: error.message });
  }
};

export const updateUser = (formData) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_UPDATE_USER });

  try {
    const {
      loginUser: {
        userInfo: { access },
      },
    } = getState();

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${access}`,
      },
    };

    const { data } = await api.put("update-user/", formData, config);

    dispatch({ type: SUCCESS_UPDATE_USER, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_UPDATE_USER, payload: error.message });
  }
};

export const logout = () => async (dispatch, getState) => {
  dispatch({ type: RESET_STORE }); // Dispatch a single reset action
  localStorage.clear();
};
