import React, { Fragment } from 'react';
import {observer} from 'mobx-react';
import {
  AppBar,
  Button,
  Toolbar,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import InputIcon from '@material-ui/icons/Input';
import {classes} from '../styles.js'


const SignOutButton = () =>
  <Button
    className={classes().logoutButton}
    color="inherit"
    onClick={() => S.auth.onClickSignOut()}
  >
    <InputIcon className={classes().logoutIcon} />
    Sign out
  </Button>


const Topbar = observer(() =>
  <AppBar>
    <Toolbar>
      <Typography variant="h6" className={classes().flexGrow}>
        Rust Gym 
      </Typography>
      {
        S.auth.session ?
          <Fragment>
            <Typography variant="h6">
                {S.auth.session.first_name} {S.auth.session.last_name}
            </Typography>
            <SignOutButton/>
          </Fragment>
        :
          null
      }
    </Toolbar>
  </AppBar>
)

export {Topbar}