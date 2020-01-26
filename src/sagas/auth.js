import { put } from 'redux-saga/effects';
import actionsEnum from "../store/actions/action-types";

export function* logout(action) {
   yield localStorage.removeItem('idToken');
   yield localStorage.removeItem('expiresDate');
   yield localStorage.removeItem('localId');
   yield put({
        type: actionsEnum.LOG_OUT
    });
}
