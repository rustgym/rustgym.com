import React from 'react';
import {observer} from 'mobx-react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Copyright} from '../components/Copyright.js';
import {SignUpLink} from '../components/SignUpLink.js';
import {ForgetPasswordLink} from '../components/ForgetPasswordLink.js';

import {classes} from '../styles.js';

const SignIn = observer(() => 
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes().paper}>
      <Avatar className={classes().avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes().form} noValidate>
        <TextField
          value={S.auth.email}
          onChange={({target}) => S.auth.onChangeEmail(target)}
          variant="outlined"
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          error={S.auth.helperTextEmail.length != 0 || S.auth.helperTextInfo.length != 0}
          helperText={S.auth.helperTextEmail || S.auth.helperTextInfo}
        />
        <TextField
          value={S.auth.password}
          onChange={({target}) => S.auth.onChangePassword(target)}
          variant="outlined"
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          error={S.auth.helperTextPassword.length != 0 || S.auth.helperTextInfo.length != 0}
          helperText={S.auth.helperTextPassword || S.auth.helperTextInfo}
        />
        <Button
          onClick={() => S.auth.onClickSignIn()}
          fullWidth
          variant="contained"
          color="primary"
          className={classes().submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <ForgetPasswordLink/>
          </Grid>
          <Grid item>
            <SignUpLink/>
          </Grid>
        </Grid>
      </form>
    </div>
    <Box mt={8}>
      <Copyright />
    </Box>
  </Container>
)

export { SignIn }