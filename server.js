var http = require('http');
var SocketServer = require('./socketServer');

var socketServer = new SocketServer.createServer();

socketServer.on('data', function(data){
  var obj = JSON.parse(data);
  console.log(obj.name + ": " + obj.message);
});
socketServer.listen(4001);

var server = http.createServer();
server.on('request', function(req, res){
  socketServer.on('data', function(data){ 
    res.write(data);
    if(JSON.parse(data).message.substr(0,3) == "end"){
        res.end();
      }
   });
});
server.listen(8080);