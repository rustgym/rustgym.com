import React from 'react';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import SchoolIcon from '@material-ui/icons/School';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import RoomIcon from '@material-ui/icons/Room';
import PeopleIcon from '@material-ui/icons/People';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

import { HomeLoader } from './views/Home.js';
import { SignIn } from './views/SignIn.js';
import { InvitationLoader } from './views/Invitation.js';
import { SignUpLoader } from './views/SignUp.js';
import { MembershipLoader } from './views/Membership.js';


const route = (path) => {
  switch(path){
    case '#home': return <HomeLoader/>;
    case '#membership': return <MembershipLoader/>;
    case '#signin': return <SignIn/>;
    case '#invitation': return <InvitationLoader/>;
    case '#signup': return <SignUpLoader/>;
    default: return <div> 404 </div>;
  }
}

const showLeftNav = (path) => {
  switch(path){
    case '#home':
    case '#membership':
      return true;
    case '#signin':
    case '#invitation':
    case '#signup':
    default:
      return false;
  }
}

const navItems = {
  '#home': {
    text: 'Home',
    icon: <EventAvailableIcon/>,
  },
  '#membership': {
    text: 'Membership',
    icon: <CardMembershipIcon/>,
  },
  '#scholarship': {
    text: 'Scholarship',
    icon: <SchoolIcon/>,
  },
  '#prediction': {
    text: 'Prediction',
    icon: <TrendingUpIcon/>,
  },
  '#people': {
    text: 'People',
    icon: <PeopleIcon/>,
  },
  '#location': {
    text: 'Location',
    icon: <RoomIcon/>,
  },
  '#payout': {
    text: 'Payout',
    icon: <AccountBalanceIcon/>,
  },
  '#support': {
    text: 'Support',
    icon: <ContactSupportIcon/>,
  }
}


const title = (path) => {
  switch(path){
    case '#home':
      return 'Home';
    case '#membership':
      return 'Membership';
    case '#signin':
      return 'Sign In';
    case '#invitation':
      return 'Invitation';
    case '#signup':
      return 'Sign Up';
    default:
      return 'Rust Gym';
  }
}

export { route, title, showLeftNav, navItems }