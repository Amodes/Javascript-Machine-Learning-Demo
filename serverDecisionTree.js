	// Demo for supervised machine learning - Decision Tree (For more info: http://joonku.com/project/machine_learning/apidoc#decision_tree	)
	
	// GLOBALS
	var express = require('express');
	var app = express();
	var server = require('http').createServer(app);
	var io = require('socket.io').listen(server);
	var port = 80;

	// SET SERVER ON PORT
	server.listen(port);
	console.log('server running on http://127.0.0.1');
	console.log('server listening on port '+port);

	// SET APPLICATON PATH
	app.configure(function(){ app.use(express.static(__dirname + '/decisionTree')); });
	app.get('/', function (req, res){ res.sendfile(__dirname + '/decisionTree/index.html'); });
	
	// SET SOCKET CONNECTION(S)
	io.sockets.on('connection', function (socket) {
		// listen to socket with stream name 'music'
		socket.on('music', function (data) {
			
			// calculate/classify data
			var result = dt.classify([data.rhcp, data.bieber, data.soad, data.eminem, data.dg, data.wtc, data.gaga, data.dp]);
			// send result to client
			console.log(result);
			io.sockets.emit('music', { result});
			
		});
	});
	
	
	/**--											 Important Stuff for ML starts here 								--**/
	
	// include machine learning module for nodeJS
	var ml = require('machine_learning');
	
	// Training DataInputs; 0=like	1=disklike
	var data = [
	
	// Red Hot Chilli Peppers, Justin Bieber, 	System of a down, 		Eminem, 		David Guetta,	 WuTangClan,		Lady Gaga, 		Daft Punk
		[1,							0,					0,					0,				0,				0,					0,			0],		// User 0 Input
		[1,							0,					1,					1,				0,				0,					0,			0],		// User 1 Input
		[0,							0,					1,					0,				0,				0,					0,			0],		// ...
		[0,							0,					0,					0,				0,				1,					0,			0],
		[0,							0,					1,					1,				0,				1,					0,			0],
		[0,							0,					0,					1,				0,				0,					0,			0],
		[1,							0,					0,					1,				1,				0,					0,			1],
		[0,							0,					0,					1,				1,				0,					0,			1],
		[0,							0,					0,					0,				0,				0,					0,			1],
		[0,							1,					0,					0,				0,				0,					0,			0],
		[0,							1,					0,					0,				1,				0,					1,			0],
		[0,							0,					0,					0,				0,				0,					1,			0],
	];
	
	// Training Data Outputs: The Inputs of var data make the following outputs
	var result = [
		'rock',		// User 0 Output
		'rock',		// User 1 Output
		'rock',		// ...
		'hiphop',
		'hiphop',
		'hiphop',
		'electro',
		'electro',
		'electro',
		'pop',
		'pop',
		'pop'
	];
	
	// define data and results for decision tree
	var dt = new ml.DecisionTree({
		data : data,
		result : result
	});
	// make decision tree
	dt.build();
	dt.print();

	console.log('...machine learning finished');
