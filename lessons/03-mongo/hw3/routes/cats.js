// var db = require('../fakeDatabase');
var Cats = require('../models/catModel');

var names = ['Peter', 'David', 'John', 'Adam', 'Juan', 'Jag', 'Kyle']; // array of names to use in cat generation
var colors = ['blue', 'red', 'green', 'orange', 'pink', 'yellow', 'brown', 'black']; // array of colors to use in cat generation

var cats = function(req, res){	// function to display all cats after sorting
	Cats.find(function(err, cats){
		if(err){
			throw err;
		}
		for(i = 0; i < cats.length; i++){	// sorting cats by age
			for(j = i; j < cats.length; j++){
				if(cats[j].age < cats[i].age){
					var temp = cats[i];
					cats[i] = cats[j];
					cats[j] = temp;
				}
			}
		}
		res.render("cats", {"cats": cats, 'displayType': 'all sorted cats'});
	});
};

var newCat = function(req, res){	// function to randomly generate a cat and add it to the database
	var colorList = [];
	for(i = 0; i < Math.floor(Math.random() * 3) + 1; i++){	// each cat is given a random number of colors
		colorList.push(colors[Math.floor(Math.random() * colors.length)]);
	}
	var newestCat = new Cats({name: names[Math.floor(Math.random()*names.length)], age: Math.floor(Math.random() * 10), colors: colorList});	//randomly generating a cat
	newestCat.save(function(err){
		if(err){console.log('Error saving cat');
	}});
	Cats.find(function(err, cats){
		if(err){
			throw err;
		}
		for(i = 0; i < cats.length; i++){	// sorting cats by age
			for(j = i; j < cats.length; j++){
				if(cats[j].age < cats[i].age){
					var temp = cats[i];
					cats[i] = cats[j];
					cats[j] = temp;
				}
			}
		}
		res.render("cats", {"cats": cats, 'displayType': 'all cats', 'optional': 'Added a cat named ' + newestCat.name + ' that is ' + newestCat.age + '-years old!'});
	});
	
};


var sortedCat = function(req, res, next, value){	// function to filter the list of cats by a specified color, then sort by age
	var coloredCats = [];
	Cats.find(function(err, cats){
		if(err){
			throw err;
		}
		for(i = 0; i < cats.length; i++){	// filtering cats that have the specified color
			for(j = 0; j < cats[i].colors.length; j++){
				if(cats[i].colors[j] == value){
					coloredCats.push(cats[i]);
					break;
				}
			}
		}
		for(i = 0; i < coloredCats.length; i++){	// sorting cats by age
			for(j = i; j < coloredCats.length; j++){
				if(coloredCats[j].age < coloredCats[i].age){
					var temp = coloredCats[i];
					coloredCats[i] = coloredCats[j];
					coloredCats[j] = temp;
				}
			}
		}
		res.render("cats", {"cats": coloredCats, 'displayType': value + ' cats'});
	});
	
}

var deleteCat = function(req, res){	// function to remove the oldest cat from the database
	var catName;
	Cats.find(function(err, cats){
		var maxIndex = 0;
		for(i = 0; i < cats.length; i++){	// find the index of the oldest cat
			if(cats[i].age > cats[maxIndex].age){
				maxIndex = i;
			}
		}
		catName = cats[maxIndex].name;
		var catAge = cats[maxIndex].age;
		var catColors	 = cats[maxIndex].colors;
		Cats.find({name: catName, age: catAge, colors: catColors}).remove(function(err, cat){
			if(err){throw err;}
		});
	});
	Cats.find(function(err, cats){
		res.render("cats", {"cats": cats, 'displayType': 'all cats', 'optional': 'Deleted cat ' + catName});
	});
	
}

var deleteYoung = function(req, res){	// function to remove all cats with an age less than 2 years
	Cats.find({age: {$lt: 2}}).remove(function(err, cat){
			if(err){throw err;}});	// there was a timing issue when putting the render in this callback, such that the page would render before the cat was removed from the database
	Cats.find(function(err, cats){
		res.render("cats", {"cats": cats, 'displayType': 'all cats', 'optional': 'Deleted cats below 2 years old :)'});
		});
}

var singleColor = function(req, res){	// function to display cats that have only one color 
	Cats.find({colors: {$size: 1}}, function(err, cats){
		res.render("cats", {"cats": cats, 'displayType': 'all cats', 'optional': 'Displaying cats with only one color'});
	})
}

module.exports.cats = cats;
module.exports.newCat = newCat;
module.exports.sortedCat = sortedCat;
module.exports.deleteCat = deleteCat;
module.exports.deleteYoung = deleteYoung;
module.exports.singleColor = singleColor;
module.exports.names = names;
module.exports.colors = colors;