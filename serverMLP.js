	// Demo for supervised machine learning - Multi-Layer Perceptron (Neural Network) (For more info: http://joonku.com/project/machine_learning/apidoc#multi_layer_perceptron )
	
	
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
	app.configure(function(){ app.use(express.static(__dirname + '/multiLayerPerceptron')); });
	app.get('/', function (req, res){ res.sendfile(__dirname + '/multiLayerPerceptron/index.html'); });
	
	// SET SOCKET CONNECTION(S)
	io.sockets.on('connection', function (socket) {
		// listen to socket with stream name 'music'
		socket.on('music', function (data) {
			
			// calculate/classify data
			var result = mlp.predict([[data.rhcp, data.bieber, data.soad, data.eminem, data.dg, data.wtc, data.gaga, data.dp]]);
			// send result to client
			console.log(result);
			io.sockets.emit('music', { result});
			
		});
	});
	
	/**--											 Important Stuff for ML starts here 								--**/


var ml = require('machine_learning');

// Training Data Inputs; 1.0=best rating	0.0=worst rating

var data = [
	// Red Hot Chilli Peppers, Justin Bieber,	 System of a down, 		Eminem, 		David Guetta,	 WuTangClan,		Lady Gaga, 	Daft Punk

		[0.8,							0.0,				0.8,			0.4,			0.2,			0.4,			0.0,		0.2],
		[1.0,							0.2,				0.2,			0.6,			0.0,			0.2,			0.0,		0.6],
		[0.2,							0.0,				0.2,			0.8,			0.2,			1.0,			0.0,		0.6],
		[0.8,							0.2,				0.6,			0.8,			0.4,			0.8,			0.0,		0.8],
		[0.2,							0.0,				0.0,			1.0,			0.2,			1.0,			0.0,		0.0],
		[0.2,							0.2,				0.0,			0.4,			0.8,			0.0,			0.2,		1.0],
		[0.0,							1.0,				0.0,			0.2,			0.0,			0.0,			0.6,		0.0],
		[1.0,							1.0,				0.2,			0.0,			0.2,			0.6,			0.0,		0.6],

	];

	
var result = [

	// Training Data Outputs: The Inputs of var data make the following outputs

// 	Linkin Park, 				Rihanna, 					ACDC,		 Kanye West, 		Martin Garrix, 	  2Pac, 		 Avicii
         [0.8, 						0.0,					1.0,			0.2,			0.1,			0.6,			0.2],
         [1.0, 						0.2,					0.4,			0.4,			0.2,			0.4,			0.6],
         [0.6, 						0.0,					0.2,			0.8,			0.2,			0.8,			0.6],
         [0.8, 						0.2,					0.6,			0.8,			0.6,			0.6,			0.8],
         [0.2, 						0.0,					0.0,			1.0,			0.0,			1.0,			0.0],
		 [0.2, 						0.2,					0.0,			0.2,			0.8,			0.0,			1.0],
		 [0.0, 						1.0,					0.0,			0.2,			0.0,			0.0,			0.0],
		 [0.8, 						0.8,					0.2,			0.4,			0.2,			0.6,			0.6],

		 ];
 
var mlp = new ml.MLP({
    'input' : data,
    'label' : result,
    'n_ins' : 8,  							// Number Artists (Input)
    'n_outs' : 7,							// Number Artists (Outputs)
    'hidden_layer_sizes' : [9,8,8]  		//number of hidden unit in each hidden layer
});
 
 
mlp.train({
    'lr' : 0.6,								// learn rate
    'epochs' : 20000						
});

