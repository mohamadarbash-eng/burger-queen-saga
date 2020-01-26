import { logout } from "./auth";
import  { takeEvery } from 'redux-saga/effects';
import actionsEnum from "../store/actions/action-types";

export function* watchAuth() {
    yield takeEvery(actionsEnum.AUTH_INIT_LOGOUT, logout);
}
