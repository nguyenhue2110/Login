import loginSagas from '../features/login/sagas';
import {all, fork} from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([fork(loginSagas)]);
}
