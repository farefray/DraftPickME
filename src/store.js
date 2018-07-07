import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';

import {
  createLogger
} from 'redux-logger';
import {
  nprogressMiddleware
} from 'redux-nprogress';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      thunk, 
      loggerMiddleware, 
      nprogressMiddleware(),
      promiseMiddleware()
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
