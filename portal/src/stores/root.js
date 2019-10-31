import {router} from './router.js'
import {auth} from './auth.js'
import {client} from './client.js'
import {errors} from './errors.js'


let root = {
  router: new router(),
  auth: new auth(),
  client: new client(),
  errors: new errors(),
}

export {root}