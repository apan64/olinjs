var exphbs = require('express-handlebars');	// requires
var express = require('express');
var index = require('./routes/index');
var cats = require('./routes/cats');
var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./fakeDatabase');

app.use(logger('dev'));	// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.home);	// creating routes
app.get('/cats', cats.cats);
app.get('/cats/new', cats.newCat);
app.get('/cats/bycolor/:color', function(req, res, next){	// a route including 'bycolor' will be sent to the the next method call from app, in order to parse the URL for the specified color
	next();
});
app.param('color', cats.sortedCat);	// extracts the value in the 'color' part of the URL
app.get('/cats/delete/old', cats.deleteCat);

app.listen(3000);