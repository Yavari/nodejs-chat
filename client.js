var stream = require('stream');
var util = require('util');
var net = require('net');

var Transform = stream.Transform;

if (process.argv.length < 5) {
  console.log('Usage: ' + process.argv[0] + ' ' + process.argv[1] + ' ' + process.argv[2] +
  	' <host> <port> <name>');
  return;
}

var host = process.argv[2],
    port = process.argv[3];
    name = process.argv[4];
    
var conn = net.createConnection(port, host);

// Not sure about how to do this better
function ChatSendMessage(options) {
  // allow use without new
  if (!(this instanceof ChatSendMessage)) {
    return new ChatSendMessage(options);
  }

  // init Transform
  Transform.call(this, options);
}
util.inherits(ChatSendMessage, Transform);

ChatSendMessage.prototype._transform = function (chunk, enc, cb) {
  var data = {name:name, message:chunk.toString()};
  this.push(JSON.stringify(data));
  cb();
};



var sendMesage = new ChatSendMessage();

process.stdin.resume();
process.stdin.pipe(sendMesage);
sendMesage.pipe(conn);


//This should also be piped I think
conn.on('data', function(data){
	var obj = JSON.parse(data);
	var username = obj.name;
	if(username == name){
		username = "Me";
	}
	console.log(username + ": " + obj.message);
})