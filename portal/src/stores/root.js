import {router} from './router.js'
import {auth} from './auth.js'
import {client} from './client.js'
import {errors} from './errors.js'

import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

let root = {
  router: new router(),
  auth: new auth(),
  client: new client(),
  errors: new errors(),
  theme,
}

export {root}