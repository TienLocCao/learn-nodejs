const db= require('./../db');
const md5 = require('md5');

module.exports.login = function(req, res) {
    res.render('auth/login');
}

module.exports.postlogin = function(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let user = db.get('users').find({ email: email }).value()
    if(!user) {
        res.render('auth/login', {
            values: req.body,
            errors: ['User does not exist.']
        });
        return;
    }

    let hashedPassword = md5(password);

    if(user.password != hashedPassword) {
        res.render('auth/login', {
            values: req.body,
            errors: ['Password wrong.']
        });
        return;
    }
    res.cookie("userId", user.id, {signed:true});   
    res.redirect("/users");
}