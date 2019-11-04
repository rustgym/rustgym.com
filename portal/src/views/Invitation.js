import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {observer} from 'mobx-react';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import {Copyright} from '../components/Copyright.js';
import {classes} from '../styles.js';

const Invitation = observer(() => {
  S.auth.loadInvitation();
  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes().paper}>
      <Avatar className={classes().avatar}>
        <MailOutlineIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Invitation
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
          error={S.auth.error}
        />
        <Button
          onClick={() => S.auth.onClickSendInvitation()}
          fullWidth
          variant="contained"
          color="primary"
          className={classes().submit}
        >
          Send Invitation
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#signin" variant="body2">
              Sign In
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
    <Box mt={8}>
      <Copyright />
    </Box>
  </Container>
  )
})

export { Invitation }