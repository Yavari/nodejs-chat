var net = require('net');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var SocketServer = function(){
  var self = this;
  var server = net.createServer(function(socket) {
    
    socket.on('data', function(data) {
      self.emit('data', data);
    });

    self.on('data', function(data){
      socket.write(data);
    })
  });

  this.listen = function(port){
    server.listen(port);
  }
}

util.inherits(SocketServer, EventEmitter);

module.exports.createServer = function(){ 
  return new SocketServer();
};