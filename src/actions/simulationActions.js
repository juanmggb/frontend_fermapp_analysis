import {
  FAIL_PLOT_SIMULATION,
  REQUEST_PLOT_SIMULATION,
  SUCCESS_PLOT_SIMULATION,
} from "../constants/simulationConstants";

import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export const performSimulation = (formData) => async (dispatch, getState) => {
  dispatch({ type: REQUEST_PLOT_SIMULATION });

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

    const { data } = await api.post("simulation/", formData, config);

    dispatch({ type: SUCCESS_PLOT_SIMULATION, payload: data });
  } catch (error) {
    dispatch({ type: FAIL_PLOT_SIMULATION, payload: error.message });
  }
};
