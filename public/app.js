$(function(){

	var socket = io.connect();
	
	stream = $('#stream');
	TweetTPL = $('#tpl-tweet').html();

	var coma = function(str){
		return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	var van = 3141592;

	socket.on('tweet', function(t){
		van += 1;
		var el = $(Mustache.render(TweetTPL, t));
		$('#count').text(coma(van));
		stream.prepend(el);
		setTimeout(function(){ el.removeClass('nuevo');}, 500);
		if (stream.children().length > 6) {
			stream.children().last().remove();
		}
	});

	socket.on('go-normal', function(){
		$('body').removeClass('counter resaltado').addClass('normal');
	});

	var resaltado = {
		usuario: $('#text h2'),
		texto: $('#text p')
	};
	socket.on('go-resalte', function(t){
		$('body').removeClass('normal counter').addClass('resaltado');
		resaltado.usuario.text('@'+t.user.name);
		resaltado.texto.html(t.text);
		if (t.media) {
			$('#selected').css('background-image', 'url('+t.media+')');
		} else {
			$('#selected').css('background-image', 'none');
		}
		
	});

	socket.on('go-counter', function(){
		$('body').removeClass('normal resaltado').addClass('counter');
		$('#count').text(coma(van));
	});

});