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
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiresDate');
    localStorage.removeItem('localId');
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
            localStorage.setItem('idToken', data.idToken);
            const expirationDate  = new Date( new Date().getTime() + (data.expiresIn * 1000));
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('localId', data.localId);
            dispatch(authSuccess(data));
            dispatch(checkAuthTimeout(data.expiresIn))
        }).catch((error) => dispatch(authFail(error)))
    };
};
