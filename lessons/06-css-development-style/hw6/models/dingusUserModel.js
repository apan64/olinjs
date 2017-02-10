var mongoose = require('mongoose');

var dingusUserSchema = mongoose.Schema({	// schema for cats
	username: String,
	dongs: [String]
});

module.exports = mongoose.model("dingusUser", dingusUserSchema);