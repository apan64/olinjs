var Dinguses = require('../models/dingusUserModel');
var Dongs = require('../models/dongModel');
var routes = {};

routes.home = function(req, res){
	Dongs.find(function(err, dongs){
		Dinguses.find(function(err, users){
			res.render('dingus', {'dongs': dongs, 'users': users});
		});
	});
};

routes.login = function(req, res){
	Dinguses.findOne({username: req.body.user}, function(err, doc){
		if(err){console.log(err)};
		if(doc){
			res.status(200).send({new: false, username: doc.username, id: doc._id});;
		}
		else{
			var newDingus = new Dinguses({username: req.body.user, dongs: []});
			newDingus.save(function(err){
				if(err){console.log(err)};
				res.status(200).send({new: true, username: req.body.user, id: newDingus._id});
			});
		}
	});
};

routes.dong = function(req, res){
	var newDong = new Dongs({username: req.body.user, dong: req.body.newDong});
	Dinguses.findOne({username: newDong.username}, function(err, doc){
		if(err){console.log(err)};
		console.log(doc);
		console.log(doc.username);
		doc.dongs.push(newDong._id);
		console.log(doc.dongs);
		doc.save();
	});
	newDong.save(function(err){
		if(err){console.log(err)};
		res.status(200).send({id: newDong._id});
	})
};

routes.delete = function(req, res){
	Dongs.findOne({_id: req.body.id}).remove(function(err, doc){
		if(err){console.log(err)};
	});
	Dinguses.findOne({username: req.body.name}, function(err, doc){
		if(err){console.log(err)};
		doc.dongs.splice(doc.dongs.indexOf(req.body.id), 1);
		res.sendStatus(200);
		doc.save();
	})
};

routes.logout = function(req, res){
	res.sendStatus(200);
};

routes.click = function(req, res){
	Dinguses.findOne({_id: req.body.id}, function(err, doc){
		console.log(doc.dongs);
		Dongs.find({_id: {$in: doc.dongs}}, function(err, docs){
			// Dongs.find({_id: doc.dongs[0]}, function(err, docs){
			console.log(docs);
			ids = []
			for(i = 0; i < docs.length; i++){
				ids.push(docs[i]._id);
			}
			res.status(200).send({dongs: ids});
		});
	});
};

module.exports = routes;