import { LOGIN_STATE } from '../constants';

export const initLoginState = LOGIN_STATE.NOT_LOGIN;

export const sessionsActionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
}

export const sessionsReducer = (state, action) => {
  switch (action.type) {
    case sessionsActionTypes.LOGIN:
      return LOGIN_STATE.LOGIN;
    case sessionsActionTypes.LOGOUT:
      return LOGIN_STATE.NOT_LOGIN;
    default:
      throw new Error();
  }
}
