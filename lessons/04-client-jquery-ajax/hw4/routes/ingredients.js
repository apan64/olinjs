var Ingredients = require('../models/ingredientModel');
var routes = {};

routes.ingredients = function(req, res){
	Ingredients.find(function(err, ingredients){
		res.render('home', {'ingredients': ingredients});
	});
};

routes.ingredientsAdd = function(req, res){

	// when on ingredients/add and you click the add button, it attempts to go to ingredients/ingredients/add, need to find a way to redirect the route ahead of time
	var newIngredient = new Ingredients({name: req.body.name, price: req.body.price, inStock: true});
	newIngredient.save(function(err){
		console.log(newIngredient);
		if(err){console.log(err)};
		Ingredients.find(function(err, ingredients){
			// res.send({'ingredients': ingredients});
			console.log(ingredients);
			res.status(200).send(ingredients);
			return;
		});
	});
};

routes.ingredientsOut = function(req, res){
	// do not know how to define the name for each button in the handlebars file in a useful way
	// do not know how to find name of button pressed
	// console.log(req.query.price)

};

routes.ingredientsEdit = function(req, res){
	// do not know how to define the name for each button in the handlebars file in a useful way, or how to extract values from text fields created using {{#each}} in handlebars

};

module.exports = routes;