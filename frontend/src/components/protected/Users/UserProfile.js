import React, { Component } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import './UserProfile.css'
import CardUpdate from './Cards/CardUpdate';
import Logout from './../../public/Logout'
import UpdateToMonthly from './Subscriptions/UpdateToMonthly';
import UpdateToQuarterly from './Subscriptions/UpdateToQuarterly';
import ListCustomerCharges from './ListCustomerCharges';
import UpdateDetails from './UpdateDetails';
import PersonalDetails from './PersonalDetails/PersonalDetails';

export default class UserProfile extends Component {
  state = { 
    email: this.email,
    subscriptionId: this.subscriptionId,
    selectedOption: this.selectedOption,
    stripeId: this.stripeId,
    // orderList: this.orderList,
    message: null,
    error: null,
    
    // Check to see if the below three are actually doing anything - has to do with dynamic render i think
    updateDetailsState: false,
    showOrders: false,
    // addMonthlySubscription: this.addMonthlySubscription,
    // addQuarterlySubscription: this.addQuarterlySubscription,
  }

  componentDidMount() {
    // const url = 'https://cocktail-app.now.sh/me' // PROD
    const url = 'http://localhost:5000/me' // 
    const token = Cookies.get('token')
      axios.get(url, {
        headers: {
          'Authorization': `bearer ${token}`
        },
      })
      .then ( resp => {
        const { email, firstName, lastName, phone, deliveryAddress, stripeId, selectedOption, paymentSource, subscriptionId, streetAddress, suburb, postcode, ausState, orderList } = resp.data

        this.setState({email, firstName, lastName, phone, deliveryAddress, stripeId, selectedOption, paymentSource, subscriptionId, streetAddress, suburb, postcode, ausState, orderList })
      })
      .catch(err => console.log(err) )
  }

  // componentDidMount = () => {
  //   const { stripeId, email, orderList } = this.state
  //   // console.log(stripeId);

  //   // const url = "https://coctail-app.now.sh/list-customer-orders" // PROD
  //   const url = "http://localhost:5000/list-customer-orders" // DEV
  //   const data = { stripeId, email, orderList }
  //   console.log(data);

  //   axios.post(url, data)
  //      .then(resp => {
  //     this.setState({ orderList, message: 'These are all your orders', error: null })
  //     console.log(resp)
  //   })
  //   .catch(err => {
  //       console.log(err.response)
  //       if (err.response === 403) {
  //         this.setState({ error: 'Nope!', message: null})
  //       }
  //   })

  //  const amount = orderList
  //  loop through the array of orderList - currently [0] for only the first charge
  //  THEN FOR EACH RESULT - nest that - i want to assign it to Data


  //  

  //TO DO THIS JUST WRAP THEM ALL UP IN A PROMISE ALL - I.E. TO WRAP THEM UP WITHIN A COMPONENTDIDMOUNT

  
  
  // .amount
  //   will i need to make a map thing here - i.e. to get all arrays

  //   const chargeAmount = amount.map((amount) =>
  //     <li>{chargeAmount}</li>
  //   );

  //   // I then have to do the above for created and description
  //   // created is given as a linux timestamp
  //   // then in render <ul>{chargeAmount}</ul>
  //   // so i might have to wrap that up in a table 

  // }

// <p>Amount: {this.state.orderList[0].data[0].amount}</p> 
// <p>Created: {this.state.orderList[0].data[0].created}</p> 
  
// const orders = this.state.orderList[0] //this is to get 

// const tableInfo = orders.map(())

// <p>Amount: {this.state.orderList[0].data[0].amount}</p> 
// <p>Created: {this.state.orderList[0].data[0].created}</p> 

// <p>Amount: {this.state.orderList[0].data[1].amount}</p> 
// <p>Created: {this.state.orderList[0].data[1].created}</p> 

