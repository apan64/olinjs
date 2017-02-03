var $ingredientsForm = $("#ajax-form");

$('.ajax-form-edit').submit(function(event){  // edits the name and price of an ingredient based on text field inputs when edit button is pressed
  event.preventDefault();
  var buttonID = $(this).attr('id');
  var div = $(this).parent();
  var newName = div.children()[0].value;
  var newPrice = parseInt(div.children()[1].value);
  $.post('editIngredient', {
    name: newName,
    price: newPrice,
    id: buttonID
  }).done(function(data){
  });
});

$('.ajax-form-out').submit(function(event){ // hides the ingredient and sets its inStock value to false
  event.preventDefault();
  var buttonID = $(this).attr('id');
  var div = $(this).parent();
  div.hide();
  $.post('outIngredient', {
    id: buttonID
  }).done(function(data){
  }).error(function(err){
    console.log(err);
  });
});

$ingredientsForm.submit(function(event) { // adds a new ingredient to the database and displays it
  event.preventDefault();
  var thisName = $ingredientsForm.find("[name='addName']").val();
  var thisPrice = $ingredientsForm.find("[name='addPrice']").val();
  $.post("postIngredient", {
    name: thisName,
    price: thisPrice
  }).done(function(data){
    var div = $('div').first().clone();
    div.attr('id', data._id);
    div.children()[0].value = data.name;
    div.children()[1].value = data.price.toString();
    div.children()[3].id = data._id;
    div.children()[4].id = data._id;
    $('#ingredientList').append(div);
  });
});

