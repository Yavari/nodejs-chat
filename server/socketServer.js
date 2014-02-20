var net = require('net');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var SocketServer = function(eventEmitter){
  var self = this;
  this.eventEmitter = eventEmitter;
  var server = net.createServer(function(socket) {
    
    socket.on('data', function(data) {
      self.eventEmitter.emit('message', data);
    });

    self.eventEmitter.on('message', function(data){
      socket.write(data);
    })
  });

  this.listen = function(port){
    server.listen(port);
  }

  this.close = function(callback) {
    server.close(callback);
  }
}

util.inherits(SocketServer, EventEmitter);

module.exports.createServer = function(eventEmitter){ 
  return new SocketServer(eventEmitter);
};