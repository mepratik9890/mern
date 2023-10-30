const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
// const User = require("../models/User");

router.get("/get-product", async (req, res) => {
  try {
    const result = await Product.find();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

router.get('/search', async (req, res) => {
  const { search } = req.query;

  try {
  
    const searchedProducts = await Product.find({
      $or: [
        { brand: { $regex: search, $options: 'i' } }, 
        { name: { $regex: search, $options: 'i' } },
   
      ],
    });

    res.json(searchedProducts);
  } catch (error) {
    console.error('Error searching for products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
