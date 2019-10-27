import React from 'react';
import {observer} from 'mobx-react';
import {Topbar} from './Topbar.js';
import {routes} from './routes.js';


const App = observer(() => 
  <div>
    <Topbar/>
    {routes[S.router.path]}
  </div>
)

export {App}