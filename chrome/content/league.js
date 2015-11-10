if (!htlivesight) var htlivesight = {};
htlivesight.League= function League(id, name, level) {
	this.id = id;
	this.name = name;
	this.level = level;
};
htlivesight.League.Round = function(number, date) {
	this.number = number;
	this.date = date;
	this.id = new Array(0);
	this.elapsedTime=null;
};
htlivesight.League.Round.prototype.ElapsedTime = function(now) {
	var f = now - this.date;
	if (f > 0) {
		this.diff="finish.";
		return;
	}
	f = -f;
	var s = Math.floor(f/1000);
	var m = Math.floor(s/60);
	var h = Math.floor(m/60);
	var d = Math.floor(h/24);
	var str;
	if (d > 0) {
		str = d + " day" + (d == 1 ? "" : "s") + " to kick off.";
	} else if (h > 2) {
		str = h + " hours to kick off.";
	} else {
		str = h > 0 ? h + " hour" + (h > 1 ? "s and " : " and ") : "";
		str += m%60 + " minute" + (m > 1 ? "s" : "") + " to kick off.";
	}
	this.diff = str;
};
/* ----------------------------------------------
 * Get League data
 * ---------------------------------------------- */
htlivesight.League.HTTPGet = function (leagueId,teamKind) {
	var parameters=[["file","leaguedetails"],
	                ["leagueLevelUnitID", leagueId]];
	htlivesight.ApiProxy.retrieve(document, parameters, function(xml){htlivesight.League.ParseGet(xml, teamKind);});
};
htlivesight.League.ParseGet = function(xml, teamKind) {
	if(teamKind=="myFirstTeam"){
		htlivesight.League.countryId =  parseInt(htlivesight.Util.Parse("LeagueID", xml), 10);
		htlivesight.League.countryName = htlivesight.Util.Parse("LeagueName", xml);
		htlivesight.League.level = parseInt(htlivesight.Util.Parse("LeagueLevel", xml), 10);
		htlivesight.League.maxLevel = parseInt(htlivesight.Util.Parse("MaxLevel", xml), 10);
		htlivesight.League.levelUnitId = parseInt(htlivesight.Util.Parse("LeagueLevelUnitID", xml), 10);
		htlivesight.League.levelUnitName = htlivesight.Util.Parse("LeagueLevelUnitName", xml);
		htlivesight.League.teams = htlivesight.League.ParseTeams(xml);
		htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_TEAM2);
	}else if(teamKind=="mySecondTeam"){
		htlivesight.League.countryId2 =  parseInt(htlivesight.Util.Parse("LeagueID", xml), 10);
		htlivesight.League.countryName2 = htlivesight.Util.Parse("LeagueName", xml);
		htlivesight.League.level2 = parseInt(htlivesight.Util.Parse("LeagueLevel", xml), 10);
		htlivesight.League.maxLevel2 = parseInt(htlivesight.Util.Parse("MaxLevel", xml), 10);
		htlivesight.League.levelUnitId2 = parseInt(htlivesight.Util.Parse("LeagueLevelUnitID", xml), 10);
		htlivesight.League.levelUnitName2 = htlivesight.Util.Parse("LeagueLevelUnitName", xml);
		htlivesight.League.teams2 = htlivesight.League.ParseTeams(xml);
		htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_LEAGUE);
	}
};

htlivesight.League.ParseTeams = function(xml) {
	var teamXml, teams=null;
	try {
		var leagueTeams = xml.getElementsByTagName("Team");
		teams = new Array(0);
		for(var j=0, len=leagueTeams.length;j< len ;++j){
			var leagueTeam = leagueTeams[j];
			var i=parseInt(htlivesight.Util.Parse("TeamID", leagueTeam), 10);
			teams[i] = new Array();
			teams[i].name = htlivesight.Util.Parse("TeamName", leagueTeam); //.slice(0,19);
			teams[i].id = i;
			teams[i].position = parseInt(htlivesight.Util.Parse("Position", leagueTeam), 10);
			teams[i].livePosition = teams[i].position;
			teams[i].matches = parseInt(htlivesight.Util.Parse("Matches", leagueTeam), 10);
			teams[i].liveMatches = teams[i].matches;
			teams[i].goalsFor = parseInt(htlivesight.Util.Parse("GoalsFor", leagueTeam), 10);
			teams[i].liveGoalsFor = teams[i].goalsFor;
			teams[i].goalsAgainst = parseInt(htlivesight.Util.Parse("GoalsAgainst", leagueTeam), 10);
			teams[i].liveGoalsAgainst = teams[i].goalsAgainst;
			teams[i].points = parseInt(htlivesight.Util.Parse("Points", leagueTeam), 10);
			teams[i].livePoints = teams[i].points;
		}
	} catch(e) {
		alert("htlivesight.League.ParseGet: " + e);
	}
	return teams;
};
/* ----------------------------------------------
 * Get League games
 * ---------------------------------------------- */
