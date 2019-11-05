import React, { Component } from 'react'
import {StripeProvider} from 'react-stripe-elements';

class MembershipLoader extends Component {
  componentDidMount(){
    S.auth.loadSession();
  }
  render(){
    return <Membership/>
  }
}

const Membership = () => {
  return (
    <div>
      <StripeProvider apiKey="pk_test_12345">
        <div>stripe</div>
      </StripeProvider>
    </div>
  )
}

export {Membership, MembershipLoader}