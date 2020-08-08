var express = require('express');
const controller  = require('../controllers/cart.controller');
const route= express.Router();

route.get('/add/:productID', controller.addToCart);

module.exports = route;