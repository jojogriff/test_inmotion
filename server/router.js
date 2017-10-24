const Authentication = require('./controllers/authentication');
const Movies = require('./controllers/movies');
const passport = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  // AUTHENTICATION ROUTES
  app.post('/login', requireSignin, Authentication.login);
  app.post('/register', Authentication.register);

  // MOVIE ROUTES
  app.get('/users/:user_id/movies', Movies.getAllUserMovies);
  app.get('/movies', Movies.getAllMovies);
  app.post('/movie', requireAuth, Movies.newMovie);
  app.post('/movie/:movie_id', requireAuth, Movies.updateMovie);
  app.delete('/movie/:movie_id', requireAuth, Movies.deleteMovie);
};
