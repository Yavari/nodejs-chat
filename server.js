var http = require('http');
var SocketServer = require('./socketServer');
var WebSocketServer = require('./webSocketServer');
var EventEmitter = require('events').EventEmitter;


var eventEmitter = new EventEmitter();

var server = http.createServer();
server.on('request', function(req, res){
  eventEmitter.on('message', function(data){ 
    res.write(data);
    if(JSON.parse(data).message.substr(0,3) == "end"){
        res.end();
      }
   });
});
server.listen(8081);

var socketServer = new SocketServer.createServer(eventEmitter);
var webSocketServer = new WebSocketServer.createServer(server, eventEmitter);
socketServer.listen(4001);

eventEmitter.on('message', function(data){
  var obj = JSON.parse(data);
  console.log(obj.name + ": " + obj.message);
});