const express = require('express')
const router = express.Router()
const Order = require('../models/Order')

router.post('/' , async(req , res)=>{
    try {
        const {orders , user } = req.body ;

        const newOrder = new Order({
            orders: orders,
            user: user ,
        })

        const saved = await newOrder.save()
        res.status(201).json(saved)
    }
    catch(error) {
        console.log('Error Creating Order', error.message);
        res.status(500).json("Error Creating the Order")
    }
})


router.get('/:userId' , async(req, res)=>{

    try{
        const userId = req.params.userId
        const getOrder = await Order.find({user: userId})
        res.status(201).json(getOrder)
    }
    catch(error) {
        console.log('Error getting Data' , error.message);
        res.status(500).json('Error getting Data')
    }
})

module.exports = router