import React from 'react';
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  Input,
  colors,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ClickAwayListener
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import { PropTypes } from 'mobx-react';
import { makeStyles } from '@material-ui/styles';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  search: {
    backgroundColor: 'rgba(255,255,255, 0.1)',
    borderRadius: 4,
    flexBasis: 300,
    height: 36,
    padding: S.theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    marginRight: S.theme.spacing(2),
    color: 'inherit'
  },
  searchInput: {
    flexGrow: 1,
    color: 'inherit',
    '& input::placeholder': {
      opacity: 1,
      color: 'inherit'
    }
  },
  searchPopper: {
    zIndex: S.theme.zIndex.appBar + 100
  },
  searchPopperContent: {
    marginTop: S.theme.spacing(1)
  },
  trialButton: {
    marginLeft: S.theme.spacing(2),
    color: S.theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  },
  trialIcon: {
    marginRight: S.theme.spacing(1)
  },
  notificationsButton: {
    marginLeft: S.theme.spacing(1)
  },
  notificationsBadge: {
    backgroundColor: colors.orange[600]
  },
  logoutButton: {
    marginLeft: S.theme.spacing(1)
  },
  logoutIcon: {
    marginRight: S.theme.spacing(1)
  }
}));


const Topbar = () =>
  <AppBar>
    <Toolbar>
      <Typography variant="h6" className={useStyles().flexGrow}>
        Rust Gym 
      </Typography>
      <Button
      className={useStyles().logoutButton}
      color="inherit"
      onClick={() => S.auth.onClickSignOut()}
    >
      <InputIcon className={useStyles().logoutIcon} />
        Sign out
    </Button>
    </Toolbar>
  </AppBar>


export {Topbar}