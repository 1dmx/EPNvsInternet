$(function(){

	var socket = io.connect();
	
	stream = $('#stream');
	TweetTPL = $('#tpl-tweet').html();

	var coma = function(str){
		return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	var van = 3141592;

	var counter = $('#count');

	socket.on('tweet', function(t){
		van += 1;
		console.log(coma(van));
		counter.text(coma(van));

		var el = $(Mustache.render(TweetTPL, t));
		stream.prepend(el);
		setTimeout(function(){ el.removeClass('nuevo');}, 500);

		if (stream.children().length > 200) {
			stream.children().last().remove();
		}
	});

	stream.on('click', '.tweet', function(evt){
		$('.resaltado').removeClass('resaltado');
		$(this).addClass('resaltado');
		var resaltado = $('.resaltado');
		$('#resaltado-text').html('@'+resaltado.find('h2').text()+': '+resaltado.find('p').html());
	});


	$('#go-counter').on('click', function(evt){
		evt.preventDefault();
		socket.emit('switch', {screen:'counter'});
	});

	$('#go-resalte').on('click', function(evt){
		evt.preventDefault();
		var resaltado = $('.resaltado');
		if (resaltado.length === 0) {
			alert('no tengo tuit por resaltar');
			return false;
		}

		var data = {
			user: {
				name: resaltado.find('h2').text()
			},
			text: resaltado.find('p').html()
		};

		data.media = resaltado.find('.media').attr('src');
		socket.emit('switch', {screen:'resalte', data: data});
	});

	$('#go-normal').on('click', function(evt){
		evt.preventDefault();
		socket.emit('switch', {screen:'normal'});
	});



});