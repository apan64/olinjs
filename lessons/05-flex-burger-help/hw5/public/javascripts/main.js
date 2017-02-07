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
    div.children()[2].id = data._id;
    div.children()[3].id = data._id;
    $('#ingredientList').append(div);
  });
});

$('.checkbox').change(function(event){  // event for when a checkbox changes its checked value, sends the new checkbox state to server and updates the running total
  event.preventDefault();
  var checkboxID = $(this).attr('id');
  var newState = this.checked;
  $.post('checkbox', {
    id: checkboxID,
    state: newState
  }).done(function(data){
    $('#running-total').text('$' + data.tot);
    $('#submitted').text("");
  }).error(function(err){
    console.log(err);
  });
});

$('#submit-order').submit(function(event){  // event for an order submission, sends all checked ingredients to server, resets checkboxes
  event.preventDefault();
  var all = $('.checkbox');
  var orderedIngredients = '';
  for(i = 0; i < all.length - 1; i++){
    if(all[i].checked){
      orderedIngredients += all[i].name + ' ';
    }
  }
  $.post('postOrder', {
    ordered: orderedIngredients
  }).done(function(data){
    $('#submitted').text("Your order has been submitted!")
    for(i = 0; i < all.length - 1; i++){
      all[i].checked = false;
    }
  }).error(function(err){
    console.log(err);
  });
});

$('.orderForm').submit(function(event){ // event for kitchen completed order, removes order from page
  event.preventDefault();
  var buttonID = $(this).attr('id');
  var div = $(this).parent();
  div.hide();
  $.post('completeOrder', {
    id: buttonID
  }).done(function(data){

  }).error(function(err){
    console.log(err);
  })
})