import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { simulationDataReducer } from "./reducers/simulationReducers";
import { optParamsReducer } from "./reducers/optimizationReducers";
import {
  userListReducer,
  createUserReducer,
  loginUserReducer,
  updateUserReducer,
} from "./reducers/userReducers";

// Define the RESET_STORE action type
const RESET_STORE = "RESET_STORE";

// Define your individual reducers

const token = JSON.parse(localStorage.getItem("token") || null);

const initialState = {
  // Define the initial state for each reducer

  // dataOpt: dataOptReducer(undefined, {}),
  // optParams: optParamsReducer(undefined, {}),
  // userList: userListReducer(undefined, {}),
  // createUser: createUserReducer(undefined, {}),
  // loginUser: loginUserReducer(undefined, {}),
  // updateUser: updateUserReducer(undefined, {}),
  loginUser: { userInfo: token },
};

const rootReducer = combineReducers({
  // Pass each reducer with their initial state
  simulationData: simulationDataReducer,
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
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
