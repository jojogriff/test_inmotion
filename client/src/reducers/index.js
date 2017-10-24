import { combineReducers } from 'redux';

import AuthReducer from './authReducer';
import MovieReducer from './movieReducer';

export default combineReducers({
  auth: AuthReducer,
  movies: MovieReducer
});
