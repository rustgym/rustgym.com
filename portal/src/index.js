import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Button from '@material-ui/core/Button';

function App() {
  return (
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

  