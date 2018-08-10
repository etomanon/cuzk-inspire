import React from 'react';
import ReactDOM from 'react-dom';
import Provider from './main/provider';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
// import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';

ReactDOM.render(<Provider />, document.getElementById('root'));
// registerServiceWorker();
unregister()
