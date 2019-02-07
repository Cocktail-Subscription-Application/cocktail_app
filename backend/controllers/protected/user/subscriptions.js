const express = require('express');
const router = express.Router();
const User = require('../../../models/User.model');
require('dotenv').config();

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

/**
|--------------------------------------------------
| ADD A MONTHLY SUBSCRIPTION TO A CUSTOMER
|--------------------------------------------------
*/

router.post('/add-monthly-subscription', (req, res)  => {
    const {stripeId, email, subscriptionId, selectedOption} = req.body //
    // console.log(`16 - subscriptions.controller.js - add a monthly subscription ${req.body}`)

    stripe.subscriptions.create({
        customer: stripeId,
        items: [
          {
            plan: "plan_EOj3sJNhbq39cy",
          },
        ]
      }, function(err, subscription) {
        //   console.log(`144 ${subscription}`);
                   User.findOneAndUpdate({email}, { subscriptionId: subscription.id, selectedOption: "monthlyFrequency"}, {upsert: true})
                   .then((res) => {
                       console.log(`29 - subscriptions.controller.js - add a monthly subscription  ${res}`)
                       })
                       .catch((err) => {
                        console.log(`32 - subscriptions.controller.js - add a monthly subscription  ${err.response}`)
                       })
        }
      );
})

/**
|--------------------------------------------------
| ADD A QUARTERLY SUBSCRIPTION TO A CUSTOMER
|--------------------------------------------------
*/

router.post('/add-quarterly-subscription', (req, res)  => {
    const {stripeId, email, subscriptionId, selectedOption} = req.body //
    // console.log(`46 - subscriptions.controller.js - add a quarterly subscription  ${req.body}`)

    stripe.subscriptions.create({
        customer: stripeId,
        items: [
          {
            plan: "plan_EOj3QIWZuZUbNI",
          },
        ]
      }, function(err, subscription) {
        // console.log(`56 - subscriptions.controller.js - add a quarterly subscription  ${subscription}`)
                   User.findOneAndUpdate({email}, { subscriptionId: subscription.id, selectedOption: "quarterlyFrequency"}, {upsert: true})
                   .then((res) => {
                    console.log(`59 - subscriptions.controller.js - add a quarterly subscription  ${res}`)
                       })
                       .catch((err) => {
                        console.log(`62 - subscriptions.controller.js - add a quarterly subscription  ${err.response}`)
                       })
        }
      );
})

/**
|--------------------------------------------------
| RETRIEVE A SUBSCRIPTION
|--------------------------------------------------
*/

// router.post('/retrievesubscription', (req, res)  => {
//     // const {email, subscriptionId} = req.body //
//   
// stripe.subscriptions.retrieve(
//     subscriptionId,
//     function(err, subscription) {
        //   console.log(`88ish - subscriptions.controller.js - retrieve a subscription ${subscription}`);
        //GUY THE BELOW MONGOOSE METHOD NEEDS TO BE UPDATED - WHEN RERIEVING WE DONT REALLY NEED TO ALTER THE DATABASE - SO DOUBLE CHECK BUT WE CAN PROBABLY GET RID OF THIS        
        // User.findOneAndUpdate({email}, { subscriptionId: subscription.id, selectedOption: "quarterlyFrequency"}, {upsert: true})
        //         .then((res) => {
        //             console.log("howdy guy - do better");
        //          //    console.log(res)
        //             })
        //             .catch((err) => {
        //                 console.log(err.response)
        //                 console.log(('wrong"'))
        //             })
//     }
// );
// })

/**
|--------------------------------------------------
| UPDATE SUBSCRIPTION TO A MONTHLY SUBSCRIPTON
|--------------------------------------------------
*/

router.post('/updatetomonthlysubscription', (req, res)  => { // DEV
    const { email, subscriptionId } = req.body
    // console.log(`103 - subscriptions.controller.js - update to a monthly subscription  ${req.body}`)

    stripe.subscriptions.update(
        subscriptionId, 
        { plan: "plan_EOj3sJNhbq39cy" },
                function(err, subscription) {
                    // console.log(`109 - subscriptions.controller.js - update to a monthly subscription  ${subscription}`)

                   User.findOneAndUpdate({email}, { subscriptionId: subscription.id}, {upsert: true})
                   .then((res) => {
                    console.log(`113 - subscriptions.controller.js - update to a monthly subscription  ${res}`)
                       })
                       .catch((err) => {
                        console.log(`46 - subscriptions.controller.js - update to a monthly subscription  ${err.response}`)
                       })
                })
})

/**
|--------------------------------------------------
| UPDATE SUBSCRIPTION TO A QUARTERLY SUBSCRIPTON
|--------------------------------------------------
*/
//    router.post('/updatesubscription', (req, res)  => { // PROD
router.post('/updatetoquarterlysubscription', (req, res)  => { // DEV
        const { email, subscriptionId } = req.body
        // console.log(`129 - subscriptions.controller.js - update to a quarterly subscription  ${req.body}`)

        stripe.subscriptions.update(
            subscriptionId, 
            { plan: "plan_EOj3QIWZuZUbNI" },
                function(err, subscription) {
                    console.log(`129 - subscriptions.controller.js - update to a quarterly subscription  ${subscription}`)

                   User.findOneAndUpdate({email}, { subscriptionId: subscription.id}, {upsert: true})
                   .then((res) => {
                    console.log(`139 - subscriptions.controller.js - update to a quarterly subscription  ${res}`)
                       })
                       .catch((err) => {
                        console.log(`142 - subscriptions.controller.js - update to a quarterly subscription  ${err.response}`)
                       })
            })
        })

/**
|--------------------------------------------------
| DELETE A SUBSCRIPTION FROM A CUSTOMER
|--------------------------------------------------
*/

router.post('/cancelsubscription', (req, res)  => {
    const {subscriptionId, email} = req.body
    // console.log(`155 - subscriptions.controller.js - delete a subscription  ${req.body}`)

    stripe.subscriptions.del(
        subscriptionId,
        function(err, confirmation) {
            console.log(`160 - subscriptions.controller.js - delete a subscription  ${confirmation}`)
            
                   User.findOneAndUpdate({email}, { selectedOption: "no-subscription", subscriptionId: "no-subscription"}, {upsert: true})
                   .then((res) => {
                    console.log(`164 - subscriptions.controller.js - delete a subscription  ${res}`)
                       })
                       .catch((err) => {
                        console.log(`167 - subscriptions.controller.js - delete a subscription  ${err.response}`)
                       })
        }
    );

})

module.exports = router;