var mongoose = require('mongoose');

var catSchema = mongoose.Schema({	// schema for cats
  name: String,
  age: Number,
  colors: [String]
});

module.exports = mongoose.model("cat", catSchema);