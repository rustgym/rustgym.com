import {router} from './router.js'
import {auth} from './auth.js'
import {client} from './client.js'
import {feedback} from './feedback.js'


let root = {
  router: new router(),
  auth: new auth(),
  client: new client(),
  feedback: new feedback(),
}

export {root}