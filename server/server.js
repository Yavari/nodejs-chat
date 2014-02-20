var http = require('http');
var SocketServer = require('./socketServer');
var WebSocketServer = require('./webSocketServer');
var EventEmitter = require('events').EventEmitter;


var eventEmitter = new EventEmitter();

var server = http.createServer();
server.on('request', function(req, res){
   

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, world!\n');

  eventEmitter.on('message', function(data){ 
    res.write(data);
    if(JSON.parse(data).message.substr(0,3) == "end"){
        res.end();
      }
   });

  //Need to destory connection in order to be able to close server
  eventEmitter.on('send-close', function(){
    req.destroy();
  });

});

var socketServer = new SocketServer.createServer(eventEmitter);
var webSocketServer = new WebSocketServer.createServer(server, eventEmitter);

eventEmitter.on('message', function(data){
  var obj = JSON.parse(data);
  console.log(obj.name + ": " + obj.message);
});

module.exports.createServer = function(eventEmitter){ 
  return new SocketServer(eventEmitter);
};

exports.listen = function(httpPort, socketPort){
	server.listen(httpPort);
	socketServer.listen(socketPort);
};

exports.close = function(callback){
  eventEmitter.emit('send-close');
	server.close(callback);
	socketServer.close(callback);
};