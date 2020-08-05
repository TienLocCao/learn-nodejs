const db= require('./../db');
const shortid = require('shortid');

module.exports.index = function(req, res) {
    // res.send('userLissy');
    // res.render('users/index',{users:users})
    res.render('users/index',{users:db.get('users').value()})
}

module.exports.create = function(req, res) {
    res.redirect('users/create');
}

module.exports.postCreate = function(req,res) {
    // users.push(req.body);
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

