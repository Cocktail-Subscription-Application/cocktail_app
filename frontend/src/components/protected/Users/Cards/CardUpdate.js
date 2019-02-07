import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

const CardUpdate = (props) => {
  // console.log(`CardUpdate properties = ${props}`)
  // console.log(props)
  return (
    // <div>
        <StripeCheckout
          label="Update Card"
          panelLabel="Update"
          token = {props.onToken}
          stripeKey = {"pk_test_22vQKgTT4CWWMUuAzR2OsHUn"}
          data-panel-label = {"Update you card details"}
          email={props.email}
          description={"Update your card details"}
          image="https://i.pinimg.com/originals/3a/96/de/3a96de2e9c9321992a71814d31945399.jpg"
          />
    // </div>
  ) 
}

export default CardUpdate



// import React, { Component } from 'react';
// import StripeCheckout from 'react-stripe-checkout';
// import Cookies from 'js-cookie';
// import axios from 'axios';
/////////////////////////THE BELOW WORKS FOR UPDATING THE CARD/////////////
// export default class CardUpdate extends Component {
//   state = { 
//     // email: "",
//     // stripeId: "",
//   }

//   //I am reusing this method in component did mount a lot - we should make it DRY - turn it into a function, so that we don't waste so much space in coding the same
//   componentDidMount = () => {
//     const url = 'http://localhost:5000/me' // 
//     const token = Cookies.get('token')
//       axios.get(url, {
//         headers: {
//           'Authorization': `bearer ${token}`
//         }, 
//       })
//       .then ( resp => {
//         // console.log(resp)
//           const {email, firstName, lastName, phone, deliveryAddress, stripeId, selectedOption, paymentSource, defaultSource, last4, sourceBrand, exp_month, exp_year } = resp.data
//           this.setState({email,firstName, lastName, phone, deliveryAddress, stripeId, selectedOption, paymentSource, defaultSource, last4, sourceBrand, exp_month, exp_year })
//           console.log(resp.data)
//         })
//       .catch( err => console.log(err + "you have an error") )

//     //1. Get all customer data
//     // const response = axios.get(url)
//     // //2. Assign that requested data to the variable 'customer'
//     // const customer = response.data
//     // //3. Set the state of the 'customer' so that we have access to everything within
//     // this.setState({})
//     // console.log(customer)
       
//   }

  
  
//   onToken = (token) => {
//     const { stripeId, email } = this.state;
    
//     // const url = 'https://cocktail-app.now.sh/updatecard' //PROD
//     const url = 'http://localhost:5000/updatecard' // DEV
//     const data = { token, stripeId, email }
//     console.log(data)

//     axios.post(url, data)
//         .then(response => {
//         // console.log(response)
//         // console.log(data);
//         const { success } = response.data
//             this.setState({ 
//                 success
//             })
//         })
//         .catch ( err => {
//           console.log(err.response)
//         })
//     }  

//   render() {
//     return (
//       <div >

//         <StripeCheckout
//           label="Update Card"
//           panelLabel="Update"
//           token = {this.onToken}
//           stripeKey = {"pk_test_315Jrr5E4VK9O1motqWvTJS9"}
//           data-panel-label = {"Update you card details"}
//           email={this.state.email}
//           description={"Update your card details"}
//           image="https://i.pinimg.com/originals/3a/96/de/3a96de2e9c9321992a71814d31945399.jpg"

          
//           />
          
//       </div>
//     )
//   } 
// }

//////////////////////THE ABOVE WORKS FINE FOR UPDATING THE CARD/////////////////


