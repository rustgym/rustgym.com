import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const Copyright = () => 
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link href="https://rustgym.com/">
        rustgym.com
    </Link>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>

export {Copyright}