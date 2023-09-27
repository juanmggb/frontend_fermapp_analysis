import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { simulationPlotReducer } from "./reducers/simulationReducers";
import {
  dataOptReducer,
  optParamsReducer,
} from "./reducers/optimizationReducers";
import {
  userListReducer,
  createUserReducer,
  loginUserReducer,
  updateUserReducer,
} from "./reducers/userReducers";

// Define the RESET_STORE action type
const RESET_STORE = "RESET_STORE";

// Define your individual reducers

const initialState = {
  // Define the initial state for each reducer
  simulationPlot: simulationPlotReducer(undefined, {}),
  dataOpt: dataOptReducer(undefined, {}),
  optParams: optParamsReducer(undefined, {}),
  userList: userListReducer(undefined, {}),
  createUser: createUserReducer(undefined, {}),
  loginUser: loginUserReducer(undefined, {}),
  updateUser: updateUserReducer(undefined, {}),
};

const rootReducer = combineReducers({
  // Pass each reducer with their initial state
  simulationPlot: simulationPlotReducer,
  dataOpt: dataOptReducer,
  optParams: optParamsReducer,
  userList: userListReducer,
  createUser: createUserReducer,
  loginUser: loginUserReducer,
  updateUser: updateUserReducer,
});

const mainReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    return initialState;
  }

  return rootReducer(state, action);
};

const store = createStore(
  mainReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
