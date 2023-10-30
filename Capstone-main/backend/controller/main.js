const express = require("express");
const router = express.Router();
const Product = require("./Product");
const User = require("./User");
const Orders = require("./Order");

router.use("/product", Product);
router.use("/user", User);
router.use("/orders", Orders);

module.exports = router;
