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
	htlivesight.ApiProxy.retrieve(document, parameters, function (xml){htlivesight.ManagerCompendium.ParseMyData(xml);});
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
				/*if(teams[0] && teams[0].teamId){
					document.getElementById("teamId").value = teams[0].teamId;
				}*/
				// Test:
				/*teams[1] = {};
				teams[1].teamId = '2015476';
				teams[2] = {};
				teams[2].teamId = '2056795';*/
				var checked  = document.getElementById("getMyDataAutomatically").checked;
				if(checked && teams[1] && teams[1].teamId){
					document.getElementById("secondTeamId").value = teams[1].teamId;
				}
				if(checked && teams[2] && teams[2].teamId){
					document.getElementById("thirdTeamId").value = teams[2].teamId;
				}
			//just to test second youth team, because I don't get one:
			//htlivesight.ManagerCompendium.data.youthTeams[0] = {};
			//htlivesight.ManagerCompendium.data.youthTeams[0].youthTeamId='2100512';
			//htlivesight.ManagerCompendium.data.youthTeams[0].youthTeamName='davidirkikipouspous';
			//htlivesight.ManagerCompendium.data.youthTeams[0].youthLegueId='536557';
			//htlivesight.ManagerCompendium.data.youthTeams[0].youthLeagueName='Les minis FHJ-NJistes';
			
			/*htlivesight.ManagerCompendium.data.youthTeams[2] = {};
			htlivesight.ManagerCompendium.data.youthTeams[2].youthTeamId='2316836';
			htlivesight.ManagerCompendium.data.youthTeams[2].youthTeamName='daviboudchou';
			htlivesight.ManagerCompendium.data.youthTeams[2].youthLegueId='592681';
			htlivesight.ManagerCompendium.data.youthTeams[2].youthLeagueName='bonanivfiloo';
			htlivesight.ManagerCompendium.data.youthTeams[1] = {};
			htlivesight.ManagerCompendium.data.youthTeams[1].youthTeamId='2606405';
			htlivesight.ManagerCompendium.data.youthTeams[1].youthTeamName='davidirkikipouspous';
			htlivesight.ManagerCompendium.data.youthTeams[1].youthLegueId='517253';
			htlivesight.ManagerCompendium.data.youthTeams[1].youthLeagueName='303';*/
		/*	htlivesight.ManagerCompendium.data.youthTeams[1] = {};
			htlivesight.ManagerCompendium.data.youthTeams[1].youthTeamId=htlivesight.ManagerCompendium.data.youthTeams[0].youthTeamId;
			htlivesight.ManagerCompendium.data.youthTeams[1].youthTeamName=htlivesight.ManagerCompendium.data.youthTeams[0].youthTeamName;
			htlivesight.ManagerCompendium.data.youthTeams[1].youthLegueId=htlivesight.ManagerCompendium.data.youthTeams[0].youthLegueId;
			htlivesight.ManagerCompendium.data.youthTeams[1].youthLeagueName=htlivesight.ManagerCompendium.data.youthTeams[0].youthLeagueName;
			
			htlivesight.ManagerCompendium.data.youthTeams[0] = {};
			htlivesight.ManagerCompendium.data.youthTeams[0].youthTeamId='1485283';
			htlivesight.ManagerCompendium.data.youthTeams[0].youthTeamName='IFK GM';
			htlivesight.ManagerCompendium.data.youthTeams[0].youthLegueId='207696';
			htlivesight.ManagerCompendium.data.youthTeams[0].youthLeagueName='Delphi B';*/
			// end injecting second youth team data: to be removed after tests.
			htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.LOGIN);
		}
	} catch(e) {
		alert("ParseMyData: " + e);
		htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.LOGIN);
	}
	
};
htlivesight.ManagerCompendium.isMyYouthTeam = function (id) {
	if(htlivesight.ManagerCompendium.data.youthTeams[0] && (id == htlivesight.ManagerCompendium.data.youthTeams[0].youthTeamId)){
		return true;
	}
	if(htlivesight.ManagerCompendium.data.youthTeams[1] && (id == htlivesight.ManagerCompendium.data.youthTeams[1].youthTeamId)){
		return true;
	}
	if(htlivesight.ManagerCompendium.data.youthTeams[2] && (id == htlivesight.ManagerCompendium.data.youthTeams[2].youthTeamId)){
		return true;
	}
	return false;
};
