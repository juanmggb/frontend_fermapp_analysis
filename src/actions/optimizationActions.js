import {
  FAIL_OPT_MEDIA_COMP,
  FAIL_OPT_PARMS,
  REQUEST_OPT_MEDIA_COMP,
  REQUEST_OPT_PARMS,
  SUCCESS_OPT_MEDIA_COMP,
  SUCCESS_OPT_PARMS,
} from "../constants/optimizationConstants";

import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

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

    const { data } = await api.post(
      "parameter-optimization/",
      formData,
      config
    );

    dispatch({ type: SUCCESS_OPT_PARMS, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_OPT_PARMS, payload: error.message });
  }
};

export const performMCOptimization =
  (formData) => async (dispatch, getState) => {
    dispatch({ type: REQUEST_OPT_MEDIA_COMP });

    try {
      const config = {
        header: {
          "Content-type": "application/json",
        },
      };

      const { data } = await api.post("media-optimization/", formData, config);

      dispatch({ type: SUCCESS_OPT_MEDIA_COMP, payload: data });
    } catch (error) {
      dispatch({ type: FAIL_OPT_MEDIA_COMP, payload: error.message });
    }
  };
