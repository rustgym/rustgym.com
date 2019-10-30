import React from 'react';
import {observer} from 'mobx-react';
import {routes} from './routes.js';
import {ErrorSnackbar} from './ErrorSnackbar.js';
import {Layout} from './Layout.js'

const App = observer(() => 
  <div>
    <Layout> 
      {routes[S.router.path]}
    </Layout>
    <ErrorSnackbar/>
  </div>
)

export {App}