$('#log').submit(function(event){
	event.preventDefault();
	$('#error').text('');
	if($('#logButton').attr('value') == 'Login'){
		var username = $('#logField').val();
		$.post('/login', {
			user: username
		}).done(function(data){
			$('#hi').text('-' + username);
			$('#logButton').attr('value', 'Logout');
			$('#create').show();
			$('#login').hide();
			if(data.new){
				var div = $('.users').first().clone();
				div.id = data.id;
				div.text(username);
				div.show();
				$('#users').prepend('<br>');
				$('#users').prepend(div);
				// $('#users').first().attr('style', 'background-color: #eaeaaa');
			}
		}).error(function(err){
			console.log(err);
		});
	}
	else{
		$.get('/logout').done(function(data){
			$('#logButton').attr('value', 'Login');
			$('#create').hide();
			$('#login').show();
			$('#hi').text('');
		}).error(function(err){
			console.log(err);
		});
	}
});

$('#createDong').submit(function(event){
	event.preventDefault();
	if($('#logButton').attr('value') == 'Login'){
		$('#error').text('You\'re not logged in you dingus');
	}
	else{
		$('#error').text('');
		var dong = $('#dong').val();
		var curUser = $('#hi').text().substring(1, $('#hi').text().length);
		$.post('/createDong', {
			newDong: dong,
			user: curUser
		}).done(function(data){
			var div = $('.dongs').first().clone();
			var divRemove = $('.removeDongs').first().clone();
			div.attr('id', data.id);
			div.text(dong + ' -' + curUser);
			div.show();
			divRemove.attr('id', data.id);
			divRemove.children().attr('id', data.id);
			divRemove.children().children().attr('id', data.id);
			divRemove.children().children().attr('class', curUser);
			divRemove.show();
			$('#dongs').prepend(divRemove);
			$('#dongs').prepend(div);
		}).error(function(err){
			console.log(err);
		});
	}
});

$('.remove').submit(function(event){
	event.preventDefault();
	var curUser = $('#hi').text().substring(1, $('#hi').text().length);
	if(curUser != $(this).children().attr('class')){
		$('#error').text('That\'s not you, you dingus');
	}
	else{
		$('#error').text('');
		var buttonID = $(this).attr('id');
		var div = $(this).parent();
		var checkName = $(this).children().attr('class');
		$.post('/deleteDong', {
			id: buttonID,
			name: checkName
		}).done(function(data){
			div.remove();
			$('#' + buttonID).remove();
		}).error(function(err){
			console.log(err);
		});
	}
});

$('.users').on('click', function(event){
	event.preventDefault();
	var userID = $(this).attr('id');
	$('div').each(function(){
		$(this).attr('style', 'background-color: transparent');
	});
	$.post('/userClick', {
		id: userID
	}).done(function(data){
		$('div').each(function(){
			if(data.dongs.indexOf($(this).attr('id')) != -1){
				$(this).attr('style', 'background-color: yellow');
			}
			if(this.id == 'hidden'){
				$(this).hide();
			}
			if($('#logButton').attr('value') == 'Login'){
				$('#create').hide();
			}
			else{
				$('#create').show();
				$('#login').hide();
			}
		});
	}).error(function(err){
		console.log(err);
	});
});