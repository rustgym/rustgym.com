import React from 'react';
import {observer} from 'mobx-react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import clsx from 'clsx';
import {classes} from '../styles.js';

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
      className={clsx(classes().error)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes().message}>
          <ErrorIcon className={clsx(classes().icon, classes().iconVariant)} />
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
