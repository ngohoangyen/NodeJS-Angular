const ketnoi = require('../connect-mysql');
const util = require('node:util');
const query = util.promisify(ketnoi.query).bind(ketnoi);
module.exports = function(app) {
    app.get('/api/favorites/:account_id', (req, res) => {
        let account_id = req.params.account_id;
        let sql = "SELECT product.id, product.name, product.price, product.sale_price, product.image FROM favorite JOIN product ON product.id = favorite.product_id WHERE account_id = ? Order By id DESC";
        ketnoi.query(sql, [account_id], (err, data) => {
            let results = [];
            data.forEach(prod => {
                prod.image = 'http://localhost:3000/uploads/' + prod.image,
                results.push(prod)
            });
            res.json({
                result: results,
                code: 200
            });
        })
    })

    app.post('/api/favorites', async function(req, res) {
        let sql_check = "SELECT * FROM favorite WHERE account_id = ? AND product_id = ?";
        let favorite = await query(sql_check, [req.body.account_id, req.body.product_id]);
        if (favorite.length > 0) {
            let sql = "DELETE FROM favorite WHERE account_id = ? AND product_id = ?";
            ketnoi.query(sql, [req.body.account_id, req.body.product_id], (err, data) => {
                if (err) {
                    res.json({
                        result: "",
                        code: 405,
                        message: err.sqlMessage
                    });
                } else {
                    res.json({
                        result: "",
                        code: 200,
                        message: "Bỏ yêu thích thành công"
                    });
                }
            })
        } else {
            let sql = "INSERT INTO favorite SET ?";
            ketnoi.query(sql, req.body, (err, data) => {
                if (err) {
                    res.json({
                        result: "",
                        code: 405,
                        message: "Yêu thích không thành công"
                    });
                } else {
                    req.body.id = data.insertId;
                    res.json({
                        result: req.body,
                        code: 200,
                        message: "Yêu thích thành công"
                    });
                }
            })
        }
        
    });
}