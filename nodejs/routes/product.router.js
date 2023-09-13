const productCtrl = require('../controllers/product.controller');
const upload = require('../upload');

module.exports = function(app) {
    app.get('/san-pham', productCtrl.index);
    app.get('/them-san-pham', productCtrl.create);
    app.post('/them-san-pham',upload.single('image'), productCtrl.store);
}