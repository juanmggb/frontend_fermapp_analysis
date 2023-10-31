import {
  FAIL_OPT_MEDIA_COMP,
  FAIL_OPT_PARMS,
  REQUEST_OPT_MEDIA_COMP,
  REQUEST_OPT_PARMS,
  RESET_OPT_MEDIA_COMP,
  RESET_OPT_PARMS,
  SUCCESS_OPT_MEDIA_COMP,
  SUCCESS_OPT_PARMS,
} from "../constants/optimizationConstants";

export const parameterOptimizationReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case REQUEST_OPT_PARMS:
      return { loading: true };

    case SUCCESS_OPT_PARMS:
      return {
        loading: false,
        simulatedData: {
          time: payload.time,
          x: payload.x,
          s: payload.s,
          p: payload.p,
        },
        best_params: payload.best_params,
        minError: payload.error,
        model_type: payload.model_type,
      };

    case FAIL_OPT_PARMS:
      return { loading: false, error: payload };

    case RESET_OPT_PARMS:
      return {};

    default:
      return state;
  }
};

export const mediaCompOptimizationReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case REQUEST_OPT_MEDIA_COMP:
      return { loading: true };

    case SUCCESS_OPT_MEDIA_COMP:
      return {
        loading: false,
        response_surface: payload.response_surface,
        model_params: payload.model_params,
        model_metrics: payload.model_metrics,
        data_split: payload.data_split,
        features: payload.features,
        preprocessing: payload.preprocessing,
      };

    case FAIL_OPT_MEDIA_COMP:
      return { loading: false, error: payload };

    case RESET_OPT_MEDIA_COMP:
      return {};

    default:
      return state;
  }
};
