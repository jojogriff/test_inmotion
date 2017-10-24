import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import '../../assets/css/Movie.css';
const MovieListItem = ({movie, user, deleteMovie}) => {
  const deleteMovieWrapper = () => {
    deleteMovie(movie, user);
  };
  return (
    <div className="row">
      <div className="col-sm-6 col-md-4">
        <div className="thumbnail">
          <img className="Movie-poster-thumb" src={movie.posterImage} alt={movie.title} />
          <div className="caption">
            <h3>{movie.title} <small>{movie.year}</small></h3>
            <p><b>Genre:</b> {movie.genre}</p>
            <p><b>Rating:</b> {movie.rating}</p>
            <p><b>Actors:</b> {movie.actors.join(", ")}</p>
            <p>
              {user._id === movie.uploadedByUser && <Link to={`movies/${movie._id}/edit`} className="btn btn-default">
                Update
              </Link>}
              {user._id === movie.uploadedByUser && <button className="btn btn-danger" onClick={deleteMovieWrapper}>
                Delete
              </button>}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

MovieListItem.propTypes = {
  movie: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  deleteMovie: PropTypes.func.isRequired
};

export default MovieListItem;
