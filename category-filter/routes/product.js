const express = require('express');
const route = express.Router();
const productList = require('../data/product.json');
const path = require('path');
const { getAllProducts, getProductById } = require('../controllers/product');

//todo
//crud emeliyati (c-r-u-d );


route.get("/:id", getProductById);

route.get('/', getAllProducts)



module.exports = route;