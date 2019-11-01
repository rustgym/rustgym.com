import React from 'react';
import {observer} from 'mobx-react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CloseIcon from '@material-ui/icons/Close';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import clsx from 'clsx';
import { green } from '@material-ui/core/colors';
import {classes} from '../styles.js';

const SuccessSnackbar = observer(() => 
  <Snackbar
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    open={S.feedback.openSuccess}
    autoHideDuration={6000}
    onClose={() => S.feedback.onClickCloseSuccess()}
  >
    <SnackbarContent
      style={{backgroundColor: green[600]}}
      aria-describedby="client-snackbar"
      message={
        <span 
          id="client-snackbar" 
          className={classes().message}
        >
          <CheckCircleOutlineIcon 
            className={clsx(classes().icon, classes().iconVariant)} 
          />
          {S.feedback.successMessage}
        </span>
      }
      action={[
        <IconButton 
          key="close" 
          aria-label="close" 
          color="inherit" 
          onClick={() => S.feedback.onClickCloseSuccess()}
        >
          <CloseIcon/>
        </IconButton>,
      ]}
    />
  </Snackbar>
)

export {SuccessSnackbar}
