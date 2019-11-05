import React, { Component } from 'react'

class HomeLoader extends Component {
  componentDidMount(){
    S.auth.loadSession();
  }
  render(){
    return <Home/>
  }
}

const Home = () => {
  return (
    <div>
      home
    </div>
  )
}

export {Home, HomeLoader}