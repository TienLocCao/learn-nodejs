module.exports.postCreate = function(req, res, next ) {
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

    next();
}