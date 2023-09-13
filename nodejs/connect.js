const mysql = require('mysql');

const conn = mysql.createConnection({
    host:'localhost',
    database: 'ql_ban_hang',
    user: 'root',
    password: ''
});

conn.connect(function(err) {
    if (err) {
        console.log("Lỗi kết nối CSDL " + err.sqlMessage)
    }
})

module.exports = conn;