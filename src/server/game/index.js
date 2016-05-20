require("babel-register")({
	extensions: [".js6"]
});
var Game = require('../metier/Game.js6');

var g = new Game.default();

/*
 var http = require('http');
var server = http.createServer(function(req, res){

});

var io = require('socket.io').listen(server);

io.socket.on('connection', function(socket){
	console.log('Un client s\'est connecté');
});

server.listen(8000);*/
