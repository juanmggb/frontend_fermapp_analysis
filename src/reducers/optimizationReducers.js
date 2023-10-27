import {
  FAIL_OPT_PARMS,
  REQUEST_OPT_PARMS,
  RESET_OPT_PARMS,
  SUCCESS_OPT_PARMS,
} from "../constants/optimizationConstants";

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
