import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import logger from 'redux-logger';

import reducers from 'src/reducers';

import Transition from 'src/main/transition'

const createStoreWithMiddleware = applyMiddleware(logger,
  promiseMiddleware())(createStore);

export default class TransitionRouter extends Component {
  render = () => {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <Transition />
      </Provider>
    )

  }

}