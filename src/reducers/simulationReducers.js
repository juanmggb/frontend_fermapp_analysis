import {
  FAIL_PLOT_SIMULATION,
  REQUEST_PLOT_SIMULATION,
  RESET_PLOT_SIMULATION,
  SUCCESS_PLOT_SIMULATION,
} from "../constants/simulationConstants";

export const simulationDataReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_PLOT_SIMULATION:
      return { loading: true };

    case SUCCESS_PLOT_SIMULATION:
      return { loading: false, simulation: action.payload };

    case FAIL_PLOT_SIMULATION:
      return { loading: false, error: action.payload };

    case RESET_PLOT_SIMULATION:
      return {};

    default:
      return state;
  }
};
