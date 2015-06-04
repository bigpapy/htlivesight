if (!htlivesight) var htlivesight = {};
htlivesight.ManagerCompendium = function ManagerCompendium(userId, loginName, languageId, languageName, teams, youthTeams) {
	this.userId = userId;
	this.loginName = loginName;
	this.languageId = languageId;
	this.languageName = languageName;
	this.teams = teams;
	this.youthTeams = youthTeams;	
};

htlivesight.ManagerCompendium.HTTPGetMyData = function () {
	var parameters=[["file","managercompendium"],["version", "1.0"]/*,["userId", "9100817"]*/];
	htlivesight.ApiProxy.retrieve(document, parameters, function (xml){htlivesight.ManagerCompendium.ParseMyData(xml);/*console.log("htlivesight.Team.HTTPGetMyData"+ document.getElementById("teamId").value);*/});
};
htlivesight.ManagerCompendium.ParseMyData = function (xml) {
	var userId, loginName, languageId, languageName, teams, youthTeams, teamsNode;
	teams = []; youthTeams = [];
	try {
		if (xml) {
			userId = parseInt(htlivesight.Util.Parse("UserId",xml),10);
			loginName = htlivesight.Util.Parse("Loginname",xml);
			languageId = parseInt(htlivesight.Util.Parse("LanguageId",xml),10);
			languageName = htlivesight.Util.Parse("LanguageName",xml);
			teamsNode = xml.getElementsByTagName("Team");

			for(var i = 0; i< teamsNode.length; i++){
				teams[i] = {};
				youthTeams[i] = {};
				teams[i].teamId = parseInt(htlivesight.Util.Parse("TeamId", teamsNode[i]),10);
				teams[i].teamName = htlivesight.Util.Parse("TeamName", teamsNode[i]);
				teams[i].arenaId = parseInt(htlivesight.Util.Parse("ArenaId", teamsNode[i]),10);
				teams[i].arenaName = htlivesight.Util.Parse("ArenaName", teamsNode[i]);
				youthTeams[i].youthTeamId = parseInt(htlivesight.Util.Parse("YouthTeamId", teamsNode[i]),10);
				youthTeams[i].youthTeamName = htlivesight.Util.Parse("YouthTeamName", teamsNode[i]);
				youthTeams[i].youthLegueId = parseInt(htlivesight.Util.Parse("YouthLeagueId", teamsNode[i]),10);
				youthTeams[i].youthLeagueName = htlivesight.Util.Parse("YouthLeagueName", teamsNode[i]);
			}
			htlivesight.ManagerCompendium.data = new htlivesight.ManagerCompendium(userId, loginName, languageId, languageName, teams, youthTeams);
			htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.LOGIN);
		}
	} catch(e) {
		alert("ParseMyData: " + e);
		htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.LOGIN);
	}
	
};
