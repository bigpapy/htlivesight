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
htlivesight.Player.List = {};
htlivesight.players.HTTPGet = function (playerId,youth) {
//	console.log(htlivesight.Player.List["_"+playerId+"_"+youth].specialty);
	var parameters;
	if(htlivesight.Player.List["_"+playerId+"_"+youth].specialty!=="") return;
	if(youth=="false"){
		parameters=[["file","playerdetails"],["version", "2.4"],["playerID",playerId],];
	}else{
		parameters=[["file","youthplayerdetails"],["version", "1.0"],["youthPlayerId",playerId],];
	}
	if(playerId!==0){
		htlivesight.ApiProxy.retrieve(document, parameters, function(xml){htlivesight.players.ParseGet(xml,playerId, youth);});
	}
};
htlivesight.players.ParseGet = function(xml,playerId, youth){
	var firstName = xml.getElementsByTagName("FirstName")[0].textContent;
	var lastName = xml.getElementsByTagName("LastName")[0].textContent;
	var nickName = xml.getElementsByTagName("NickName")[0].textContent;
	htlivesight.Player.List["_"+playerId+"_"+youth].firstName= firstName + " "+((nickName!=="")?("'"+nickName+"' "):"") + lastName ;
	//   console.log("counter: "+htlivesight.Live.counterPlayers+" downloading "+firstName+" "+lastName);
//	var playerId;
//	if(youth=="true"){
//	playerId = xml.getElementsByTagName("YouthPlayerID")[0].textContent;
//	}else{
//	playerId = xml.getElementsByTagName("PlayerID")[0].textContent;	
//	}
//	console.log(xml.getElementsByTagName("LastName")[0].textContent);
	var specialty = xml.getElementsByTagName("Specialty")[0].textContent;
	if(specialty === "" && youth=="true")specialty="0"; 

	//	var player = new htlivesight.Player(playerId, firstName, lastName, specialty, teamId, youth);

	htlivesight.Player.List["_"+playerId+"_"+youth].specialty = specialty;

	var age = xml.getElementsByTagName("Age")[0].textContent;
	htlivesight.Player.List["_"+playerId+"_"+youth].age = age;

	var ageDays = xml.getElementsByTagName("AgeDays")[0].textContent;
	htlivesight.Player.List["_"+playerId+"_"+youth].ageDays = ageDays;
	
	var aggressiveness = xml.getElementsByTagName("Aggressiveness")[0].textContent;
	htlivesight.Player.List["_"+playerId+"_"+youth].aggressiveness = aggressiveness;
	
	var honesty = xml.getElementsByTagName("Honesty")[0].textContent;
	htlivesight.Player.List["_"+playerId+"_"+youth].honesty = honesty;

	if(youth!="true"){

		var tsi = xml.getElementsByTagName("TSI")[0].textContent;
		htlivesight.Player.List["_"+playerId+"_"+youth].tsi = tsi;

		var form = xml.getElementsByTagName("PlayerForm")[0].textContent;
		htlivesight.Player.List["_"+playerId+"_"+youth].form = htlivesight.players.parserMainSkill(form);

		var stamina = xml.getElementsByTagName("StaminaSkill")[0].textContent;
		htlivesight.Player.List["_"+playerId+"_"+youth].stamina = htlivesight.players.parserMainSkill(stamina);

		var experience = xml.getElementsByTagName("Experience")[0].textContent;
		htlivesight.Player.List["_"+playerId+"_"+youth].experience = htlivesight.players.parserMainSkill(experience);

		var loyalty = xml.getElementsByTagName("Loyalty")[0].textContent;
		htlivesight.Player.List["_"+playerId+"_"+youth].loyalty = htlivesight.players.parserMainSkill(loyalty);

		var motherClubBonus = xml.getElementsByTagName("MotherClubBonus")[0].textContent;
		htlivesight.Player.List["_"+playerId+"_"+youth].motherClubBonus = motherClubBonus||'';

		var isAbroad = xml.getElementsByTagName("IsAbroad")[0].textContent;
		htlivesight.Player.List["_"+playerId+"_"+youth].isAbroad = isAbroad||'';

		var agreeability = xml.getElementsByTagName("Agreeability")[0].textContent;
		htlivesight.Player.List["_"+playerId+"_"+youth].agreeability = htlivesight.players.agreeability(agreeability)||'';

		var aggressiveness = xml.getElementsByTagName("Aggressiveness")[0].textContent;
		htlivesight.Player.List["_"+playerId+"_"+youth].aggressiveness = htlivesight.players.aggressiveness(aggressiveness)||'';

		var honesty = xml.getElementsByTagName("Honesty")[0].textContent;
		htlivesight.Player.List["_"+playerId+"_"+youth].honesty = htlivesight.players.honesty(honesty)||'';
	}

	var keeperSkill = xml.getElementsByTagName("KeeperSkill")[0];

	if (keeperSkill !== undefined){
		htlivesight.Player.List["_"+playerId+"_"+youth].keeperSkill = htlivesight.players.getSkillFromXML(xml, "KeeperSkill", youth);
	}

	var playmakerSkill = xml.getElementsByTagName("PlaymakerSkill")[0];

	if (playmakerSkill !== undefined){

		htlivesight.Player.List["_"+playerId+"_"+youth].playmakerSkill = htlivesight.players.getSkillFromXML(xml, "PlaymakerSkill", youth);
	}

	var scorerSkill = xml.getElementsByTagName("ScorerSkill")[0];

	if (scorerSkill !== undefined){

		htlivesight.Player.List["_"+playerId+"_"+youth].scorerSkill = htlivesight.players.getSkillFromXML(xml, "ScorerSkill", youth);
	}
	var passingSkill = xml.getElementsByTagName("PassingSkill")[0];
	if (passingSkill !== undefined){

		htlivesight.Player.List["_"+playerId+"_"+youth].passingSkill = htlivesight.players.getSkillFromXML(xml, "PassingSkill", youth);
	}

	var wingerSkill = xml.getElementsByTagName("WingerSkill")[0];

	if (wingerSkill !== undefined){

		htlivesight.Player.List["_"+playerId+"_"+youth].wingerSkill = htlivesight.players.getSkillFromXML(xml, "WingerSkill", youth);
	}

	var defenderSkill = xml.getElementsByTagName("DefenderSkill")[0];

	if (defenderSkill !== undefined){

		htlivesight.Player.List["_"+playerId+"_"+youth].defenderSkill = htlivesight.players.getSkillFromXML(xml, "DefenderSkill", youth);
	}

	var setPiecesSkill = xml.getElementsByTagName("SetPiecesSkill")[0];

	if (setPiecesSkill !== undefined){

		htlivesight.Player.List["_"+playerId+"_"+youth].setPiecesSkill = htlivesight.players.getSkillFromXML(xml, "SetPiecesSkill", youth);
	}


	if(parseInt(specialty,10)>=0 && parseInt(specialty,10)<=8 && parseInt(specialty,10) != 7){
		htlivesight.players.addSpecialtyToDom(playerId,youth,specialty);
	}

};

