import React, { Fragment } from 'react';
import {observer} from 'mobx-react';
import {
  AppBar,
  Button,
  Toolbar,
  Link,
  IconButton,
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

const BarItems = () => 
  <Fragment>
    <Typography variant="h6" >
      {S.auth.session.first_name} {S.auth.session.last_name}
    </Typography>
    <SignOutButton/>
  </Fragment>

const Topbar = observer(() =>
  <AppBar style={{zIndex: 2000}} >
    <Toolbar>
      <Link 
        variant="h6" 
        style={{flexGrow: 1, color: "inherit" }}
        href="#home"
      >
        Rust Gym
      </Link>
      {
        S.auth.session ?
          <BarItems/>
        :
          null
      }
    </Toolbar>
  </AppBar>
)

export {Topbar}