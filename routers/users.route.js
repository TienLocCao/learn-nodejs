var express = require('express');
const userController  = require('./../controllers/user.controller');
const userValidate = require('./../validate/user.validate');
const route= express.Router();

route.get('/', userController.index);

route.get('/create', userController.create); 
route.post('/create', userValidate.postCreate, userController.postCreate);

route.get('/search', userController.search);

route.get('/:id', userController.get); 


module.exports = route;