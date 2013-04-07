htlivesight.players = {

};
htlivesight.Player = function Team(id, firstName, lastName, specialty, teamId, youth) {
	this.id = id;
	this.firstName = firstName;
	this.lastName = lastName;
	this.specialty = specialty;
	this.teamId = teamId;
	this.youth = youth;

};
htlivesight.Player.List = new Object();
htlivesight.players.HTTPGet = function (playerId,youth) {
	if(htlivesight.Player.List["_"+playerId+"_"+youth].specialty!="") return;
	if(youth=="false"){

	var parameters=[["file","playerdetails"],
	                ["version", "2.4"],
	                ["playerID",playerId],
	                ];
	}else{

		var parameters=[["file","youthplayerdetails"],
		                ["version", "1.0"],
		                ["youthPlayerId",playerId],
		                ];
			
	}

	htlivesight.ApiProxy.retrieve(document, parameters, function(xml){htlivesight.players.ParseGet(xml,playerId, youth);});

};
htlivesight.players.ParseGet = function(xml,playerId, youth){
	//	var firstName = xml.getElementsByTagName("FirstName")[0].textContent;

	//	var lastName = xml.getElementsByTagName("LastName")[0].textContent;

//		var playerId;
//		if(youth=="true"){
//			playerId = xml.getElementsByTagName("YouthPlayerID")[0].textContent;
//		}else{
//			playerId = xml.getElementsByTagName("PlayerID")[0].textContent;	
//		}

		var specialty = xml.getElementsByTagName("Specialty")[0].textContent;
		if(specialty == "" && youth=="true")specialty="0"; 

	//	var player = new htlivesight.Player(playerId, firstName, lastName, specialty, teamId, youth);

		htlivesight.Player.List["_"+playerId+"_"+youth].specialty = specialty;

		if(parseInt(specialty)>=0 && parseInt(specialty)<=6){
		  htlivesight.players.addSpecialtyToDom(playerId,youth,specialty);
		}

};
htlivesight.players.specialtyChar = function (specialty){

	switch (specialty){
	case "0": return "";
	break;
	case "1": return "["+htlivesight.Util.Parse("Technical",htlivesight.data[0])+"] ";
	break;
	case "2": return "["+htlivesight.Util.Parse("Quick",htlivesight.data[0])+"] ";
	break;
	case "3": return "["+htlivesight.Util.Parse("Powerful",htlivesight.data[0])+"] ";
	break;
	case "4": return "["+htlivesight.Util.Parse("Unpredictable",htlivesight.data[0])+"] ";
	break;
	case "5": return "["+htlivesight.Util.Parse("Header",htlivesight.data[0])+"] ";
	break;
	case "6": return "["+htlivesight.Util.Parse("Regainer",htlivesight.data[0])+"] ";
	break;
	default: return "";
	};
};

htlivesight.players.addSpecialtyToDom = function (playerId, youth, specialty){

	var playerClass;

	if(youth.toLowerCase()=="true"){
		playerClass = ""+playerId+"_youth";
	}else{
		playerClass = ""+playerId;
	}
	$("."+playerClass).each(function() {
		if(!$(this).hasClass("withSpecialty")){
			$(this).text($(this).text()+" "+htlivesight.players.specialtyChar(specialty));
			$(this).addClass("withSpecialty");
		}
	});
};