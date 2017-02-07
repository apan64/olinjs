var exphbs = require('express-handlebars');
var express = require('express');
var index = require('./routes/index');
var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ingredients = require('./routes/ingredients.js');
var orders = require('./routes/orders.js');
var Ingredients = require('./models/ingredientModel');
var Orders = require("./models/orderModel");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ingredients');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);
app.get('/ingredients', ingredients.ingredients);
app.post('/postIngredient', ingredients.ingredientsAdd);
app.post('/outIngredient', ingredients.ingredientsOut);
app.post('/editIngredient', ingredients.ingredientsEdit);
app.get('/order', orders.orders);
app.post('/checkbox', orders.checkbox);
app.post('/postOrder', orders.ordersAdd);
app.get('/kitchen', orders.show);
app.post('/completeOrder', orders.remove);

app.listen(3000);