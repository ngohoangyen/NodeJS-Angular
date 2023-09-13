const ketnoi = require('../connect-mysql');
const util = require('node:util');
const query = util.promisify(ketnoi.query).bind(ketnoi);

const Category = function() {}

Category.getAll = async function(req, callback) {
    let _name = req.query.name;
    // lấy trang hiện tại: 1, 2, 3
    let _page = req.query.page ? req.query.page : 1;
    // truy vấn tính tổng số dòng trong một bảng
    let _sql_total = "SELECT COUNT(*) as total FROM category";

    if (_name) {
        _sql_total += " WHERE name LIKE '%" + _name + "%'"
    }
    let rowData = await query(_sql_total);
    let totalRow = rowData[0].total;

    let _limit = 5;
    let totalPage = Math.ceil(totalRow / _limit);
    _page = _page > 0 ? Math.floor(_page) : 1;
    _page = _page <= totalPage ? Math.floor(_page) : totalPage;

    let _start = (_page - 1) * _limit;

    let sql = "SELECT * FROM category";

    if (_name) {
        sql += " WHERE name LIKE '%" + _name + "%'"
    }
    sql += " order by id DESC LIMIT " + _start + "," + _limit;

    ketnoi.query(sql, function (err, data) {
        callback(err, data, totalPage, _page, _name);
    })
}

Category.getComboBox = function(myFun) {
    ketnoi.query("SELECT id, name FROM category Order By name ASC", function(err, data) {
        myFun(err, data);
    })
}
Category.delete = async function(id, myFun) {
   let sql_select = "SELECT * FROM category WHERE id = ?";
   let cat = await query(sql_select, [id]);
   console.log(cat);
    let sql_delte = "DELETE FROM category WHERE id = ?";
    ketnoi.query(sql_delte, [id], function (err, data) {
        if (err) {

            let msg = '';

            if (err.errno == 1451) {
                msg = 'Danh mục đang có sản phẩm, không thể xóa';
            } else if (err.errno == 2000) {
                msg = 'Tên danh mục này bị trùng'
            } else {
                msg = 'Đã có lỗi, vui lòng thử lại'
            }

            myFun({msg, errno: err.errno}, null);

        } else {
            myFun(false, cat[0]);
        }
    })
}

Category.store = function(bodyData, myFun) {
    let sql = "INSERT INTO category SET ?";
    ketnoi.query(sql, bodyData, (err, data) => {
        if (err) {

            let msg = '';

            if (err.errno == 1062) {
                msg = 'Tên danh mục đã tồn tại, hãy chọn tên khác';
            } else if (err.errno == 2000) {
                msg = 'Tên danh mục này bị trùng'
            } else {
                msg = 'Đã có lỗi, vui lòng thử lại'
            }

            myFun({msg, errno: err.errno}, null);

        } else {
            myFun(false, data);
        }
    })
}

Category.getOne = function(id, myFun) {
    ketnoi.query("SELECT * FROM category WHERE id = ?",[id], (err, data) => {

        if (data.length) {
            myFun(false, data[0])
        } else {
            myFun({msg: 'Không tìm thấy dữ liệu', errno: 404}, null)
        }
    })
}

Category.update = function(req, myFun) {
    let id = req.params.id;
    let sql = "UPDATE category SET ? WHERE id = ?";
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

            myFun({msg, errno: err.errno}, null);

        } else {
            myFun(false, data);
        }
    })
}
module.exports = Category;