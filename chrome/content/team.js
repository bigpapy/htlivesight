if (!htlivesight) var htlivesight = {};
htlivesight.Team = function Team(id, name, shortName, youth, arenaID, logoURL) {
	this.id = id;
	this.name = name;
	this.shortName = shortName;
	this.youth = (youth=="youth"||youth=="Youth"||youth=="True")?"True":"False";
	this.arenaID = arenaID;
	this.logoURL = logoURL;
	this.addTeamToFriendsPopup=null;
	this.playerList = {};
};
htlivesight.Teams = {
		myTeam: null,
		list: {},
};
htlivesight.Teams.update = function(newTeam) {
	var team = htlivesight.Teams.list["_"+newTeam.id+"_"+newTeam.youth]; 
	if (!team) {
		team=newTeam;
		htlivesight.Teams.list["_"+team.id+"_"+team.youth] = team;
		if (htlivesight.Friends.isFriend(team.id, team.youth, !htlivesight.Friends.STRICT)) {
			htlivesight.Friends.update(team.id, team.name);
		}
	} else {
		if (!team.name) team.name=newTeam.name;
		if (!team.shortName) team.shortName=newTeam.shortName;
		if (!team.logoURL) team.logoURL=newTeam.logoURL;
	}
	return team;
};
htlivesight.Team.HTTPGetMyData = function (teamId, teamKind) {
	var parameters=[["file","teamdetails"],["version", "3.4"], ["teamID", teamId]];
	htlivesight.ApiProxy.retrieve(document, parameters, function (xml){htlivesight.Team.ParseMyData(xml, teamKind, teamId);/*console.log("htlivesight.Team.HTTPGetMyData"+ document.getElementById("teamId").value);*/});
};
htlivesight.Team.ParseMyData = function (xml, teamKind, teamId) {
	var myTeam;
	try {
		if (xml) {
			myTeam = htlivesight.Team.ParseTeamData(xml, teamId); // return team
			console.log(myTeam);
			if(teamKind=="myFirstTeam"){
				htlivesight.Teams.myTeam = myTeam;
				document.getElementById("teamName").textContent = myTeam.name;
			}else if(teamKind=="mySecondTeam"){
				htlivesight.Teams.mySecondTeam = myTeam;
				document.getElementById("secondTeamName").textContent = ", " + myTeam.name;
			}else if(teamKind=="myThirdTeam"){
				htlivesight.Teams.myThirdTeam = myTeam;
				document.getElementById("thirdTeamName").textContent = ", " + myTeam.name;
			}
			if(myTeam)
			{
				htlivesight.Teams.update(myTeam);
			}
		} else {
			if (htlivesight.ApiProxy.authorized(document.getElementById("teamId").value)) alert("team data not found");
			return;
		}
	} catch(e) {
		alert("ParseMyData: " + e);
	}
	if(teamKind=="myFirstTeam"){
		htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.LOGIN2);
		}
	if(teamKind=="mySecondTeam"){
	htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.LOGIN3);
	}
	if(teamKind=="myThirdTeam"){
		htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_STADIUM);
	}
};
htlivesight.Team.ParseMyUserData = function (xml) {
// nothing to do yet
};
htlivesight.Team.ParseTeamData = function (xml, teamId) {
	try {
		var teamNodes = xml.getElementsByTagName("Team");
		for(var j = 0, len = teamNodes.length; j< len ;j++){
			var id = htlivesight.Team.ParseTeamId(teamNodes[j]);
			if(teamId != id) continue;
			var name = htlivesight.Team.ParseTeamName(teamNodes[j]);
			var shortName = htlivesight.Team.ParseShortTeamName(teamNodes[j]);
			var youth = htlivesight.Team.ParseYouth(teamNodes[j]);
			var arenaID = htlivesight.Util.Parse("ArenaID",teamNodes[j]);
			var logoURL = htlivesight.Util.Parse("LogoURL",teamNodes[j]);
			if(!logoURL){ logoURL = htlivesight.Image.window.link.ON; }; 
			team = new htlivesight.Team(id, name, shortName, youth, arenaID, logoURL);
			team.league = htlivesight.Team.ParseLeague(teamNodes[j]); //Team.ParseLeague return league
			return team;
		}
	} catch(e) {
		alert("ParseTeamData: " + e);
	}
	return null;
};
htlivesight.Team.ParseTeamId = function (xml) {
	return parseInt(htlivesight.Util.Parse("TeamID", xml), 10);
};
htlivesight.Team.ParseTeamName = function (xml) {
	return htlivesight.Util.Parse("TeamName", xml);
};
htlivesight.Team.ParseShortTeamName = function (xml) {
	return htlivesight.Util.Parse("ShortTeamName", xml);
};
htlivesight.Team.ParseYouth = function (xml) {
	return "False";
};
//this function is never used
htlivesight.Team.ParseArena = function (xml) {
	//var id, name;
	try {
		
		var arena = {};
		arena.id = parseInt(htlivesight.Util.Parse("ArenaID",xml),10);
		arena.name = htlivesight.Util.Parse("ArenaName",xml);
		try{
		arena.id2 = xml.getElementsByTagName("ArenaID")[1].textContent;
		arena.name2 = xml.getElementsByTagName("ArenaName")[1].textContent;
		}catch(e){console.log("no second arena");}
		return arena;
	} catch(e) { alert("Team.ParseArena: " + e);
	}
	return null;
};
//this function is never used.
htlivesight.Team.ParseCountry = function (xml) {
	var id, name;
	try {
		id = parseInt(htlivesight.Util.Parse("LeagueID",xml),10);
		alert("LeagueID: "+ id);
		name = htlivesight.Util.Parse("LeagueName",xml);
		alert("LeagueName: "+ name);
		var country = new Country(id, name);
		return country;
	} catch(e) { alert("Team.ParseCountry: " + e);
	}
	return null;
};
htlivesight.Team.ParseLeague = function (xml) {
	var id, name, level;
	try {
		id = parseInt(htlivesight.Util.Parse("LeagueLevelUnitID",xml),10);
		name = htlivesight.Util.Parse("LeagueLevelUnitName",xml);
		level = parseInt(htlivesight.Util.Parse("LeagueLevel",xml),10);
		var league = new htlivesight.League(id, name, level);
		return league;
	} catch(e) {
		alert("Team.ParseLeague: " + e);
	}
	return null;
};
htlivesight.Team.IsNationalTeam = function (id) {
	var teamId = parseInt(id, 10);
	if(teamId >= 3000 && teamId <= 3300){
		return true;
	}else{
		return false;
	}
}