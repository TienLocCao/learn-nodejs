var express = require('express');
const controller  = require('./../controllers/auth.controller');
// const validate = require('./../validate/auth.validate');
const route= express.Router();

route.get('/login', controller.login);
route.post('/login', controller.postlogin);


module.exports = route;