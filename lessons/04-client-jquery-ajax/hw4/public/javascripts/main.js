var $form = $("#ajax-form");

var onSuccess = function(data, status) {
  // var img = "<img src='"+data+"'/>";
  // $("#result").html(img);
};

// var onError = function(data, status) {
//   console.log("status", status);
//   console.log("error", data);
// };
// $('button').click(function(){
//   var buttonName = this.name;
//   var ans;
//   if(buttonName.indexOf('Out') != -1){
//     var thisName = $form.find("[name='" + buttonName.substring(0, buttonName.indexOf('Out')) + "']").val();
//     var thisPrice = $form.find("[name='" + buttonName.substring(0, buttonName.indexOf('Out')) + 'Price' + "']").val();
//     $.get("ingredients/out", {
//       name: thisName,
//       price: thisPrice
//     })
// }});

$form.submit(function(event) {
  event.preventDefault();
  var thisName = $form.find("[name='addName']").val();
  var thisPrice = $form.find("[name='addPrice']").val();
  console.log(thisName);
  console.log(thisPrice);
  // var thisPressed = $('input[type=button][clicked=true]').val();
  $.post("postIngredient", {
    name: thisName,
    price: thisPrice
  }).done(function(data){
    // var $template = $("#ingredientTemplate")
    //update template
    // $template.value = data.value
    // $('#ingredientList').append($template)
    $('#ingredientList').append('<input type="text" value=' + data.name + '><input type="text" value=' + data.price + '><br><form id="ajax-form" action="ingredients/out" method="Out"><button type = \'button\' name = ' + data.name + 'Out>Out of stock</button></form><form id="ajax-form" action="ingredients/edit" method="Edit"><button type = \'button\' name = ' + data.name + 'Edit>Edit</button></form><br>');
    // console.log(data);

  });
  // $.get("ingredients/out", {
  //   pressed: thisPressed
  // });
    // .done(onSuccess)
    // .error(onError);
});
