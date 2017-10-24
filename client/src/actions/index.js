import axios from 'axios';
import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  GET_MOVIES,
  NEW_MOVIE,
  UPDATE_MOVIE,
  DELETE_MOVIE
} from './actionTypes';
import { browserHistory } from 'react-router'
import { ROOT_URL } from '../constants';

// ************************************************************************
// *************************** USER ACTIONS *******************************
// ************************************************************************

export function loginUser(user) {
  // Wrapper for thunk.
  return function(dispatch) {
    axios.post(`${ROOT_URL}/login`, user)
      .then((response) => {
        localStorage.setItem('token', user.token)
        browserHistory.push('/about');
        dispatch({type: LOGIN_USER, payload: response.data.user});
      })
      .catch(console.error);
  };
}

export function registerUser(user) {
  // Wrapper for thunk.
  return function(dispatch) {
    // const config = {  headers: { 'Authorization': userToken } };
    axios.post(`${ROOT_URL}/register`, user)
      .then((response) => {
        localStorage.setItem('token', user.token)
        browserHistory.push('/about');
        dispatch({type: REGISTER_USER, payload: response.data.user});
      })
      .catch(console.error);
  };
}


export function logoutUser() {
  localStorage.removeItem('token');
  browserHistory.push('/login');
  return {type: LOGOUT_USER};
}

// ************************************************************************
// *************************** MOVIE ACTIONS *******************************
// ************************************************************************

export function getMovies() {
  // Wrapper for thunk.
  return function(dispatch) {
    // const config = {  headers: { 'Authorization': userToken } };
    axios.get(`${ROOT_URL}/movies`)
      .then((response) => {
        dispatch({type: GET_MOVIES, payload: response.data.movies});
      })
      .catch(console.error);
  };
}

export function newMovie(movie, user) {
  // Wrapper for thunk.
  return function(dispatch) {
    const config = {  headers: { 'Authorization': user.token } };
    axios.post(`${ROOT_URL}/movie`, movie, config)
      .then((response) => {
        browserHistory.push('/movies');
        alert("Successfully created new movie");
        dispatch({type: NEW_MOVIE, payload: response.data.movie});
      })
      .catch(console.error);
  };
}

export function updateMovie(movie, user) {
  // Wrapper for thunk.
  return function(dispatch) {
    const config = {  headers: { 'Authorization': user.token } };
    axios.post(`${ROOT_URL}/movie/${movie._id}`, movie, config)
      .then((response) => {
        browserHistory.push('/movies');
        alert("Successfully updated new movie");
        dispatch({type: UPDATE_MOVIE, payload: response.data.movie});
      })
      .catch(console.error);
  };
}

export function deleteMovie(movie, user) {
  // Wrapper for thunk.
  console.log(user);
  return function(dispatch) {
    const config = {  headers: { 'Authorization': user.token } };
    axios.delete(`${ROOT_URL}/movie/${movie._id}`, movie, config)
      .then((response) => {
        dispatch({type: DELETE_MOVIE, payload: response.data.movie});
      })
      .catch(console.error);
  };
}
