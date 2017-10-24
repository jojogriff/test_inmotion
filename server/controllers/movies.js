const Movie = require('../models/movie');

exports.getAllUserMovies = (req, res, next) => {
  Movie.find({uploadedByUser: req.params.user_id}, (err, movies) => {
    if (err) return next(err);
    res.json({
      success: true,
      movies
    }).end();
  });
};
exports.getAllMovies = (req, res, next) => {
  Movie.find({}, function (err, movies) {
    if (err) return next(err);
    res.json({
      success: true,
      movies
    }).end();
  });
};
exports.newMovie = (req, res, next) => {
  let movie = req.body;
  movie.uploadedByUser = req.user._id;
  movie.actors = movie.actors.split(",");
  Movie.create(movie, (err, newMovie) => {
    if (err) return next(err);
    res.status(201).json({
      success: true,
      movie: newMovie
    }).end();
  });
};
exports.updateMovie = (req, res, next) => {
  const user = req.user;
  let movie = req.body;
  movie.actors = movie.actors.split(",");
  Movie.findOneAndUpdate({_id: movie._id, uploadedByUser: user._id}, req.body, {new: true}, (err, updatedMovie) => {
    if (err) return next(err);
    if (!updatedMovie) {
      res.json({
        success: true,
        error: true,
        message: 'Unable to locate that movie.'
      }).end();
    } else {
      res.json({
        success: true,
        movie: updatedMovie
      }).end();
    }
  });
};
exports.deleteMovie = (req, res, next) => {
  const user = req.user;
  const movie = req.body;
  Movie.findOneAndRemove({_id: movie._id, uploadedByUser: user._id}, (err, movie) => {
    if (err) return next(err);
    if (!movie) {
      res.json({
        success: true,
        error: true,
        message: 'Unable to locate that movie.'
      }).end();
    } else {
      res.json({ success: true }).end();
    }
  });
};