htlivesight.players.getSkillFromXML = function (xml, skillName, youth){

	var xmlSkillText = xml.getElementsByTagName(skillName)[0].textContent;
	var skillString = htlivesight.players.parserMainSkill(xmlSkillText);

	if (youth=="true"){
		if(xml.getElementsByTagName(skillName+"Max")[0]!==undefined){
			var xmlMaxSkillText = xml.getElementsByTagName(skillName+"Max")[0].textContent;
			skillString += " / " + htlivesight.players.parserMainSkill(xmlMaxSkillText);
		}else{
			skillString = " / ";
		}

		if(skillString == " / ") skillString = "";
	}
	return skillString;
};

htlivesight.players.specialtyChar = function (specialty){

	switch (specialty){
	case "0": return "";

	case "1": return "["+htlivesight.Util.Parse("Technical",htlivesight.data[0])+"] ";

	case "2": return "["+htlivesight.Util.Parse("Quick",htlivesight.data[0])+"] ";

	case "3": return "["+htlivesight.Util.Parse("Powerful",htlivesight.data[0])+"] ";

	case "4": return "["+htlivesight.Util.Parse("Unpredictable",htlivesight.data[0])+"] ";

	case "5": return "["+htlivesight.Util.Parse("Header",htlivesight.data[0])+"] ";

	case "6": return "["+htlivesight.Util.Parse("Regainer",htlivesight.data[0])+"] ";

	case "8": return "["+htlivesight.Util.Parse("Support",htlivesight.data[0])+"] ";

	default: return "";
	}
};

htlivesight.players.specialtyImage = function(specialty){
	switch (specialty){
	case "0": return "";

	case "1": return htlivesight.Image.spec.spec1;

	case "2": return htlivesight.Image.spec.spec2;

	case "3": return htlivesight.Image.spec.spec3;

	case "4": return htlivesight.Image.spec.spec4;

	case "5": return htlivesight.Image.spec.spec5;

	case "6": return htlivesight.Image.spec.spec6;
	
	case "8": return htlivesight.Image.spec.spec8;

	default: return "";
	}
};

