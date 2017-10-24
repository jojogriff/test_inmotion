import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import {persistStore, autoRehydrate} from 'redux-persist'
import configureStore from './store/configureStore'

import App from './components/App/AppContainer';
import Login from './components/Login/LoginContainer';
import Register from './components/Register/RegisterContainer';
import About from './components/About/AboutContainer';
import AllMovies from './components/AllMovies/AllMoviesContainer';
import NewMovie from './components/Movie/NewMovieContainer';
import EditMovie from './components/Movie/EditMovieContainer';

const store = configureStore({}, undefined, autoRehydrate());
persistStore(store, {}, () => {
  function checkAuth(nextState, replace) {
    const token = localStorage.getItem('token');
    if (token) {
      replace({
        pathname: '/about',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }
  function requireAuth(nextState, replace) {
    const token = localStorage.getItem('token');
    if (!token) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }

  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <Route path="login" component={Login} onEnter={checkAuth} />
          <Route path="register" component={Register} onEnter={checkAuth} />
          <Route path="about" component={About} onEnter={requireAuth} />
          <Route path="movies" component={AllMovies} onEnter={requireAuth} />
          <Route path="movies/new" component={NewMovie} onEnter={requireAuth} />
          <Route path="movies/:movie_id/edit" component={EditMovie} onEnter={requireAuth} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('root')
  );
});
