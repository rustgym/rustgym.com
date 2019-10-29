import React from 'react';
import {observer} from 'mobx-react';
import {Topbar} from './Topbar.js';
import {routes} from './routes.js';
import {ErrorSnackbar} from './ErrorSnackbar.js';

const App = observer(() => 
  <div>
    <Topbar/>
    <div>
      {routes[S.router.path]}
    </div>
    <ErrorSnackbar/>
  </div>
)

export {App}