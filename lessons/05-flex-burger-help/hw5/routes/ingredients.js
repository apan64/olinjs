var Ingredients = require('../models/ingredientModel');
var routes = {};

routes.ingredients = function(req, res){	// renders the page on initial load
	Ingredients.find(function(err, ingredients){
		var usableIngredients = [];
		for(i = 0; i < ingredients.length; i++){
			if(ingredients[i].inStock){
				usableIngredients.push(ingredients[i]);
			}
		}
		res.render('home', {'ingredients': usableIngredients});
	});
};

routes.ingredientsAdd = function(req, res){	// adds a new ingredient to the database and displays it
	var newIngredient = new Ingredients({name: req.body.name, price: req.body.price, inStock: true});
	newIngredient.save(function(err){
		if(err){console.log(err)};
		Ingredients.find(function(err, ingredients){
			res.status(200).send(newIngredient);
			return;
		});
	});
};

routes.ingredientsOut = function(req, res){	// hides the ingredient and sets its inStock value to false
	Ingredients.findOne({_id: req.body.id}, function(err, doc){
		if(err){console.log(err)};
		doc.inStock = false;
		doc.disabled = 'disabled';
		doc.save();
	});
	return;
};

routes.ingredientsEdit = function(req, res){	// edits the name and price of an ingredient based on text field inputs when edit button is pressed
	Ingredients.findOne({_id: req.body.id}, function(err, doc){
		if(err){console.log(err)};
		doc.name = req.body.name;
		doc.price = req.body.price;
		doc.save();
	});
	return;
};

module.exports = routes;