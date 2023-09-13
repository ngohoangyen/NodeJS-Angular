const accountCtrl = require('../controllers/api.account.controller');
module.exports = function(app) {
    app.get('/api/accounts', accountCtrl.index);
    app.post('/api/accounts', accountCtrl.create);
    app.get('/api/accounts/:id', accountCtrl.getOne);
    app.put('/api/accounts/:id', accountCtrl.update);
    app.post('/api/accounts/login', accountCtrl.login);
}