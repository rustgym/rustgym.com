import React from 'react';

import Typography from '@material-ui/core/Typography';

const Copyright = () => 
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <a href="https://rustgym.com/">
        rustgym.com
    </a>{' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>

export {Copyright}