var db = require('../fakeDatabase');

//You could pull these lists out in a separate file and import them into this file
var names = ['Peter', 'David', 'John', 'Adam', 'Juan', 'Jag', 'Kyle']; // array of names to use in cat generation
var colors = ['blue', 'red', 'green', 'orange', 'pink', 'yellow', 'brown', 'black']; // array of colors to use in cat generation

var cats = function(req, res){	// function to display all cats after sorting
	var cats = db.getAll();
	for(i = 0; i < cats.length; i++){	// sorting cats by age
		for(j = i; j < cats.length; j++){
			if(cats[j].age < cats[i].age){
				var temp = cats[i];
				cats[i] = cats[j];
				cats[j] = temp;
			}
		}
	}
	db.data = cats;

	//Try to be consistent in using double quotes or single quotes for string just for styling
	res.render("cats", {"cats": db.getAll(), 'displayType': 'all sorted cats'});
};

var newCat = function(req, res){	// function to randomly generate a cat and add it to the database
	var colorList = [];
	for(i = 0; i < Math.floor(Math.random() * 3) + 1; i++){	// each cat is given a random number of colors
		colorList.push(colors[Math.floor(Math.random() * colors.length)]);
	}
	var newestCat = {name: names[Math.floor(Math.random()*names.length)], age: Math.floor(Math.random() * 10), colors: colorList};	//randomly generating a cat
	db.add(newestCat);
	var cats = db.getAll();

	//Since you also use this in your sortedCat function, you can have the following in a separate function that you call anytime you want to take cats list as an input and output a list of sorted cats
	for(i = 0; i < cats.length; i++){	// sorting cats by age
		for(j = i; j < cats.length; j++){
			if(cats[j].age < cats[i].age){
				var temp = cats[i];
				cats[i] = cats[j];
				cats[j] = temp;
			}
		}
	}
	db.data = cats

	//You could have a boolean for have hasOptional to dictate whether or not the optional text should show up, and then have an if statement in your handlebars only have a h4 tag with "Added a cat named {{this.newCat.name}} that is {{this.newCat.age}} - years old", so that the only thing you would have to pass into your render would be {"cats":db.getAll(), "newCat": newestCat, "hasOptional":true}. This will make it easier to be consistent amongst all of your res.renders. Plus, it's good practice to have long text that you want to show up to be in your handlebars, not in your js
	res.render("cats", {"cats": db.getAll(), 'displayType': 'all cats', 'optional': 'Added a cat named ' + newestCat.name + ' that is ' + newestCat.age + '-years old!'});
};

var sortedCat = function(req, res, next, value){	// function to filter the list of cats by a specified color, then sort by age
	var coloredCats = [];
	var cats = db.getAll();
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
}

var deleteCat = function(req, res){	// function to remove the oldest cat from the database
	var cats = db.getAll();
	var maxIndex = 0;
	for(i = 0; i < cats.length; i++){	// find the index of the oldest cat
		if(cats[i].age > cats[maxIndex].age){
			maxIndex = i;
		}
	}
	var name = cats[maxIndex].name;
	db.remove(maxIndex);
	res.render("cats", {"cats": db.getAll(), 'displayType': 'all cats', 'optional': 'Deleted cat ' + name});
}

module.exports.cats = cats;
module.exports.newCat = newCat;
module.exports.sortedCat = sortedCat;
module.exports.deleteCat = deleteCat;
module.exports.names = names;
module.exports.colors = colors;
