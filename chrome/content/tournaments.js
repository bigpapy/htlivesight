//htlivesight.Tournament = function(id, name, type){
//	this.id = id;
//	this.name = name;
//	this.type = type;
//}
htlivesight.Tournaments={};
htlivesight.Tournaments.HTTPTournamentsList = function (teamId, teamKind) {
	var parameters=[["file","tournamentlist"],
	                ["version", "1.0"],
	                ["teamId", teamId]];
	htlivesight.ApiProxy.retrieve(document, parameters, function(xml){htlivesight.Tournaments.ParseTournamentList(xml,teamId, teamKind);});
};

htlivesight.Tournaments.HTTPTournamentFixtures = function (tournamentsId) {
	var parameters=[["file","tournamentFixtures"],
	                ["version", "1.0"],
	                ["tournamentId", tournamentsId]];
	htlivesight.ApiProxy.retrieve(document, parameters, function(xml){htlivesight.Tournaments.ParseTournamentFixtures(xml);});
};


htlivesight.Tournaments.ParseTournamentList = function(xml,teamId,teamKind) {
	var fetchDate = htlivesight.Time.parseFetchDate(xml);
	try {
		var tournaments = xml.getElementsByTagName("Tournament");
		//console.log(tournaments);
		for(i=0;i<tournaments.length;i++){
			console.log(tournaments[i]);
			var id = xml.getElementsByTagName("TournamentId")[0].textContent;
			console.log(id);
			htlivesight.Tournaments.HTTPTournamentFixtures(id);
//			var name = xml.getElementsByTagName("Name")[0].text;
//			var type = xml.getElementsByTagName("TournamentTyped")[0].text;
//			var tournament = new htlivesight.Tournament(id, name, type);
			
		}
	}catch(e){alert("error in htlivesight.Tournament.ParseTournamentList: "+e)}
	
	if(teamKind==="myFirstTeam"){
		htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_TOURNAMENTS2);
	}
	if(teamKind==="mySecondTeam"){
		htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_YOUTHLEAGUE);
	}
}
htlivesight.Tournaments.ParseTournamentFixtures = function(xml) {
	var fetchDate = htlivesight.Time.parseFetchDate(xml);
	try {
		var matches = xml.getElementsByTagName("Match");
		//console.log(tournaments);
		for(i=0;i<matches.length;i++){
			//console.log(matches[i]);
			var id = matches[i].getElementsByTagName("MatchId")[0].textContent;
			var date =htlivesight.League.ParseMatchDate(matches[i]);
			var p = htlivesight.prefs.matches.tournament;
			console.log("get tournament? "+ p.get + " hour limit = " + p.withinHours);
			if((p.get) && Math.abs(date-htlivesight.Time.hattrickTime) < p.withinHours*htlivesight.Time.HOUR){
				console.log("adding match id = "+ id + " date: "+date);
				htlivesight.AddLiveMatch(id, "htointegrated");
			}
			
		}
	}catch(e){alert("error in htlivesight.Tournament.ParseTournamentList: "+e)}
}