htlivesight.League.HTTPFixtures = function (leagueId,teamKind) {
	var parameters=[["file","leaguefixtures"],
									["leagueLevelUnitID", leagueId]];
	htlivesight.ApiProxy.retrieve(document, parameters, function(xml){htlivesight.League.ParseFixtures(xml,teamKind);});
};
htlivesight.League.ParseFixtures = function(xml,teamKind) {
	var fetchDate = htlivesight.Time.parseFetchDate(xml);
	try {
		var leagueMatches = xml.getElementsByTagName("Match");
		var rounds = new Array();  // punto d'inizio della copia
		var id, round, date, home, away;
		var firstRound=Number.MAX_VALUE, lastRound=Number.MIN_VALUE;
		for(var j=0, len=leagueMatches.length ;j< len ;++j){
			var	leagueMatch = leagueMatches[j];
			id = htlivesight.League.ParseMatchId(/*found[1]*/leagueMatch);
			round = htlivesight.League.ParseMatchRound(/*found[1]*/leagueMatch);
			date = htlivesight.League.ParseMatchDate(/*found[1]*/leagueMatch);
			home = htlivesight.Live.ParseHomeTeam(/*found[1]*/leagueMatch);
			away = htlivesight.Live.ParseAwayTeam(/*found[1]*/leagueMatch);
			if (round>lastRound) lastRound=round;
			if (round<firstRound) firstRound=round;
			if (!rounds[round]) {
				rounds[round] = new htlivesight.League.Round(round, date);
			}
			rounds[round].id[rounds[round].id.length] = id;
		}
		var i, length;
		var currentRound=1;
		var nearestDate=Number.MAX_VALUE;
		var diffDate;
		length = rounds.length;
		// check what is the nearest game 
		for (i=1; i<length; i++) {
			diffDate = Math.abs(rounds[i].date - fetchDate);
			if (diffDate < nearestDate) {
				nearestDate = diffDate;
				currentRound = i;
			}
		}
	} catch(e) {
		alert("htlivesight.League.ParseFixtures (get info): " + e);
	}
	try {
		if(teamKind=="myFirstTeam"){
		
		var matchId;

		htlivesight.League.rounds = rounds;
		htlivesight.League.currentRound = rounds[currentRound];
		var p = htlivesight.prefs.matches.league;
		htlivesight.Time.hattrickTime = htlivesight.Time.parseFetchDate(xml);// bigpapy:this read current time
		if (
				//		!(htlivesight.prefs.other.reLive) && //bigpapy: this remove table from relive mode.
				p.get &&
				(
						!p.within || 
						Math.abs(htlivesight.League.currentRound.date-htlivesight.Time.hattrickTime) < p.withinHours*htlivesight.Time.HOUR 
				)
		) {
			htlivesight.showLeague= true;
		} else {
			htlivesight.showLeague= false;
		}
		if (htlivesight.showLeague && htlivesight.League.currentRound != undefined) {
			document.getElementById("winbox_leaguetable").setAttribute("style", "display:block");
			document.getElementById("winboxcontent_leaguematches").setAttribute("style", "display:block");
			document.getElementById("LeagueMatches").setAttribute("style", "display:block");
			document.getElementById("h3LeagueMatches").setAttribute("style", "display:block");
			//htlivesight.Settings.click.headerBarColorSet();
			htlivesight.DOM.setHeaderColor();
			htlivesight.DOM.UpdateElementBoxLeagueTable(htlivesight.League);
			htlivesight.DOM.UpdateElementBoxLeague(htlivesight.League);
			htlivesight.League.matches=rounds[currentRound].id;
			/*for (var i=0; i<rounds[currentRound].id.length; i++) {
				matchId = rounds[currentRound].id[i];
				htlivesight.AddLiveMatch(matchId, "False");
			}*/
		}
		htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_LEAGUE2);
		}else if(teamKind=="mySecondTeam"){
			
			
			var matchId;

			htlivesight.League.rounds2 = rounds;
			htlivesight.League.currentRound2 = rounds[currentRound];
			var p = htlivesight.prefs.matches.league;
			htlivesight.Time.hattrickTime = htlivesight.Time.parseFetchDate(xml);// bigpapy:this read current time
			if (
					//		!(htlivesight.prefs.other.reLive) && //bigpapy: this remove table from relive mode.
					p.get &&
					(
							!p.within || 
							Math.abs(htlivesight.League.currentRound2.date-htlivesight.Time.hattrickTime) < p.withinHours*htlivesight.Time.HOUR 
					)
			) {
				htlivesight.showLeague2= true;
			} else {
				htlivesight.showLeague2= false;
			}
			if (htlivesight.showLeague2 && htlivesight.League.currentRound2 != undefined) {
				document.getElementById("winbox_leaguetableBis").setAttribute("style", "display:block");
				document.getElementById("winboxcontent_leaguematchesBis").setAttribute("style", "display:block");
				document.getElementById("LeagueMatchesBis").setAttribute("style", "display:block");
				document.getElementById("h3LeagueMatchesBis").setAttribute("style", "display:block");
				htlivesight.DOM.setHeaderColor();
				htlivesight.DOM.UpdateElementBoxLeagueTable2(htlivesight.League);
				htlivesight.DOM.UpdateElementBoxLeague2(htlivesight.League);
				htlivesight.League.matches2=rounds[currentRound].id;
//				for (var i=0; i<rounds[currentRound].id.length; i++) {
//					matchId = rounds[currentRound].id[i];
//					htlivesight.AddLiveMatch(matchId, "False");
//				}
			}
			
		}
		htlivesight.EventSystem.Declare(/*htlivesight.EventSystem.ev.MY_TOURNAMENTS*/htlivesight.EventSystem.ev.MY_YOUTHLEAGUE);//disabled tournaments
		
	} catch(e) {
		if(teamKind=="myFirstTeam"){htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_LEAGUE2);}
		if(teamKind=="mySecondTeam"){htlivesight.EventSystem.Declare(/*htlivesight.EventSystem.ev.MY_TOURNAMENTS*/htlivesight.EventSystem.ev.MY_YOUTHLEAGUE);}//disabled tournaments
		// alert("htlivesight.League.ParseFixtures (set info): " + e);
	}
