import loginSagas from '../features/Login/sagas';
import {all, fork} from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([fork(loginSagas)]);
}
