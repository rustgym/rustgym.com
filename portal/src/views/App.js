import React from 'react';
import {observer} from 'mobx-react';
import {route} from '../routes.js';
import {ErrorSnackbar} from './ErrorSnackbar.js';
import {SuccessSnackbar} from './SuccessSnackbar.js';
import {Layout} from './Layout.js'

const App = observer(() => 
  <div>
    <SuccessSnackbar/>
    <Layout> 
      {route(S.router.path)}
    </Layout>
    <ErrorSnackbar/>
  </div>
)

export {App}