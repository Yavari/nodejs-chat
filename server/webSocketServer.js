var EventEmitter = require('events').EventEmitter;
var util = require('util');

var WebSocketServer = require('websocket').server;

var SocketServer = function(server, eventEmitter){
	var self = this;
	this.eventEmitter = eventEmitter;
	var wsServer = new WebSocketServer({
		httpServer: server
	});

	wsServer.on('request', function(r){
		var connection = r.accept('echo-protocol', r.origin);
		connection.on('message', function(message) {
			self.eventEmitter.emit('message', message.utf8Data);
		});

		self.eventEmitter.on('message', function(message){
			connection.sendUTF(message);
		});
	});
  this.close = function(callback){
    console.log(wsServer);
    wsServer.close(callback);
  }
}

util.inherits(SocketServer, EventEmitter);

module.exports.createServer = function(server, eventEmitter){ 
  return new SocketServer(server, eventEmitter);
};

