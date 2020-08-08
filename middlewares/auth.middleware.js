const db= require('./../db');

module.exports.requiredAuth = function(req, res, next) {
    if(!req.signedCookies.userId) {
        res.redirect('/auth/login');
        return;
    }
    let user = db.get("users").find({ id: req.signedCookies.userId }).value();
    if(!user) {
        res.redirect('/auth/login');
        return;
    }
    res.locals.user=user;
    var sessionID= req.signedCookies.sessionID;
    var total = db.get('sessions').find({id:sessionID}).get('cart')
    .reduce((total, course) => total + parseInt(course), 0).value();
    res.locals.totalCard= total;
    next();
}
