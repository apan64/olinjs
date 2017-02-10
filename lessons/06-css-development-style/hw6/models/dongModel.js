var mongoose = require('mongoose');

var dongSchema = mongoose.Schema({	// schema for cats
	username: String,
	dong: String
});

module.exports = mongoose.model("dong", dongSchema);