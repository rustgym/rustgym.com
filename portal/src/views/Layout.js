import React, { Fragment } from 'react';
import { Topbar } from './Topbar.js';
import {LeftNav} from './LeftNav.js';
import {showLeftNav} from '../routes.js';
import {classes} from '../styles.js';
import { observer } from 'mobx-react-lite';

const Layout = observer(({ children }) => 
  <div className={classes().root}>
    <Topbar/>
    {showLeftNav(S.router.path) ? <LeftNav/> : null}
    <div className={classes().content}>
      {children}
    </div>
  </div>
)

export {Layout}