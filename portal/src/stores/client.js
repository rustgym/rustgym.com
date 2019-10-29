import request from 'superagent';

const endpoint = '/api'

class client{
  signin = (email, password) => {
    return request
      .post(`${endpoint}/signin`)
      .type("form")
      .send({email, password})
      .then(res => res.text)
      .catch(err => {
        if (err.status == 400){
          window.location.hash = "#signin";
        }
        if (err.status >= 500) {
          S.errors.status = err.status;
          S.errors.open = true;
        } 
        throw err;  
      })
  }
  signout = () => {
    return request
      .post(`${endpoint}/signout`)
      .type("form")
      .send({})
      .then(res => res.text)
      .catch(err => {
        if (err.status == 400){
          window.location.hash = "#signin";
        }
        if (err.status >= 500) {
          S.errors.status = err.status;
          S.errors.open = true;
        } 
        throw err;  
      })
  }
}

export {client}