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
//	console.log(htlivesight.Player.List["_"+playerId+"_"+youth].specialty);
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
		var firstName = xml.getElementsByTagName("FirstName")[0].textContent;
		var lastName = xml.getElementsByTagName("LastName")[0].textContent;
		var nickName = xml.getElementsByTagName("NickName")[0].textContent;
		htlivesight.Player.List["_"+playerId+"_"+youth].firstName= firstName + " "+((nickName!=="")?("'"+nickName+"' "):"") + lastName ;
 //   console.log("counter: "+htlivesight.Live.counterPlayers+" downloading "+firstName+" "+lastName);
//		var playerId;
//		if(youth=="true"){
//			playerId = xml.getElementsByTagName("YouthPlayerID")[0].textContent;
//		}else{
//			playerId = xml.getElementsByTagName("PlayerID")[0].textContent;	
//		}
//		console.log(xml.getElementsByTagName("LastName")[0].textContent);
		var specialty = xml.getElementsByTagName("Specialty")[0].textContent;
		if(specialty == "" && youth=="true")specialty="0"; 

	//	var player = new htlivesight.Player(playerId, firstName, lastName, specialty, teamId, youth);

		htlivesight.Player.List["_"+playerId+"_"+youth].specialty = specialty;
		
		var age = xml.getElementsByTagName("Age")[0].textContent;
		htlivesight.Player.List["_"+playerId+"_"+youth].age = age;
		
		var ageDays = xml.getElementsByTagName("AgeDays")[0].textContent;
		htlivesight.Player.List["_"+playerId+"_"+youth].ageDays = ageDays;
		
		var tsi = xml.getElementsByTagName("TSI")[0].textContent;
		htlivesight.Player.List["_"+playerId+"_"+youth].tsi = tsi||'';
		
		var form = xml.getElementsByTagName("PlayerForm")[0].textContent;
		htlivesight.Player.List["_"+playerId+"_"+youth].form = form||'';
		
		var stamina = xml.getElementsByTagName("StaminaSkill")[0].textContent;
		htlivesight.Player.List["_"+playerId+"_"+youth].stamina = stamina||'';
		
		var experience = xml.getElementsByTagName("Experience")[0].textContent;
		htlivesight.Player.List["_"+playerId+"_"+youth].experience = experience||'';
		
		var loyalty = xml.getElementsByTagName("Loyalty")[0].textContent;
		htlivesight.Player.List["_"+playerId+"_"+youth].loyalty = loyalty||'';
		
		var motherClubBonus = xml.getElementsByTagName("MotherClubBonus")[0].textContent;
		htlivesight.Player.List["_"+playerId+"_"+youth].motherClubBonus = motherClubBonus||'';
		
		var isAbroad = xml.getElementsByTagName("IsAbroad")[0].textContent;
		htlivesight.Player.List["_"+playerId+"_"+youth].isAbroad = isAbroad||'';
		
		var keeperSkill = xml.getElementsByTagName("KeeperSkill")[0].textContent;
		if (keeperSkill !== "undefined"){
			htlivesight.Player.List["_"+playerId+"_"+youth].keeperSkill = keeperSkill;

			var playmakerSkill = xml.getElementsByTagName("PlaymakerSkill")[0].textContent;
			htlivesight.Player.List["_"+playerId+"_"+youth].playmakerSkill = playmakerSkill;
			
			var scorerSkill = xml.getElementsByTagName("ScorerSkill")[0].textContent;
			htlivesight.Player.List["_"+playerId+"_"+youth].scorerSkill = scorerSkill;
			
			var passingSkill = xml.getElementsByTagName("PassingSkill")[0].textContent;
			htlivesight.Player.List["_"+playerId+"_"+youth].passingSkill = passingSkill;
			
			var wingerSkill = xml.getElementsByTagName("WingerSkill")[0].textContent;
			htlivesight.Player.List["_"+playerId+"_"+youth].wingerSkill = wingerSkill;
			
			var defenderSkill = xml.getElementsByTagName("DefenderSkill")[0].textContent;
			htlivesight.Player.List["_"+playerId+"_"+youth].defenderSkill = defenderSkill;
			
			var setPiecesSkill = xml.getElementsByTagName("SetPiecesSkill")[0].textContent;
			htlivesight.Player.List["_"+playerId+"_"+youth].setPiecesSkill = setPiecesSkill;
			
		}

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
			$(this).attr('title', ''+htlivesight.Player.List["_"+playerId+"_"+youth].firstName+'\n'+
		//			((htlivesight.Player.List["_"+playerId+"_"+youth].isAbroad=="True")?"":" ⚑")+'\n'+
					'Age: '+htlivesight.Player.List["_"+playerId+"_"+youth].age +
					' Days: '+htlivesight.Player.List["_"+playerId+"_"+youth].ageDays+'\n' +
					((youth!=="true")?('Form: '+htlivesight.Player.List["_"+playerId+"_"+youth].form+"\n"):"")+
				((youth!=="true")?('Stamina: '+htlivesight.Player.List["_"+playerId+"_"+youth].stamina+'\n'):"")+
					((youth!=="true")?('Experience: '+htlivesight.Player.List["_"+playerId+"_"+youth].experience+'\n'):"")+
					((youth!=="true")?('Loyalty: '+htlivesight.Player.List["_"+playerId+"_"+youth].loyalty+" "):"")+
					((youth!=="true")?((htlivesight.Player.List["_"+playerId+"_"+youth].motherClubBonus=="True")?"♥\n":"\n"):"")+
					((youth!=="true")?('TSI: '+htlivesight.Player.List["_"+playerId+"_"+youth].tsi+'\n'):"") +
					((htlivesight.players.specialtyChar(specialty)!="")?(''+ htlivesight.players.specialtyChar(specialty)+"\n"):"")+
					((htlivesight.Player.List["_"+playerId+"_"+youth].keeperSkill)?("\nKeeper : "+htlivesight.Player.List["_"+playerId+"_"+youth].keeperSkill):"")+
					((htlivesight.Player.List["_"+playerId+"_"+youth].defenderSkill)?("\nDefender : "+htlivesight.Player.List["_"+playerId+"_"+youth].defenderSkill):"")+
					((htlivesight.Player.List["_"+playerId+"_"+youth].playmakerSkill)?("\nPlaymaker : "+htlivesight.Player.List["_"+playerId+"_"+youth].playmakerSkill):"")+
					((htlivesight.Player.List["_"+playerId+"_"+youth].wingerSkill)?("\nWinger : "+htlivesight.Player.List["_"+playerId+"_"+youth].wingerSkill):"")+
					((htlivesight.Player.List["_"+playerId+"_"+youth].passingSkill)?("\nPassing : "+htlivesight.Player.List["_"+playerId+"_"+youth].passingSkill):"")+
					((htlivesight.Player.List["_"+playerId+"_"+youth].scorerSkill)?("\nScorer : "+htlivesight.Player.List["_"+playerId+"_"+youth].scorerSkill):"")+
					((htlivesight.Player.List["_"+playerId+"_"+youth].setPiecesSkill)?("\nSetPieces : "+htlivesight.Player.List["_"+playerId+"_"+youth].setPiecesSkill):""));
			$(this).addClass("withSpecialty");
		}
	});
};