  onToken = (token) => {
    const { stripeId, email } = this.state; 
    // const url = 'https://cocktail-app.now.sh/updatecard' //PROD
    const url = 'http://localhost:5000/updatecard' // DEV
    const data = { token, stripeId, email }
    // console.log(`49  - UserProfile.js - update card  ${data}`)

    axios.post(url, data)
        .then(response => {
          console.log(`53  - UserProfile.js - update card  ${response}`)
        
        const { success } = response.data
            this.setState({ 
                success
            })
        })
        .catch ( err => {
          console.log(err.response)
        })
}  

// Function
updateCardDetails = (e) => {
  this.updateCardView(e)
}

updateDetails = () => {
  this.setState({ 
    updateDetailsState: true 
  });
}

toggleOrders = () => {
  this.setState.showOrders = true
}
/**
|--------------------------------------------------
| THE FOLLOWING TO BE IMPLEMENTED ONCE WE HAVE STRIPE ELEMENTS - OR CHANGE TO A LIFECYCLE METHOD TO AUTOMATICALLY RE RENDER UPDATES TO CARD
|--------------------------------------------------
*/
// within the CardUpdate component
// onClick={(e) => props.updateCardDetails}

// updateCardView = (paymentSource) => {
//   // const url = 'https://cocktail-app.now.sh/me' // PROD
//   const url = 'http://localhost:5000/me' // DEV
//   axios.get(url)
//     .then(({ data }) => {
//       // console.log(`89  - UserProfile.js - update card  ${data}`)
//       this.setState((prevState) => {
//         return {
//           paymentSource: prevState.paymentSource
//         }
//       })
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// }
/////////////////////// BELOW WORKING OUT THE NEXT MONTH ////////////

  // displayNextMonth = () => {
  //   this.nextMonth()
  // }

  // nextMonth = () => { // initial thoughts for displaying the next month
  //   const current = new Date();

  //     current.setMonth(current.getMonth()+1)


  //   const now = new Date()
  //   // creates a new date object called 'now'
  //   if (now.getMonth() === 11) {
  //     //looks to see if it is december
  //     let current = new Date(now.getFullYear() + 1, 0 , 1)
  //     // if it's december then 
  //   } else {
  //     let current = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  //   }
  // }

////////////// ABOVE WORKING OUT THE NEXT MONTH ///////////

// UPDATING TO A QUARTERLY SUBSCRIPTION - CHANGING FROM MONTHLY

/// GUY - YOU CHANGED THIS FROM AN ARROW FUNCTION TO A REGULAR FUNCTION - MAKE SURE YOU DIDN'T BREAK ANYTHING - IN FACT YOU REMOVED IT - DUPLICATED CODE
updateQuarterlySubscription = () => {
  const {  email, subscriptionId, } = this.state
  console.log(this.state);
  console.log("this is where it is not working");

  // const url = "https/something /updatetoquarterlysubscription" // PROD
  const url = "http://localhost:5000/updatetoquarterlysubscription" // DEV
  const data = { email, subscriptionId }

  axios.post(url, data)
    .then(resp => {
      this.setState({ message: 'well done buddy you just changed to a QUARTERLY cocktail subscription', error: null })
          // console.log(resp)
    })
    .catch(err => {
      console.log(err.response)
      if (err.response === 403) {
        this.setState({ error: 'Nope!', message: null})
      }
    })
}


  // CHANGING / UPDATING THE CUSTOMERS SUBSCRIPTION
  // quarterlyChange = () => {
  //   const { subscriptionId, email } = this.state;
  //   console.log("go go gadget choper")
  //   // // const url = "https://cocktail-app.now.sh/updatetoquarterlysubscription" // PROD
  //   const url = "http://localhost:5000/updatetoquarterlysubscription" //DEV
  //   const data =  {subscriptionId, email} // ideally the subscription number
  //   axios.post(url, data)
  //     .then(resp => {
  //       this.setState({ message: 'well done buddy you just changed to a QUARTERLY cocktail subscription', error: null })
  //       // console.log(resp)
  //     })
  //     .catch(err => {
  //         console.log(err.response)
  //         if (err.response === 403) {
  //           this.setState({ error: 'Nope!', message: null})
  //         }
  //     })
  // }
  
  monthlyChange = () => {
    const { subscriptionId, email } = this.state;
    console.log("go go gadget umbrella")
    // console.log(subscriptionId)
    // // const url = "https://cocktail-app.now.sh/updatetomonthlysubscription" // PROD
    const url = "http://localhost:5000/updatetomonthlysubscription" //DEV
    const data =  {subscriptionId, email}  // ideally the subscription number
    axios.post(url, data)
      .then(resp => {
        this.setState({ message: 'well done buddy you just changed to a MONTHLY cocktail subscription', error: null })
        // console.log(resp)
      })
      .catch(err => {
          console.log(err.response)
          if (err.response === 403) {
            this.setState({ error: 'Nope!', message: null})
          }
      })
  }

