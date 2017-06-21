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
		else if (data.result.trash){
			answer = "Pop";
		}
		else {
			answer = "I dont know"
		}
		// place answer on webpage
		$('#lp').html(data.result[0][0]); 
		$('#rihanna').html(data.result[0][1]); 
		$('#acdc').html(data.result[0][2]); 
		$('#kanye').html(data.result[0][3]); 
		$('#mg').html(data.result[0][4]); 
		$('#pac').html(data.result[0][5]); 
		$('#avicii').html(data.result[0][6]); 
	});
	

	function send(){
		
		//getting values
		var rhcp = parseFloat($( "#rhcp option:selected" ).text());
		var bieber = parseFloat($( "#bieber option:selected" ).text());
		var soad = parseFloat($( "#soad option:selected" ).text());
		var eminem = parseFloat($( "#eminem option:selected" ).text());
		var dg = parseFloat($( "#dg option:selected" ).text());
		var wtc = parseFloat($( "#wtc option:selected" ).text());
		var gaga = parseFloat($( "#gaga option:selected" ).text());
		var dp = parseFloat($( "#dü option:selected" ).text());
		//send to server
		socket.emit('music', { rhcp: rhcp, bieber: bieber, soad: soad, eminem: eminem, dg: dg, wtc: wtc, gaga: gaga, dp: dp});
	}
	
	
	// bei einem Klick
	$('#ask').click(send);
	// oder mit der Enter-Taste
	$('#text').keypress(function (e) {
		if (e.which == 13) {
			send();
		}
	});
	
	
});