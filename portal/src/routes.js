import React from 'react';
import { Home } from './views/Home.js';
import { SignIn } from './views/SignIn.js';
import { Invitation } from './views/Invitation.js';
import { SignUp} from './views/SignUp.js';

let routes = {
  '#home': <Home/>,
  '#signin': <SignIn/>,
  '#invitation': <Invitation/>,
  '#signup': <SignUp/>
}

let titles = {
  '#home': 'Home',
  '#signin': 'Sign In',
  '#invitation': 'Invitation',
  '#signup': 'Sign Up'
}

export { routes, titles }