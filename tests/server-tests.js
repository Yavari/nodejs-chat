var server = require('../server/server');
var assert = require('assert'),
    http = require('http');


describe('/', function () {
	before(function () {
		server.listen(8082, 4002);
	});

	after(function () {
		var i = 0;
	  server.close(function(){
	  	i++;
	  	if(i == 2) {
				console.log("All servers closed");
	  	}
	  });
	});

	it('should return 200', function (done) {
	  	http.get('http://localhost:8082', function (res) {
		    assert.equal(200, res.statusCode);
		    done();
		});
	});

			
	it('should return 200', function (done) {
  	http.get('http://localhost:8082', function (res) {
	    assert.equal(200, res.statusCode);
	    done();
		});
	});
});
