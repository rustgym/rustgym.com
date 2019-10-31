import request from 'superagent';

const endpoint = '/api'
class client{
  constructor(){
    this.get = (api, query) => {
      return request
        .get(`${endpoint}/${api}`)
        .query(query)
        .then(res => res.text)
        .catch(err => {
          if (err.status == 401){
            S.router.redirect("#signin")
          }
          if (err.status >= 500) {
            S.errors.status = err.status;
            S.errors.open = true;
          } 
          throw err;  
        })
    }

    this.post = (api, payload) => {
      return request
        .post(`${endpoint}/${api}`)
        .type("form")
        .send(payload)
        .then(res => res.text)
        .catch(err => {
          if (err.status == 401){
            S.router.redirect("#signin")
          }
          if (err.status >= 500) {
            S.errors.status = err.status;
            S.errors.open = true;
          } 
          throw err;
        })
    }
  }

  signin = (email, password) => {
    return this.post('signin', {email, password});
  }

  signout = () => {
    return this.post('signout', {});
  }

  session = () => {
    return this.get('session', {})
  }

  sendInvitation = (email) => {
    return this.post('invitation', {email})
  }
}

export {client}