var Ingredients = require('../models/ingredientModel');
var Orders = require("../models/orderModel");
var routes = {};
var total = 0;

routes.orders = function(req, res){	// initial load of ingredients to form orders with, renders handlebars with all usable ingredients
	Ingredients.find(function(err, ingredients){
		var usableIngredients = [];
		for(i = 0; i < ingredients.length; i++){
			if(ingredients[i].inStock){
				usableIngredients.push(ingredients[i]);
			}
		}
		total = 0;
		res.render('order', {'ingredients': usableIngredients});
	});
};

routes.checkbox = function(req, res){	// route for when checkboxes are changed, determines how the total price should change and sends it back to client
	Ingredients.findOne({_id: req.body.id}, function(err, doc){
		if(err){console.log(err)};
		if(req.body.state == "true"){
			total += doc.price;
		}
		else{
			total -= doc.price;
		}
		console.log(total);
		var ans = {tot: total};
		res.status(200).send(ans);
		return;
	});
};

routes.ordersAdd = function(req, res){	// route for submitting an order, adds the order to database
	
	var ordered = req.body.ordered.split(' ');
	ordered.splice(ordered.length - 1, 1);
	var newOrder = new Orders({ingredients: ordered, price: total});
	total = 0;
	newOrder.save(function(err){
		if(err){console.log(err)};
		res.status(200);
	});
};

routes.show = function(req, res){	// route for showing the kitchen page with orders, loads all orders
	Orders.find(function(err, orders){
		res.render('kitchen', {'orders': orders});
	});
};

routes.remove = function(req, res){	// route for removing a completed order from the kitchen, removes it from the database
	Orders.findOne({_id: req.body.id}).remove(function(err, order){
		if(err){console.log(err);}
	});
	res.status(200);
};

module.exports = routes;