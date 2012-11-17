if (!htlivesight) var htlivesight = {};
htlivesight.Team = function Team(id, name, shortName, youth) {
	this.id = id;
	this.name = name;
	this.shortName = shortName;
	this.youth = (youth=="youth"||youth=="Youth"||youth=="True")?"True":"False";
	this.addTeamToFriendsPopup=null;
};
htlivesight.Teams = {
		myTeam: null,
		list: new Object(),
};
htlivesight.Teams.update = function(newTeam) {
	var team = htlivesight.Teams.list["_"+newTeam.id+"_"+newTeam.youth]; 
	if (!team) {
		team=newTeam;
		htlivesight.Teams.list["_"+team.id+"_"+team.youth] = team;
		if (htlivesight.Friends.isFriend(team.id, team.youth, !htlivesight.Friends.STRICT)) {
			htlivesight.Friends.update(team.id, team.name);
		};
	} else {
		if (!team.name) team.name=newTeam.name;
		if (!team.shortName) team.shortName=newTeam.shortName;
	};
	return team;
};
htlivesight.Team.HTTPGetMyData = function () {
	var parameters=[["file","teamdetails"],
	                ["teamID", document.getElementById("teamId").value]
	];
	htlivesight.ApiProxy.retrieve(document, parameters, function (xml){htlivesight.Team.ParseMyData(xml);/*console.log("htlivesight.Team.HTTPGetMyData"+ document.getElementById("teamId").value);*/});
};
htlivesight.Team.ParseMyData = function (xml) {
	var myTeam;
	try {
		if (xml) {
			myTeam = htlivesight.Team.ParseTeamData(xml); // return team
			htlivesight.Teams.myTeam = myTeam;
			document.getElementById("teamName").innerHTML=myTeam.name;
			htlivesight.Teams.update(myTeam);
		} else {
			if (htlivesight.ApiProxy.authorized(document.getElementById("teamId").value)) alert("team data not found");
			return;
		};
	} catch(e) {
		alert("ParseMyData: " + e);
	}
	htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_TEAM);
};
htlivesight.Team.ParseMyUserData = function (xml) {
	;// nothing to do yet
};
htlivesight.Team.ParseTeamData = function (xml) {
	try {
		var id = htlivesight.Team.ParseTeamId(xml);
		var name = htlivesight.Team.ParseTeamName(xml);
		var shortName = htlivesight.Team.ParseShortTeamName(xml);
		var youth = htlivesight.Team.ParseYouth(xml);
		team = new htlivesight.Team(id, name, shortName, youth);
		team.league = htlivesight.Team.ParseLeague(xml); //Team.ParseLeague return league
		return team;
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
	var id, name;
	try {
		id = parseInt(htlivesight.Util.Parse("ArenaID",xml),10);
		alert("ArenaID: " + id);
		name = htlivesight.Util.Parse("ArenaName",xml);
		alert("Arenaname: "+ name);	  
		var arena = new Arena(id, name);
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