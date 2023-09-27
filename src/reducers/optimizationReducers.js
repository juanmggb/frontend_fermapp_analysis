import {
  FAIL_OPT_DATA,
  FAIL_OPT_PARMS,
  REQUEST_OPT_PARMS,
  RESET_OPT_DATA,
  RESET_OPT_PARMS,
  SAVE_OPT_DATA,
  SUCCESS_OPT_DATA,
  SUCCESS_OPT_PARMS,
} from "../constants/optimizationConstants";

export const dataOptReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_OPT_DATA:
      return { loading: true };

    case SUCCESS_OPT_DATA:
      return { loading: false, data: action.payload };

    case FAIL_OPT_DATA:
      return { loading: false, error: action.payload };

    case RESET_OPT_DATA:
      return {};

    default:
      return state;
  }
};

export const optParamsReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_OPT_PARMS:
      return { loading: true };

    case SUCCESS_OPT_PARMS:
      return { loading: false, data: action.payload };

    case FAIL_OPT_PARMS:
      return { loading: false, error: action.payload };

    case RESET_OPT_PARMS:
      return {};

    default:
      return state;
  }
};
