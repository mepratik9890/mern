 const mongoose = require('mongoose')
  const ProductSchema = mongoose.Schema({
    type: String ,
    name: String ,
    desc: String ,
    brand: String, 
    price: Number,
    image: [String]
  })

  module.exports = mongoose.model('Product' , ProductSchema)