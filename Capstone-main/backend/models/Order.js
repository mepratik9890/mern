const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orders: [ 
    // {
    //   type: String ,
    //   name: String ,
    //   desc: String ,
    //   brand: String, 
    //   price: Number,
    //   images: String
    // },
  ],
//   total: {
//     type: Number,
//     required: true,
//   },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', 
    required: true,
  },

});

module.exports = mongoose.model('Order', OrderSchema);
