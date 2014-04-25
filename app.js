try {
	var Twit = require('twit');
	var express = require('express.io');
} catch(err) {
	console.error("No has instalado las dependencias necesarias!");
	console.log("Ejecuta `npm install` antes de correr este programa.");
	exit(1);
}

var app = express();
var fs = require('fs');
var os = require('os');

app.use("/", express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.http().io();

if (!fs.existsSync(__dirname+'/config.json')) {
	console.error('Necesitas crear un archivo config.json en este carpeta antes de correr este programa');
	exit(1);
}

var config = require(__dirname+'/config.json');
var T = new Twit(config.twitter);

var stream = T.stream('statuses/filter', {track: config.hashtags.join(',')});

var parsed = function(tweet) {
	media = null;

	if (tweet.entities.media) {
		tweet.entities.media.forEach(function(el, index){
			if (!media && el.type == 'photo') {
				media = el.media_url;
			}
		});
	}
	
	var text = tweet.text;
	if (tweet.retweeted_status) {
		var st = tweet.retweeted_status;
		text = "RT @"+st.user.screen_name+": "+st.text;
	}

	text = text.replace(/\#([\wáéíóúñü]+)/ig, '<strong>#$1</strong>');

	return {
		user: {
			name: tweet.user.screen_name,
			pic: tweet.user.profile_image_url
		},
		text: text,
		media: media
	};
};

stream.on('tweet', function(tweet){
	var t = parsed(tweet);
	app.io.broadcast('tweet', t);
});

app.get('/', function(req,res){
	res.render('index');
});

app.get('/control', function(req,res){
	res.render('control');
});

app.io.route('switch', function(req) {
    req.io.broadcast('go-'+req.data.screen, req.data.data);
});

config.port = config.port || 6547;
app.listen(config.port);
console.log("Corriendo en http://"+os.hostname()+":"+config.port);