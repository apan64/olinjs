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
var mongoose = require('mongoose');

var dingus = require('./routes/dingus.js');
var Dinguses = require('./models/dingusUserModel');

mongoose.connect('mongodb://localhost/dingus');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', dingus.home);
app.post('/login', dingus.login);
app.post('/createDong', dingus.dong);
app.post('/deleteDong', dingus.delete);
app.get('/logout', dingus.logout);
app.post('/userClick', dingus.click);

app.listen(3000);