import { makeStyles } from '@material-ui/core/styles';
import {colors } from '@material-ui/core';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const classes = makeStyles(() => ({
    success: {
        backgroundColor: green[600],
      },
      error: {
        backgroundColor: theme.palette.error.dark,
      },
      info: {
        backgroundColor: theme.palette.primary.main,
      },
      warning: {
        backgroundColor: amber[700],
      },
      icon: {
        fontSize: 20,
      },
      iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
      },
      message: {
        display: 'flex',
        alignItems: 'center',
      },
        '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(20),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    '@global': {
        body: {
          backgroundColor: theme.palette.common.white,
        },
      },
      paper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
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
        padding: theme.spacing(0, 2),
        display: 'flex',
        alignItems: 'center'
      },
      searchIcon: {
        marginRight: theme.spacing(2),
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
        zIndex: theme.zIndex.appBar + 100
      },
      searchPopperContent: {
        marginTop: theme.spacing(1)
      },
      trialButton: {
        marginLeft: theme.spacing(2),
        color: theme.palette.white,
        backgroundColor: colors.green[600],
        '&:hover': {
          backgroundColor: colors.green[900]
        }
      },
      trialIcon: {
        marginRight: theme.spacing(1)
      },
      notificationsButton: {
        marginLeft: theme.spacing(1)
      },
      notificationsBadge: {
        backgroundColor: colors.orange[600]
      },
      logoutButton: {
        marginLeft: theme.spacing(1)
      },
      logoutIcon: {
        marginRight: theme.spacing(1)
      }}));

export {classes}