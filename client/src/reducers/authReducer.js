import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER
} from '../actions/actionTypes';
import { REHYDRATE } from 'redux-persist/constants';

const INITIAL_STATE = {
  user: {},
  loggedIn: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REHYDRATE:
      const incoming = action.payload.auth;
      if (incoming) return { ...state, ...incoming };
      return state;
    case REGISTER_USER:
      return { ...state, user: action.payload, loggedIn: true };
    case LOGIN_USER:
      return { ...state, user: action.payload, loggedIn: true };
    case LOGOUT_USER:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
