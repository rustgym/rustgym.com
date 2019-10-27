import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import {root} from './stores/root.js'
import {App} from './views/App.js';

window.S = root

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


