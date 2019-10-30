import React, { Fragment } from 'react';

import { Topbar } from './Topbar.js';

const Layout = ({ children }) => 
  <Fragment>
    <Topbar/>
    {children}
  </Fragment>

export {Layout}