import React, {Component} from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';

import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

import { Copyright } from '../components/Copyright.js';
import { SignInLink } from '../components/SignInLink.js';
import {ForgetPasswordLink} from '../components/ForgetPasswordLink.js'

import {classes} from '../styles.js';

class SignUpLoader extends Component {
  componentDidMount(){
    S.auth.loadSignUp();
  }
  render(){
    return <SignUp/>
  }
}

const SignUp = observer(() => 
  <Container component="main" maxWidth="xs">
    <div className={classes().paper}>
      <Avatar className={classes().avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form className={classes().form} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={({target}) => S.auth.onChangeFirstName(target)}
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              error={!!S.auth.helperText.first_name}
              helperText={S.auth.helperText.first_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={({target}) => S.auth.onChangeLastName(target)}
              variant="outlined"
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              error={!!S.auth.helperText.last_name}
              helperText={S.auth.helperText.last_name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              readOnly
              value={S.auth.email}
              error={!!S.auth.helperText.email}
              helperText={S.auth.helperText.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={({target}) => S.auth.onChangePassword(target)}
              error={!!S.auth.helperText.password}
              helperText={S.auth.helperText.password}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              onChange={({target}) => S.auth.onChangeAccepted(target)}
              checked={S.auth.accepted}
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I have read the Terms and Conditions"
            />
          </Grid>
        </Grid>
        <Button
          disabled={!S.auth.accepted}
          fullWidth
          variant="contained"
          color="primary"
          className={classes().submit}
          onClick={() => S.auth.onClickSignUp()}
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item xs>
            <ForgetPasswordLink/>
          </Grid>
          <Grid item>
            <SignInLink/>
          </Grid>
        </Grid>
      </form>
    </div>
    <Box mt={5}>
      <Copyright />
    </Box>
  </Container>
)

export { SignUp, SignUpLoader }