import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

export default (preloadedState) => {
  return createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, createLogger())
    )
  );
};
