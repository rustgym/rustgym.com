import React from 'react';
import _ from 'lodash';
import Link from '@material-ui/core/Link';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {navItems} from '../routes.js';
import {classes} from '../styles.js';

const LeftNav = () => 
  <Drawer
    className={classes().drawer}
    variant="permanent"
    classes={{
      paper: classes().drawerPaper,
    }}
    >
    <div className={classes().toolbar} />
    <List>
      {_.map(navItems, (item, key) => (
        <Link href={key} key={key} underline="none">
        <ListItem button>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>

        </Link>
      ))}
    </List>
  </Drawer>

export {LeftNav}