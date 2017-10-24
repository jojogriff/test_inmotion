import React, { PropTypes } from 'react';
import MovieListItem from './MovieListItem';

const MovieList = ({movies, user, deleteMovie}) => {
  if (movies.length < 1) {
    return <p>There are no movies.</p>;
  }
  return (
    <div>
      {movies.map(movie => {
        return <MovieListItem movie={movie} key={movie._id} user={user} deleteMovie={deleteMovie} />;
      })}
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  deleteMovie: PropTypes.func.isRequired
};

export default MovieList;
