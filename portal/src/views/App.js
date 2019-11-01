import React from 'react';
import {observer} from 'mobx-react';
import {routes} from '../routes.js';
import {ErrorSnackbar} from './ErrorSnackbar.js';
import {SuccessSnackbar} from './SuccessSnackbar.js';
import {Layout} from './Layout.js'

const App = observer(() => 
  <div>
    <SuccessSnackbar/>
    <Layout> 
      {routes[S.router.path] || <div>404</div>}
    </Layout>
    <ErrorSnackbar/>
  </div>
)

export {App}