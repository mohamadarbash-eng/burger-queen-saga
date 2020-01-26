import { put, delay } from 'redux-saga/effects';
import {
    logoutSucceed,
    logout as logoutAuth,
    authStart,
    authSuccess,
    checkAuthTimeout,
    authFail
} from "../store/actions";
import axios from "axios";

export function* logout(action) {
   yield localStorage.removeItem('idToken');
   yield localStorage.removeItem('expiresDate');
   yield localStorage.removeItem('localId');
   yield put(logoutSucceed());
}


export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(logoutAuth());
}


export function* authUserSaga(action) {
   yield put(authStart());
        const body = {
            email: action.email,
            password: action.password,
            returnSecureToken: true
        };
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDnpJhSD3NSnNy_g2jNRccmWT68mADMDs0";
        if (!action.isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnpJhSD3NSnNy_g2jNRccmWT68mADMDs0";
        }
        try {
            const {data} = yield axios.post(url,body);
            yield localStorage.setItem('idToken', data.idToken);
            const expirationDate  = new Date( new Date().getTime() + (data.expiresIn * 1000));
            yield localStorage.setItem('expirationDate', expirationDate);
            yield localStorage.setItem('localId', data.localId);
            yield put(authSuccess(data));
            yield put(checkAuthTimeout(data.expiresIn));
        } catch (error) {
            yield put(authFail(error));
        }
    }
