import React from 'react';
import {observer} from 'mobx-react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import { amber, green } from '@material-ui/core/colors';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import clsx from 'clsx';


const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: S.theme.palette.error.dark,
  },
  info: {
    backgroundColor: S.theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: S.theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const ErrorSnackbar = observer(() => 
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    open={S.errors.open}
    autoHideDuration={6000}
  >
    <SnackbarContent
      className={clsx(useStyles1().error)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={useStyles1().message}>
          <ErrorIcon className={clsx(useStyles1().icon, useStyles1().iconVariant)} />
          Internal Server Error
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={() => S.errors.onClickClose()}>
          <CloseIcon/>
        </IconButton>,
      ]}
    />
  </Snackbar>
)

export {ErrorSnackbar}
