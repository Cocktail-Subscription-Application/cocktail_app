const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cocktailSchema = new Schema ({
   title: {
      type: String,
      required: true
  },
   photo: {
      type: String,
      required: true
  },
   description: {
      type: String,
      required: true
  },
   directions: {
      type: String,
      required: true
  },
   ingredients: {
      type: String,
      required: true
  },
   available: {
      type: Boolean,
      required: true
  },

})

module.exports = mongoose.model('Cocktail', cocktailSchema)


