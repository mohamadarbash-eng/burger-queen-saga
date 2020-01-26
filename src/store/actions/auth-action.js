import actionsEnum from "./action-types";
import axios from "axios";

export const authSuccess = (tokenObject) => {
    return {
        type: actionsEnum.AUTH_SUCCESS,
        ...tokenObject
    };
};

export const authFail = (error) => {
    return {
        type: actionsEnum.AUTH_FAIL,
        error
    };
};

export const authStart = () => {
    return {
        type: actionsEnum.AUTH_START
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actionsEnum.AUTH_CHECK_TIMEOUT,
        expirationTime
    }
};

export const logout = () => {
    return {
        type: actionsEnum.AUTH_INIT_LOGOUT
    };
};

export const logoutSucceed = () => {
  return {
      type: actionsEnum.LOG_OUT
  };
};

export const setAuthRedirect = (path) => {
    return {
        type: actionsEnum.SET_AUTH_REDIRECT_PATH,
        path
    }
};

export const authCheckState = () => {
  return dispatch => {
      const token = localStorage.getItem('idToken');
      if (!token) {
          dispatch(logout());
      } else {
          const expirationTime = localStorage.getItem('expirationDate');
          if (new Date() >= new Date(expirationTime)) {
              dispatch(logout());
          } else {
              dispatch(authSuccess({ localId: localStorage.getItem('localId'), idToken: token}));
              dispatch(checkAuthTimeout(((new Date(expirationTime)).getTime() - (new Date()).getTime() ) / 1000));
          }
      }
  }
};

export const auth = (email, password, isSignUp) => {
    return {
        type: actionsEnum.AUTH_USER,
        email,
        password,
        isSignUp
    }
};
