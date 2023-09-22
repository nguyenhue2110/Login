import createReducer from '../../lib/createReduces';
import * as types from './types';

const initialState = {
  isLoginLoading: false,
  isLoggedIn: false,
  username: '',
  isSucess: false,
};

export const loginReducer = createReducer(initialState, {
  [types.LOGIN_REQUEST](state, action) {
    return {
      ...state,
      username: action.username,
    };
  },

  [types.LOGIN_SUCCESS](state, action) {
    return {
      ...state,
      ...action,
      isLoggedIn: true,
    };
  },
});

export default loginReducer;
