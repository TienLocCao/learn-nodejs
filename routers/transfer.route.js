var express = require('express');

const controller  = require('./../controllers/transfer.controller');
const route= express.Router();

route.get('/create', controller.create); 
route.post('/create', controller.postCreate);

module.exports = route;