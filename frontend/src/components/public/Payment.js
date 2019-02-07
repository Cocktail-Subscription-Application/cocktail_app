import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import './Payment.css'
require('dotenv').config()

export default class Payment extends Component {
  state = { 
    payment: false
  }

  onToken = (token) => {
    // props are being passed down from the Register.js component
    const email = this.props.email
    const selectedOption = this.props.selectedOption
    //
    const data = { token, email, selectedOption,}
    // const url = 'https://cocktail-app.now.sh/api/stripe' // PROD
    const url = 'http://localhost:5000/api/stripe' // PROD

    axios.post(url, data)
      .then( response => {
        console.log(response.data)
        const { success } = response.data
        this.setState({ 
          success
        })
      })
      .catch ( err => {
        console.log(err.response)
      })
  }  

  render() {
    if (this.state.success) {
      return <Redirect to="/UserProfile" />
    } 
    else {
    return (
      <div style={{paddingTop: '40px'}}>
        <StripeCheckout
          amount = {8700}
          currency = "AUD"
          token = {this.onToken}
          stripeKey = {"pk_test_315Jrr5E4VK9O1motqWvTJS9"}
          // email={this.state.email}
          label="Join Bottle Batched"
          panelLabel="Start my Subscription"
          data-panel-label = {"Welcome to Bottle Batched your cocktail subscription service"}
          image="https://i.pinimg.com/originals/3a/96/de/3a96de2e9c9321992a71814d31945399.jpg"
          />
      </div>
    )
  } 
}
}
