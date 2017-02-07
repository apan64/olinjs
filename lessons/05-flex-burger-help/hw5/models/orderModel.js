var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({	// schema for orders
	ingredients: [String],
	price: Number
});

module.exports = mongoose.model("order", orderSchema);