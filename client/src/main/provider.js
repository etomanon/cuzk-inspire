import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import reducers from 'src/reducers';

import Transition from 'src/main/transition';

const middlewares = [promiseMiddleware()];
 
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(reducers);

export default class TransitionRouter extends Component {
  render = () => {
    return (
      <Provider store={store}>
        <Transition />
      </Provider>
    )
  }
}