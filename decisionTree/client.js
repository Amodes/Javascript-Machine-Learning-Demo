$(document).ready(function(){
console.log("client ready");	

	// connect to server socket
	var socket = io.connect();
	// connect and listen to socket with stream name 'credit'
	socket.on('music', function (data) {
	
		if (data.result.rock){
			answer = "Rock";
		}
		else if (data.result.hiphop){
			answer = "Hip Hop";
		}
		else if (data.result.electro){
			answer = "Electro";
		}
		else if (data.result.pop){
			answer = "Pop";
		}
		else {
			answer = "I dont know"
		}
		// place answer on webpage
		$('#answer').html(answer);
	});
	
	
	function send(){
		
		//getting values
		var rhcp = $( "#rhcp option:selected" ).text();
		var bieber = $( "#bieber option:selected" ).text();
		var soad = $( "#soad option:selected" ).text();
		var eminem = $( "#eminem option:selected" ).text();
		var dg = $( "#dg option:selected" ).text();
		var wtc = $( "#wtc option:selected" ).text();
		var gaga = $( "#gaga option:selected" ).text();
		var dp = $( "#dp option:selected" ).text();
		//send to server
		socket.emit('music', { rhcp: rhcp, bieber: bieber, soad: soad, eminem: eminem, dg: dg, wtc: wtc, gaga: gaga, dp: dp});
	}
	
	
	
	$('#ask').click(send);
	$('#text').keypress(function (e) {
		if (e.which == 13) {
			send();
		}
	});
	
	
});