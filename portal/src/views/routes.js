import React from 'react';
import { Home } from "./Home.js";
import { SignIn } from './SignIn.js';
import { Invitation } from './Invitation.js';

let routes = {
    "#home": <Home/>,
    "#signin": <SignIn/>,
    "#invitation": <Invitation/>
}


export { routes }