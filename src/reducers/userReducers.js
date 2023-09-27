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
  RESET_UPDATE_USER,
  RESET_USER_LIST,
  SUCCESS_CREATE_USER,
  SUCCESS_LOGIN_USER,
  SUCCESS_UPDATE_USER,
  SUCCESS_USER_LIST,
} from "../constants/userConstants";

export const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_USER_LIST:
      return { loading: true };

    case SUCCESS_USER_LIST:
      return { loading: false, users: action.payload };

    case FAIL_USER_LIST:
      return { loading: false, error: action.payload };

    case RESET_USER_LIST:
      return {};

    default:
      return state;
  }
};

export const createUserReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_CREATE_USER:
      return { loading: true };

    case SUCCESS_CREATE_USER:
      return { loading: false, success: true };

    case FAIL_CREATE_USER:
      return { loading: false, error: action.payload };

    case RESET_CREATE_USER:
      return {};

    default:
      return state;
  }
};

export const loginUserReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_LOGIN_USER:
      return { loading: true };

    case SUCCESS_LOGIN_USER:
      return { loading: false, userInfo: action.payload };

    case FAIL_LOGIN_USER:
      return { loading: false, error: action.payload };

    case RESET_LOGIN_USER:
      return {};

    default:
      return state;
  }
};

export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_UPDATE_USER:
      return { loading: true };

    case SUCCESS_UPDATE_USER:
      return { loading: false, success: true };

    case FAIL_UPDATE_USER:
      return { loading: false, error: action.payload };

    case RESET_UPDATE_USER:
      return {};

    default:
      return state;
  }
};