htlivesight.players.agreeability = function (agreeability){

	switch (agreeability){
	case "0": return htlivesight.Util.Parse("NastyFellow",htlivesight.data[0])+" (0)";

	case "1": return htlivesight.Util.Parse("ControversialPerson",htlivesight.data[0])+" (1)";

	case "2": return htlivesight.Util.Parse("PleasantGuy",htlivesight.data[0])+" (2)";

	case "3": return htlivesight.Util.Parse("SympatheticGuy",htlivesight.data[0])+" (3)";

	case "4": return htlivesight.Util.Parse("PopularGuy",htlivesight.data[0])+" (4)";

	case "5": return htlivesight.Util.Parse("BelovedTeamMember",htlivesight.data[0])+" (5)";

	default: return "";
	}
};

htlivesight.players.honesty = function (honesty){

	switch (honesty){
	case "0": return htlivesight.Util.Parse("Infamous",htlivesight.data[0])+" (0)";

	case "1": return htlivesight.Util.Parse("Dishonest",htlivesight.data[0])+" (1)";

	case "2": return htlivesight.Util.Parse("Honest",htlivesight.data[0])+" (2)";

	case "3": return htlivesight.Util.Parse("Upright",htlivesight.data[0])+" (3)";

	case "4": return htlivesight.Util.Parse("Righteous",htlivesight.data[0])+" (4)";	

	case "5": return htlivesight.Util.Parse("Saintly",htlivesight.data[0])+" (5)";

	default: return "";
	}
};

htlivesight.players.aggressiveness = function (aggressiveness){

	switch (aggressiveness){
	case "0": return htlivesight.Util.Parse("Tranquil",htlivesight.data[0])+" (0)";

	case "1": return htlivesight.Util.Parse("Calm",htlivesight.data[0])+" (1)";

	case "2": return htlivesight.Util.Parse("Balanced",htlivesight.data[0])+" (2)";

	case "3": return htlivesight.Util.Parse("Temperamental",htlivesight.data[0])+" (3)";

	case "4": return htlivesight.Util.Parse("Fiery",htlivesight.data[0])+" (4)";

	case "5": return htlivesight.Util.Parse("Unstable",htlivesight.data[0])+" (5)";

	default: return "";
	}
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
			$(this).append('<br/>');
			if(specialty!='0') $(this).append('<image class="player_icons" src="'+htlivesight.players.specialtyImage(specialty)+'"</image>');
			//$(this).text($(this).text()+" "+htlivesight.players.specialtyChar(specialty));
			$(this).addClass("withSpecialty");
		}
		if(!$(this).hasClass("withTitle")&& htlivesight.Player.List["_"+playerId+"_"+youth].age>14){
			$(this).attr('title', ''+htlivesight.Player.List["_"+playerId+"_"+youth].firstName+/*'\n'+*/
					((htlivesight.Player.List["_"+playerId+"_"+youth].isAbroad=="True")?"":" ⚑ ")+
					((youth!=="true")?((htlivesight.Player.List["_"+playerId+"_"+youth].motherClubBonus=="True")?"♥\n":"\n"):"")+
					htlivesight.Util.Parse("Age",htlivesight.data[0])+': '+htlivesight.Player.List["_"+playerId+"_"+youth].age + ' ' +
					htlivesight.Util.Parse("TimeDays",htlivesight.data[0])+': '+htlivesight.Player.List["_"+playerId+"_"+youth].ageDays+'\n' +
					((youth!=="true")?(htlivesight.Util.Parse("Agreeability",htlivesight.data[0])+': '+htlivesight.Player.List["_"+playerId+"_"+youth].agreeability+"\n"):"")+
					((youth!=="true")?(htlivesight.Util.Parse("Aggressiveness",htlivesight.data[0])+': '+htlivesight.Player.List["_"+playerId+"_"+youth].aggressiveness+"\n"):"")+
					((youth!=="true")?(htlivesight.Util.Parse("Honesty",htlivesight.data[0])+': '+htlivesight.Player.List["_"+playerId+"_"+youth].honesty+"\n"):"")+
					((youth!=="true")?(htlivesight.Util.Parse("Form",htlivesight.data[0])+': '+htlivesight.Player.List["_"+playerId+"_"+youth].form+"\n"):"")+
					((youth!=="true")?(htlivesight.Util.Parse("Stamina",htlivesight.data[0])+': '+htlivesight.Player.List["_"+playerId+"_"+youth].stamina+'\n'):"")+
					((youth!=="true")?(htlivesight.Util.Parse("Experience",htlivesight.data[0])+': '+htlivesight.Player.List["_"+playerId+"_"+youth].experience+'\n'):"")+
					((youth!=="true")?(htlivesight.Util.Parse("Loyalty",htlivesight.data[0])+': '+htlivesight.Player.List["_"+playerId+"_"+youth].loyalty+" "):"")+
					((youth!=="true")?('TSI: '+htlivesight.Player.List["_"+playerId+"_"+youth].tsi+'\n'):"") +
					((htlivesight.players.specialtyChar(specialty)!=="")?(''+ htlivesight.players.specialtyChar(specialty)+"\n"):"")+
					((htlivesight.Player.List["_"+playerId+"_"+youth].keeperSkill)?("\n"+htlivesight.Util.Parse("Keeper",htlivesight.data[0])+" : "+htlivesight.Player.List["_"+playerId+"_"+youth].keeperSkill):"")+
					((htlivesight.Player.List["_"+playerId+"_"+youth].defenderSkill)?("\n"+htlivesight.Util.Parse("Defending",htlivesight.data[0])+" : "+htlivesight.Player.List["_"+playerId+"_"+youth].defenderSkill):"")+
					((htlivesight.Player.List["_"+playerId+"_"+youth].playmakerSkill)?("\n"+htlivesight.Util.Parse("Playmaking",htlivesight.data[0])+" : "+htlivesight.Player.List["_"+playerId+"_"+youth].playmakerSkill):"")+
					((htlivesight.Player.List["_"+playerId+"_"+youth].wingerSkill)?("\n"+htlivesight.Util.Parse("Winger",htlivesight.data[0])+" : "+htlivesight.Player.List["_"+playerId+"_"+youth].wingerSkill):"")+
					((htlivesight.Player.List["_"+playerId+"_"+youth].passingSkill)?("\n"+htlivesight.Util.Parse("Passing",htlivesight.data[0])+" : "+htlivesight.Player.List["_"+playerId+"_"+youth].passingSkill):"")+
					((htlivesight.Player.List["_"+playerId+"_"+youth].scorerSkill)?("\n"+htlivesight.Util.Parse("Scoring",htlivesight.data[0])+" : "+htlivesight.Player.List["_"+playerId+"_"+youth].scorerSkill):"")+
					((htlivesight.Player.List["_"+playerId+"_"+youth].setPiecesSkill)?("\n"+htlivesight.Util.Parse("SetPieces",htlivesight.data[0])+" : "+htlivesight.Player.List["_"+playerId+"_"+youth].setPiecesSkill):""));
			//if (youth=="true")console.log("keeper = "+htlivesight.Player.List["_"+playerId+"_"+youth].keeperSkill);
			$(this).addClass("withTitle");
		}
	});
};

