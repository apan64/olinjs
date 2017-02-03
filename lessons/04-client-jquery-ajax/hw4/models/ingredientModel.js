var mongoose = require('mongoose');

var ingredientSchema = mongoose.Schema({	// schema for cats
  name: String,
  price: Number,
  inStock: Boolean,
  nameOut: String,
  nameEdit: String,
  namePrice: String
});

module.exports = mongoose.model("ingredient", ingredientSchema);