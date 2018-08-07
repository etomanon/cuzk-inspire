import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from 'src/main/App';

export default class TransitionRouter extends Component {
  render = () => {
    return (
        <BrowserRouter>
          <Route path="/" component={App} />
        </BrowserRouter>
    )

  }
}