  listCustomerOrders = () => {
    const { stripeId, email, orderList } = this.state
    console.log(this.state)

    // const url = "https://coctail-app.now.sh/list-customer-orders" // PROD
    const url = "http://localhost:5000/list-customer-orders" // DEV
    const data = { stripeId, email, orderList }
    // console.log(data);

    axios.post(url, data)
    .then(resp => {
      const orders = resp.data.data //this is to get each object
      console.log(resp)
      console.log("HERERERERER  "+ orders)
      this.setState({ orders, message: 'These are all your orders', error: null })
     

      // console.log(resp)

    })
    
    .catch(err => {
      console.log(err.response)
      if (err.response === 403) {
        this.setState({ error: 'Nope!', message: null})
      }
    })
  }

  timeConverter = (UNIX_timestamp) => {
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  moneyConverter = (Money) => {
    const converted = parseInt(Money) 
    const numstr = converted / 100
    return '$' + numstr
  }
    // console.log(timeConverter(0));
    // could possibly be wrapped in a tr/ instead of <>
    

  
    // var myObject = { 'a': 1, 'b': 2, 'c': 3 };

// for (var amount in orders) {
//   if (orders.hasOwnProperty('amount')) {
//     orders['amount'] = <li>{amount}</li>
//   }
// }
// for (var key in orders) {
//   if (orders.hasOwnProperty('created')) {
//     orders[key] 
  
//   }
// }

// console.log(orders);
// { 'a': 2, 'b': 4, 'c': 6 }

  

    
    // const chargeAmount = amount.map((amount) =>
//     <li>{chargeAmount}</li>
//   );
        
    
// <p>Amount: {this.state.orderList[0].data[0].amount}</p> 
// <p>Created: {this.state.orderList[0].data[0].created}</p> 

// <p>Amount: {this.state.orderList[0].data[1].amount}</p> 
// <p>Created: {this.state.orderList[0].data[1].created}</p> 


cancelSubscription = () => {
  const { subscriptionId, email, selectedOption } = this.state;
  
  // // const url = "https://cocktail-app.now.sh/cancelsubscription" // PROD
  const url = "http://localhost:5000/cancelsubscription" //DEV
  const data =  { subscriptionId, email, selectedOption }  // ideally the subscription number
  
  axios.post(url, data)
    .then(resp => {
      this.setState({ message: 'well done buddy you just deleted your subscription', error: null })
      // console.log(resp)
    })
    .catch(err => {
        console.log(err.response)
        if (err.response === 403) {
          this.setState({ error: 'Nope!', message: null})
        }
    })
}

//// ADDING A SUBSCRIPTION - ADD MONTH && ADD QUARTERLY

// Monthly
addMonthlySubscription = () => {
  console.log("you just clicked on add monthly subscription");
  const { subscriptionId, email, selectedOption, stripeId } = this.state;
  // console.log(this.state)
  // // const url = "https://cocktail-app.now.sh/add-monthly-subscription" // PROD
  const url = "http://localhost:5000/add-monthly-subscription" //DEV
  const data =  { stripeId, subscriptionId, email, selectedOption }  // ideally the subscription number
  axios.post(url, data)
    .then(resp => {
      this.setState({ message: 'well done buddy you just added a monthly subscription', error: null })
      // console.log(resp)
    })
    .catch(err => {
        console.log(err.response)
        if (err.response === 403) {
          this.setState({ error: 'Nope!', message: null})
        }
    })
}

// Quarterly
addQuarterlySubscription = () => {
  const { subscriptionId, email, selectedOption, stripeId } = this.state;
  
  console.log(this.state)
  // // const url = "https://cocktail-app.now.sh/add-quarterly-subscription" // PROD
  const url = "http://localhost:5000/add-quarterly-subscription" //DEV
  const data =  { stripeId, subscriptionId, email, selectedOption }  // ideally the subscription number
  
  axios.post(url, data)
    .then(resp => {
      this.setState({ message: 'well done buddy you just added a quarterly subscription', error: null })
      // console.log(resp)
    })
    .catch(err => {
        console.log(err.response)
        if (err.response === 403) {
          this.setState({ error: 'Nope!', message: null})
        }
    })
}
  
  render() {
    if (this.state.email) {
    
    return (

      <div>

        <div className="personal-info">
        {/* <PersonalDetails
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              email={this.state.email}
              streetAddress={this.streetAddress}
              suburb={this.suburb}
              postcode={this.postcode}
              state={this.ausState}              
            /> */}
          <p>Hello {this.state.firstName} {this.state.lastName}</p>
          <p style={{fontStyle:"italic"}}>{this.state.email}</p>
          <p>These are the details you have provided to us:</p>
          <p>Street Address: {this.state.streetAddress}</p>
          <p>Suburb: {this.state.suburb}</p>
          <p>Postcode: {this.state.postcode}</p>
          <p>State: {this.state.ausState}</p>
          <input type="submit" value="Update Details" onClick={this.updateDetails} />
          { this.state.updateDetailsState ? <UpdateDetails /> : null }
          <hr/>
        </div>

        <div className="order-history">
           
            <ListCustomerCharges
              stripeId={this.state.stripeId} // it is HERE
            />


<button onClick={this.listCustomerOrders}>View all your orders</button>
   

 {this.state.orders && 
    <>
      <h4>Your Orders:</h4>
        <table className="customers-table pure-table pure-table-horizontal">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Description</th> 
            </tr>
          </thead>
          <tbody>
            {this.state.orders.map(order => 
                { return (
                <tr>
                  <td>{this.timeConverter(order.created)}</td>
                  <td>{this.moneyConverter(order.amount)}</td>  
                  <td>Bottle Batched Subscription</td>
                </tr>)
              }
              )}
              </tbody>
        </table>
{/* 
        <input type="submit" value="Hide Orders" onClick={this.toggleOrders}/>
        {this.state.showOrders ? <p>hi</p> : <p>bye</p>} */}
    </>

 }

{/* toggleOrders = () => {
  this.setState.showOrders = true
} */}


            <hr/>
        </div>


        <div className="plan-details">
            <h4>Your Subscription Details:</h4>
            <p>Your next delivery is expected between the 1st and 5th of 'moment.js - next month'</p>

            {/* Displays the users current subscription type */}
            { this.state.selectedOption === "monthlyFrequency" && <p>You have a monthly subscription</p>}
            { this.state.selectedOption === "quarterlyFrequency" && <p>You have a quarterly subscription</p>}
            { this.state.selectedOption === "no-subscription" && <p>You do not currently have a subscription</p>}

            {/* Gives the user the option to change to the other frequency plan - NOT WANTED BY CLIENT*/}
            {/* { this.state.selectedOption === "monthlyFrequency" && 
            <>
            <UpdateToQuarterly
              email={this.state.email}
              subscriptionId={this.state.subscriptionId}
            />
            

        <p>Want cocktails delivered every 3 months instead?</p>
            <button onClick={this.state.updateQuarterlySubscription}>Change to Quarterly</button>
            </>
            }

            { this.state.selectedOption === "quarterlyFrequency" && 
            <UpdateToMonthly 
              email={this.state.email}
              subscriptionId={this.state.subscriptionId} 
            />} */}

            { this.state.selectedOption === "no-subscription" && 
            <>
              <p>Re Subscribe to Bottle Bached</p>
              <button onClick={this.addMonthlySubscription}>Monthly Subscription</button>
              <button onClick={this.addQuarterlySubscription}>Quarterly Subscription</button>
            </>}

            {/* Gives the user the option to either Pause or Restart a Subscription */}
            {(this.state.selectedOption === "monthlyFrequency" || this.state.selectedOption === "quarterlyFrequency") && 
              <div>
                <h4>Pause your Subscription</h4>
                <button onClick={this.cancelSubscription}>Cancel Subscription</button>
              </div>}

            <p style={{fontSize:".8em"}}>This will stop you getting billed while still allowing you to keep your account information</p>
              
            
            <p>Your Next Subscription Payment will be for $87 and will be charged on the 15th || BILLING CYCLE DATE each month</p>
            
            <hr/>

          </div> 

        <div className="payment-details">
            <h4> Your Card Details:</h4>
            <p>Card Type: {this.state.paymentSource[0].brand}</p>
            <p>Card on file: **** **** ****{this.state.paymentSource[0].last4}</p>
            <p>Expiry Month: {this.state.paymentSource[0].exp_month}</p>
            <p>Expiry Year: {this.state.paymentSource[0].exp_year}</p>
            
            <CardUpdate
              updateCardView={this.updateCardView}
              onToken={this.onToken}
              email={this.state.email}
            />

            <hr/>
        </div>


      </div>
    )}
     else  {
      return (
       <div style={{paddingTop: '40px'}}>
         Please Log in to see details
         <p>{this.state.resp}</p>
         
       </div>
      )
  }

}

}