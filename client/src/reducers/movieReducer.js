import {
  GET_MOVIES,
  NEW_MOVIE,
  UPDATE_MOVIE,
  DELETE_MOVIE
} from '../actions/actionTypes';
import { REHYDRATE } from 'redux-persist/constants';

const INITIAL_STATE = {
  movies: [],
  deletedMovie: {},
  newMovie: {},
  updatedMovie: {}
};

export default (state = INITIAL_STATE, action) => {
  let newMovies = [];
  let idx = -1;
  switch (action.type) {
    case REHYDRATE:
      const incoming = action.payload.movies;
      if (incoming) {
        return { ...state, ...incoming };
      }
      return state;
    case GET_MOVIES:
      return { ...state, movies: action.payload };
    case NEW_MOVIE:
      const newMovie = action.payload;
      newMovies = [...state.movies, newMovie];
      return { ...state, newMovie, movies: newMovies };
    case UPDATE_MOVIE:
      const updatedMovie = action.payload;
      newMovies = [...state.movies];
      idx = newMovies.findIndex(m => {return m._id === updatedMovie._id});
      newMovies[idx] = updatedMovie;
      return { ...state, updatedMovie, movies: newMovies };
    case DELETE_MOVIE:
      const deletedMovie = action.payload;
      newMovies = [...state.movies];
      idx = newMovies.findIndex(m => {return m._id === deletedMovie._id});
      newMovies.splice(idx, 1);
      return { ...state, deletedMovie, movies: newMovies };
    default:
      return state;
  }
};
