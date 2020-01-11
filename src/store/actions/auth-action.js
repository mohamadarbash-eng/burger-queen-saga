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
  return dispatch => {
      setTimeout(() => {
          dispatch(logout());
      }, expirationTime * 1000)
  }
};

export const logout = () => {
    return {
        type: actionsEnum.LOG_OUT
    }
};

export const setAuthRedirect = (path) => {
    return {
        type: actionsEnum.SET_AUTH_REDIRECT_PATH,
        path
    }
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const body = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDnpJhSD3NSnNy_g2jNRccmWT68mADMDs0";
        if (!isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnpJhSD3NSnNy_g2jNRccmWT68mADMDs0";
        }
        axios.post(url,
            body
        ).then(({data}) => {
            dispatch(authSuccess(data));
            dispatch(checkAuthTimeout(data.expiresIn))
        }).catch((error) => dispatch(authFail(error)))
    };
};
