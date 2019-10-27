import request from 'superagent';

const endpoint = 'http://localhost:8080/api'

class client{
  signin = async (email, password) => {
    return await request
      .post(`${endpoint}/signin`)
      .type("form")
      .send({email, password})
      .then(res => res.text)
      .catch(err => {console.log(err)})
  }
}

export {client}