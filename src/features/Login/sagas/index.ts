import { all, takeEvery } from 'redux-saga/effects';
import * as types from '../types';
import loginSaga from './LoginSaga';

// export const loginSagas = [takeEvery(types.LOGIN_REQUEST, loginSaga)];

export default function* watch() {
  yield all([takeEvery(types.LOGIN_REQUEST, loginSaga)]);

}
