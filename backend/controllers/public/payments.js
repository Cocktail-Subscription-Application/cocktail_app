const express = require('express');
const router = express.Router();
const User = require('../../models/User.model');
require('dotenv').config();

const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY) 
   
// const stripeChargeCallback = res => (stripeErr, stripeRes) => {
//     if (stripeErr) {
//       res.status(500).send({ error: stripeErr });
//     } else {
//       res.status(200).send({ success: stripeRes });
//     }
//   };
// The above is what we can pass as a second option (stripeChargeCallback) instead of providing the stripeErr, stripe res stuff -
//GUY - CLEAN UP THE ABOVE CODE AND THEN USE IT WHERE APPROPRIATE

router.post('/api/stripe', (req, res, next) => {
    const { token, email, selectedOption } = req.body

    stripe.customers.create({
	    email: email,
	    source: token.id,
    }, ((err, customer) => {
            User.findOne({email})
                .then( user => {
                    user.stripeId = customer.id;
                    user.paymentSource = customer.sources.data[0]
                    // user.subscriptionId = customer.subscriptions.data.id // won't work here - as the subscription has not yet been created - i tried below but that didn't work either 
                    // console.log(customer.sources.data[0].card.last4) 
                    return user.save();
                })
                .catch( err => 
                    console.log(err))
        
                    if (err) {
                            res.send({
                                success: false,
                                message: err
                            })
                    } else if (selectedOption === "monthlyFrequency") {
                            const { id } = customer
                            stripe.subscriptions.create({
                                customer: id, 
                                items: [
                                    {
                                        plan: "plan_EOj3sJNhbq39cy",
                                    },
                                ],
                            }, function(err, subscription) {

                                if (err) { 
                                    res.send({
                                        success: false,
                                        message: 'Error'
                                    })
                                }
                                User.findOne({email})
                                    .then( user => {
                                        // user.stripeId = customer.id;
                                        // user.paymentSource = customer.sources.data[0]
                                        user.subscriptionId = subscription.id
                                        user.save()
                                        .then((response) => {
                                            return res.send({
                                                success: true,
                                                message: 'Success'
                                            })
                                        }).catch((err) => {
                                            console.log(err + "you got errors!")
                                        });
                                    })
                            //     else {
                            //         res.send({
                            //         success: true,
                            //         message: 'Success'
                            //     })
                            // }
                        })
                    }
                    else if (selectedOption === "quarterlyFrequency") {
                            const { id } = customer
                            console.log('hello')
                            stripe.subscriptions.create({
                                customer: id, 
                                items: [
                                    {
                                        plan: "plan_EOj3QIWZuZUbNI",
                                    },
                                ],
                            }, function(err, subscription) {
                                if (err) { 
                                   return res.send({
                                        success: false,
                                        message: 'Error'
                                    })
                                }
// //HERE
                                User.findOne({email})
                                    .then( user => {
                                        // user.stripeId = customer.id;
                                        // user.paymentSource = customer.sources.data[0]
                                user.subscriptionId = subscription.id
                                        user.save()
                                        .then((response) => {
                                            return res.send({
                                                success: true,
                                                message: 'Success'
                                            })
                                        }).catch((err) => {
                                            console.log(err + "you got errors!")
                                        });
                                    })
//     //HERE
                                
                        })
                    }
        })
    )}
)

module.exports = router;