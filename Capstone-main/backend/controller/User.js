const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

router.post("/sign", async (req, res) => {
  const {email} = req.body
  const findUser = await User.findOne({email})
  try {
   if(!findUser) {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: await bcrypt.hash(req.body.password, 10),
      address: req.body.address,
    });

    res.status(201).send({
      status: true,
      message: "Registered Successfully",
    });


   }

   else {
    res.status(201).send({
      status: false,
      message: "Already Registered",
    })
   }


   
  } catch (e) {
    console.error("Error Occurred:", e);
    res.status(500).send({
      status: false,
      message: "Error occurred while processing the request",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await User.findOne({ email });

    if (!findUser) {
      res.status(500).send( {
        success: false , 
        message : 'Un-authorised user'
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, findUser.password);
   

    if (isPasswordValid  && email=== findUser.email) {
      const token = jwt.sign({ email: findUser.email }, secretKey, {
        expiresIn: "1d",
      });
      // res.cookie("token", token, { expiresIn: "1d" });
      res.status(200).send({
        success: true ,
        message: 'Login Successfully' ,
        user :{
          name: findUser.name ,
          email : findUser.email ,
          address: findUser.address ,
          id : findUser._id
        }, 
        token: token
      });
    } 

    else  {
      res.send({
        success: false ,
        message: 'Invalid Credentials' 
      });
    } 

  } catch (e) {
    console.error("Error Occurred", e);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
