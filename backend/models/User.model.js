const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
   
    dateJoined: {
        type: Date,
        default: Date.now
    },

    stripeId: String,

    
    admin: {
        type: Boolean,
        default: false
    },

    selectedOption: {
        type: String,
        required: true
    },


    streetAddress: {
        type: String,
        required: true
    },
    suburb: {
        type: String,
        required: true
    },
    postcode: {
        type: Number,
        required: true
    },
    ausState: {
        type: String,
        required: true
    },


    orderList: Array,
    paymentSource: Array,
    subscriptionId: String,
})

module.exports = mongoose.model('User', userSchema)


//thinking that for ausState is could be a drop down

/**
|--------------------------------------------------
| update these to the following layout:
email: {
    type: String,
    required: true
},
and so on - this is to make fields required 
|--------------------------------------------------
*/

    // date: {
    //     type: Date,
    //     default: Date.now
    // },
    // admin: {
    //     type: Boolean,
    //     default: false
    // }