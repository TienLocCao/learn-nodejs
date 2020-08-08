const db = require("../db");

module.exports.addToCart = function(req,res) {
    var productID=req.params.productID;
    var sessionID= req.signedCookies.sessionID;
    if(!sessionID) {
        res.redirect('/products');
        return
    }

    var total = db.get('sessions')
                    .find({id:sessionID})
                    .get('cart.'+productID,0)
                    .value();
    db.get('sessions')
        .find({id:sessionID})
        .set('cart.'+productID,total + 1)
        .write();

    res.redirect('/products');
}