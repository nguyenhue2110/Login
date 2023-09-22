import * as types from './types';

export function requestLogin(username, password) {
  return {
    type: types.LOGIN_REQUEST,
    username,
    password,
  };
}

export function loginFailed(error: string) {
  return {
    type: types.LOGIN_FAILED,
    error,
  };
}

export function onLoginResponse(response) {
  return {
    type: types.LOGIN_RESPONSE,
    response,
  };
}

export function onLoginsuccess(response) {
  return {
    type: types.LOGIN_SUCCESS,
    response,
  };
}
