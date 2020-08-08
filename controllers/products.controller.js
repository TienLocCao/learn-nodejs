const db= require('./../db');
module.exports.index = function(req, res) {
    let page = req.query.page || 1;
    const perPage = 10;
    let start = (page - 1) * perPage;
    let end =  page * perPage;
    const totalProduct = db.get('products').size().value();
    let totalPage = totalProduct/perPage;
    let listProduct = db.get('products').value().slice(start,end);
    res.render("products/index",{products: listProduct,page:page,totalPage:totalPage});
}