htlivesight.players.parserMainSkill = function(mainSkill) {

	switch (mainSkill) {
	case "0": return htlivesight.Util.Parse("NonExistent",htlivesight.data[0])+" (0)"; // to add localization

	case "1": return htlivesight.Util.Parse("Disastrous",htlivesight.data[0])+" (1)";

	case "2": return htlivesight.Util.Parse("Wretched",htlivesight.data[0])+" (2)";

	case "3": return htlivesight.Util.Parse("Poor",htlivesight.data[0])+" (3)";

	case "4": return htlivesight.Util.Parse("Weak",htlivesight.data[0])+" (4)";

	case "5": return htlivesight.Util.Parse("Inadequate",htlivesight.data[0])+" (5)";

	case "6": return htlivesight.Util.Parse("Passable",htlivesight.data[0])+" (6)";

	case "7": return htlivesight.Util.Parse("Solid",htlivesight.data[0])+" (7)";

	case "8": return htlivesight.Util.Parse("Excellent",htlivesight.data[0])+" (8)";

	case "9": return htlivesight.Util.Parse("Formidable",htlivesight.data[0])+" (9)";

	case "10": return htlivesight.Util.Parse("Outstanding",htlivesight.data[0])+" (10)";

	case "11": return htlivesight.Util.Parse("Brilliant",htlivesight.data[0])+" (11)";

	case "12": return htlivesight.Util.Parse("Magnificent",htlivesight.data[0])+" (12)";

	case "13": return htlivesight.Util.Parse("WorldClass",htlivesight.data[0])+" (13)";

	case "14": return htlivesight.Util.Parse("Supernatural",htlivesight.data[0])+" (14)";

	case "15": return htlivesight.Util.Parse("Titanic",htlivesight.data[0])+" (15)";

	case "16": return htlivesight.Util.Parse("ExtraTerrestrial",htlivesight.data[0])+" (16)";

	case "17": return htlivesight.Util.Parse("Mythical",htlivesight.data[0])+" (17)";

	case "18": return htlivesight.Util.Parse("Magical",htlivesight.data[0])+" (18)";

	case "19": return htlivesight.Util.Parse("Utopian",htlivesight.data[0])+" (19)";

	case "20": return htlivesight.Util.Parse("Divine",htlivesight.data[0])+" (20)";

	default: return '(' + mainSkill + ')';
	}
};