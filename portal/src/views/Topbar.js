import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { PropTypes } from 'mobx-react';




const Topbar = () =>
  <AppBar>
    <Toolbar>
      <Typography variant="h6" >
        Rust Gym 
      </Typography>
    </Toolbar>
  </AppBar>


export {Topbar}