//	if(teamKind==="myFirstTeam"){
//		htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_LEAGUE2);
//	}else if(teamKind==="mySecondTeam"){
//		htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_LEAGUE_MATCHES); // punto di fine della copia
//	}
};
htlivesight.League.addLeagueMatches= function(){
	try{
		for (var i=0; i<htlivesight.League.matches.length; i++) {
			matchId = htlivesight.League.matches[i];
			htlivesight.AddLiveMatch(matchId, "hattrick");
		}
	}catch(e){}
};

htlivesight.League.addLeagueMatches2= function(){
	try{
		for (var i=0; i<htlivesight.League.matches2.length; i++) {
			matchId = htlivesight.League.matches2[i];
			htlivesight.AddLiveMatch(matchId, "hattrick");
		}
	}catch(e){}
};

htlivesight.League.sortTable = function(){
	var tmp = Array();
	for(var id in htlivesight.League.teams){
		tmp[htlivesight.League.teams[id].livePosition] = htlivesight.League.teams[id];
	}
	var change = true;
	while(change){
		change = false;
		for(var i=1; i<8; i++){
			if(htlivesight.League.compareTeams(tmp[i], tmp[i+1]) < 0){
				var tmpTeam = tmp[i];
				tmp[i] = tmp[i+1];
				tmp[i+1] = tmpTeam;
				change = true;
			}
		}
	}
	for(var j=1; j<=8; j++){
		htlivesight.League.teams[tmp[j].id].livePosition = j;
	}
};

htlivesight.League.sortTable2 = function(){
	var tmp = Array();
	for(var id in htlivesight.League.teams2){
		tmp[htlivesight.League.teams2[id].livePosition] = htlivesight.League.teams2[id];
	}
	var change = true;
	while(change){
		change = false;
		for(var i=1; i<8; i++){
			if(htlivesight.League.compareTeams(tmp[i], tmp[i+1]) < 0){
				var tmpTeam = tmp[i];
				tmp[i] = tmp[i+1];
				tmp[i+1] = tmpTeam;
				change = true;
			}
		}
	}
	for(var j=1; j<=8; j++){
		htlivesight.League.teams2[tmp[j].id].livePosition = j;
	}
};

htlivesight.League.compareTeams = function(team1, team2){
	if(team1.livePoints > team2.livePoints) return 1;
	else{
		if(team1.livePoints < team2.livePoints) return -1;
		else{
			if(team1.liveGoalsFor - team1.liveGoalsAgainst > team2.liveGoalsFor - team2.liveGoalsAgainst)
				return 1;
			else{
				if(team1.liveGoalsFor - team1.liveGoalsAgainst < team2.liveGoalsFor - team2.liveGoalsAgainst)
					return -1;
				else{
					if(team1.liveGoalsFor > team2.liveGoalsFor) return 1;
					else{
						if(team1.liveGoalsFor < team2.liveGoalsFor) return -1;
						else return 0;
					}
				}
			}
		}
	}
};
/* ----------------------------------------------------------------
 * common Parse functions
 * ---------------------------------------------------------------- */
htlivesight.League.ParseMatchId = function(xml) {
	return parseInt(htlivesight.Util.Parse("MatchID", xml), 10);
};
htlivesight.League.ParseMatchRound = function(xml) {
	return parseInt(htlivesight.Util.Parse("MatchRound", xml), 10);
};
htlivesight.League.ParseMatchDate = function(xml) {
	return htlivesight.Time.parseDate(htlivesight.Util.Parse("MatchDate", xml));
};
htlivesight.League.parseHomeTeam = function(xml) {
	return htlivesight.Util.Parse("HomeTeam", xml);
};
htlivesight.League.parseAwayTeam = function(xml) {
	return htlivesight.Util.Parse("AwayTeam", xml);
};