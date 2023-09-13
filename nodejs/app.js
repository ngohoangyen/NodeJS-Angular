const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
app.use(express.static('public'));

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

require('./routes/home.router')(app);
require('./routes/category.router')(app);
require('./routes/product.router')(app);
require('./routes/api.category.router')(app);
require('./routes/api.account.router')(app);
require('./routes/api.product.router')(app);
require('./routes/api.favorite.router')(app);

app.listen(PORT, function () {
    console.log('Serve run on http://localhost:' + PORT)
})