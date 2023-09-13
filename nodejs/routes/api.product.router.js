const ketnoi = require('../connect-mysql');
module.exports = function(app) {
    app.get('/api/products', (req, res) => {
        let _limit = req.query.limit;
        _limit = _limit != undefined ? _limit : 4;
        let sql = "SELECT product.id, product.name, product.price, product.sale_price, product.image, count(favorite.product_id) as isFavorite FROM product LEFT JOIN favorite ON product.id = favorite.product_id GROUP BY product.id Order By product.id DESC LIMIT " + _limit;
        ketnoi.query(sql, (err, data) => {
            let results = [];

            data.forEach(prod => {
                prod.image = 'http://localhost:3000/uploads/' + prod.image,
                results.push(prod)
            });

            res.send({
                result: results,
                code: 200,
                message: ""
            })
        })
    });
    
}