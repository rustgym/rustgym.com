import {router} from './router.js'
import {signin} from './signin.js'
import {client} from './client.js'

let root = {
  router: new router(),
  signin: new signin(),
  client: new client(),
}

export {root}