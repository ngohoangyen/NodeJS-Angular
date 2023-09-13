const Product = require('../models/product.model')
const Category = require('../models/category.model');
exports.index = async function (req, res) {

    Product.getAll(req, function(err, data, totalPage, _page, _name) {
        res.render('product', {
            data: data ? data : [],
            totalPage: totalPage,
            _page: parseInt(_page),
            _name: _name
        });
    })

}

exports.delete = function (req, res) {
    let id = req.params.id;
    Product.delete(id, function(err, data) {
        if (err) {
            res.render('error', {
                message: err.msg,
                code: err.errno
            });
        } else {
            res.redirect('/danh-muc');
        }
    })
}

exports.create = (req, res) => {
    Category.getComboBox((err, data) => {
        res.render('product-add', {
            cats: data
        });
    })
    
}

exports.store = (req, res) => {
    let bodyData = req.body;
    bodyData.image = req.file.filename;
    Product.store(bodyData, function(err, data) {
        if (err) {
            res.render('error', {
                message: err.msg,
                code: err.errno
            });
        } else {
            res.redirect('/san-pham');
        }
    });

}

exports.edit = (req, res) => {
    let id = req.params.id;
    Product.getOne(id, function(err, data){
        if (err) {
            res.render('error', {
                message: err.msg,
                code: err.errnor
            });
        } else {
            res.render('category-edit', {
                cat: data
            });
        }
    });
}

exports.update = async (req, res) => {
    let id = req.params.id;
    let sql = "UPDATE category SET ? WHERE id = ?";
    req.body.image = req.file.filename;
    ketnoi.query(sql, [req.body, id], (err, data) => {
        if (err) {

            let msg = '';

            if (err.errno == 1062) {
                msg = 'Tên danh mục đã tồn tại, hãy chọn tên khác';
            } else if (err.errno == 2000) {
                msg = 'Tên danh mục này bị trùng'
            } else {
                msg = 'Đã có lỗi, vui lòng thử lại'
            }

            res.render('error', {
                message: msg,
                code: err.errno
            });

        } else {
            res.redirect('/danh-muc');
        }
    })
}