var express = require('express');
const controller  = require('./../controllers/user.controller');
const validate = require('./../validate/user.validate');
const route= express.Router();

route.get('/', controller.index);

route.get('/create', controller.create); 
route.post('/create', validate.postCreate, controller.postCreate);

route.get('/search', controller.search);

route.get('/:id', controller.get); 


module.exports = route;