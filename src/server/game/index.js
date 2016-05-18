var http = require('http');
var server = http.createServer(function(req, res){

});

var io = require('socket.io').listeni(server);

io.socket.on('connection'), function(socket){
	console.log('Un client s\'est connecté');
});

server.listen(8000);
