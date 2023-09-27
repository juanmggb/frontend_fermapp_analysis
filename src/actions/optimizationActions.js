import {
  FAIL_OPT_DATA,
  FAIL_OPT_PARMS,
  REQUEST_OPT_PARMS,
  SAVE_OPT_DATA,
  SUCCESS_OPT_DATA,
  SUCCESS_OPT_PARMS,
} from "../constants/optimizationConstants";

import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export const saveDataOpt = (data) => async (dispatch, getState) => {
  dispatch({ type: SAVE_OPT_DATA });

  try {
    dispatch({ type: SUCCESS_OPT_DATA, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_OPT_DATA, payload: error.message });
  }
};

export const performOptParms = (formData) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_OPT_PARMS });

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

    const { data } = await api.post("optimization/", formData, config);

    dispatch({ type: SUCCESS_OPT_PARMS, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_OPT_PARMS, payload: error.message });
  }
};
