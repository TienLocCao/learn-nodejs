const db= require('./../db');
const shortid = require('shortid');

module.exports.index = function(req, res) {
    // res.send('userLissy');
    // res.render('users/index',{users:users})
    res.render('users/index',{users:db.get('users').value()})
}

module.exports.create = function(req, res) {
    res.render('users/create');
}

module.exports.postCreate = function(req,res) {
    // users.push(req.body);
    let errors = []
    if(!req.body.name) {
        errors.push('Name is required');
    }
    if(!req.body.phone) {
        errors.push('Phone is required');
    }
    // if( req.body.name && req.body.phone && 
    //     db.get('users').find(user=> user.name == req.body.name && user.phone == req.body.phone)
    // ) {
    //     errors.push("Name and phone is exist")
    // }
    if(errors.length) {
        res.render('users/create', {errors:errors, values: req.body});
        return;
    }
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
}

module.exports.search = function(req,res) {
    var q= req.query.q;
    // var matchedUsers = users.filter((user)=> user.name.toLowerCase().indexOf(q.toLowerCase())!==-1);
    var matchedUsers = db.get('users').filter((user)=> user.name.toLowerCase().indexOf(q.toLowerCase())!==-1).value();
    res.render('users/index',{users: matchedUsers})
}

module.exports.get = function(req, res) {
    const id= req.params.id;
    let user = db.get('users').find({ id: id }).value();
    res.render('users/view', {user:user});
}

