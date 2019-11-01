import React, { Fragment } from 'react';

import { Topbar } from './Topbar.js';

const Layout = ({ children }) => 
  <Fragment>
    <Topbar/>
    <div style={{marginTop: 70}}>
      {children}
    </div>
  </Fragment>

export {Layout}