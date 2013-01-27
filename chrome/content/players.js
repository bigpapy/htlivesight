htlivesight.players = {

};
htlivesight.Player = function Team(id, firstName, lastName, specialty) {
	console.log("a1");
	this.id = id;
	console.log("a2");
	this.firstName = firstName;
	console.log("a3");
	this.lastName = lastName;
	console.log("a4");
	this.specialty = specialty;
	console.log("a5");
};

htlivesight.players.HTTPGet = function (teamId,sourceSystem) {return;
	console.log("b1 sourceSystem ="+sourceSystem+" teamId= "+teamId);
	youth = ((sourceSystem == "youth" || sourceSystem == "Youth" ) ? "True" : "False");
	console.log("b2");
	if ((youth == "True") || window.htlivesight.Live.PlayerList["_"+teamId+"_"+youth] )return;
	console.log("b3");
	var parameters=[["file","players"],
	                ["version", "2.2"],
	                ["teamID",teamId],
	                ];
	console.log("b4");
	htlivesight.ApiProxy.retrieve(document, parameters, function(xml){htlivesight.players.ParseGet(xml, teamId, youth);});
	console.log("b5");
};
htlivesight.players.ParseGet = function(xml, teamId, youth){
	console.log("c1");
	var playerList = {};
	console.log("c2");
	var playerNodes = xml.getElementsByTagName("Player");
	console.log("c3");
	for(var j = 0, len = playerNodes.length; j< len ;j++){
		console.log("c4");
		var playerNode = playerNodes[j];
		console.log("c5");
		var firstName = playerNode.getElementsByTagName("FirstName")[0].textContent;
		console.log("c6");
		var lastName = playerNode.getElementsByTagName("LastName")[0].textContent;
		console.log("c7");
		var playerId = playerNode.getElementsByTagName("PlayerID")[0].textContent;
		console.log("c8");
		var specialty = playerNode.getElementsByTagName("Specialty")[0].textContent;
		console.log("c9");
		console.log(" firstName= "+ firstName + " lastName= "+ lastName + " playerId= "+ playerId + " specialty= " + specialty);
		var player = new htlivesight.Player(playerId, firstName, lastName, specialty);
		console.log("c10");
		playerList["_"+playerId] = player;
		console.log("c11");
	}
	console.log("c12");
	window.htlivesight.Live.PlayerList["_"+teamId+"_"+youth] = playerList;
	console.log("c13");
//	alert("end loading players from xml!");
};