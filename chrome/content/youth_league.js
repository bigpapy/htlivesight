if (!htlivesight) var htlivesight = {};
htlivesight.YouthLeague= function YouthLeague(id, name, level) {
	this.id = id;
	this.name = name;
	this.level = level;
};
htlivesight.YouthLeague.Round = function(number, date) {
	this.number = number;
	this.date = date;
	this.id = new Array(0);
	this.elapsedTime=null;
};
htlivesight.YouthLeague.Round.prototype.ElapsedTime = function(now) {
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
htlivesight.YouthLeague.HTTPGet = function (youthLeagueId, teamKind) {
	var parameters=[["file","youthLeaguedetails"],
	                ["youthleagueid", youthLeagueId]];
	//console.log("Parameters: ");console.log(parameters);
	htlivesight.ApiProxy.retrieve(document, parameters, function(xml){htlivesight.YouthLeague.ParseGet(xml, teamKind);});
};
htlivesight.YouthLeague.ParseGet = function(xml, teamKind) { //console.log("htlivesight.YouthLeague.ParseGet response");
	if(teamKind=="myFirstYouthTeam"){ //console.log(xml);
		htlivesight.YouthLeague.youthLeagueId =  parseInt(htlivesight.Util.Parse("YouthLeagueID", xml), 10);
		htlivesight.YouthLeague.youthLeagueName = htlivesight.Util.Parse("YouthLeagueName", xml);
		htlivesight.YouthLeague.teams = htlivesight.YouthLeague.ParseTeams(xml);//console.log("***** BEFORE CHANGING YOUTH TEAM");
		htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_YOUTHTEAM2);
		//console.log("set htlivesight.EventSystem.ev.MY_YOUTHTEAM2 into youthleagueParseGet");
	}else if(teamKind=="mySecondYouthTeam"){
		htlivesight.YouthLeague.youthLeagueId2 =  parseInt(htlivesight.Util.Parse("YouthLeagueID", xml), 10);
		htlivesight.YouthLeague.youthLeagueName2 = htlivesight.Util.Parse("YouthLeagueName", xml);
		htlivesight.YouthLeague.teams2 = htlivesight.YouthLeague.ParseTeams(xml);
		htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_YOUTHTEAM3);
	}else if(teamKind=="myThirdYouthTeam"){
		htlivesight.YouthLeague.youthLeagueId3 =  parseInt(htlivesight.Util.Parse("YouthLeagueID", xml), 10);
		htlivesight.YouthLeague.youthLeagueName3 = htlivesight.Util.Parse("YouthLeagueName", xml);
		htlivesight.YouthLeague.teams3 = htlivesight.YouthLeague.ParseTeams(xml);
		htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_YOUTHLEAGUE);
	}
};

htlivesight.YouthLeague.ParseTeams = function(xml) {
	var teamXml, teams=null;
	try {
		var youthLeagueTeams = xml.getElementsByTagName("Team");
		teams = new Array(0);
		for(var j=0, len=youthLeagueTeams.length;j< len ;++j){
			var youthLeagueTeam = youthLeagueTeams[j];
			var i=parseInt(htlivesight.Util.Parse("TeamID", youthLeagueTeam), 10);
			teams[i] = new Array();
			teams[i].name = htlivesight.Util.Parse("TeamName", youthLeagueTeam); //.slice(0,19);
			teams[i].id = i;
			teams[i].position = parseInt(htlivesight.Util.Parse("Position", youthLeagueTeam), 10);
			teams[i].livePosition = teams[i].position;
			teams[i].matches = parseInt(htlivesight.Util.Parse("Matches", youthLeagueTeam), 10);
			teams[i].liveMatches = teams[i].matches;
			teams[i].goalsFor = parseInt(htlivesight.Util.Parse("GoalsFor", youthLeagueTeam), 10);
			teams[i].liveGoalsFor = teams[i].goalsFor;
			teams[i].goalsAgainst = parseInt(htlivesight.Util.Parse("GoalsAgainst", youthLeagueTeam), 10);
			teams[i].liveGoalsAgainst = teams[i].goalsAgainst;
			teams[i].points = parseInt(htlivesight.Util.Parse("Points", youthLeagueTeam), 10);
			teams[i].livePoints = teams[i].points;
		}
	} catch(e) {
		alert("htlivesight.YouthLeague.ParseGet: " + e);
	}
	return teams;
};
/* ----------------------------------------------
 * Get YouthLeague games
 * ---------------------------------------------- */
htlivesight.YouthLeague.HTTPFixtures = function (youthLeagueId,teamKind) {
	//console.log("inside htlivesight.YouthLeague.HTTPFixtures");
	var parameters=[["file","youthleaguefixtures"],
					["youthLeagueid", youthLeagueId]];
	//console.log("youthLeagueid = "+ youthLeagueId);
	htlivesight.ApiProxy.retrieve(document, parameters, function(xml){htlivesight.YouthLeague.ParseFixtures(xml,teamKind);});
};
htlivesight.YouthLeague.ParseFixtures = function(xml,teamKind) {
	//console.log("1");
	//console.log(xml);
	var fetchDate = htlivesight.Time.parseFetchDate(xml);
	try {
		var youthLeagueMatches = xml.getElementsByTagName("Match");
		var rounds = new Array();  // punto d'inizio della copia
		var id, round, date, home, away;
		var firstRound=Number.MAX_VALUE, lastRound=Number.MIN_VALUE;
		for(var j=0, len=youthLeagueMatches.length ;j< len ;++j){
			var	youthLeagueMatch = youthLeagueMatches[j];
			id = htlivesight.YouthLeague.ParseMatchId(/*found[1]*/youthLeagueMatch);
			//console.log("id = "+ id);
			round = htlivesight.YouthLeague.ParseMatchRound(/*found[1]*/youthLeagueMatch);
			//console.log("round = "+ round);
			date = htlivesight.YouthLeague.ParseMatchDate(/*found[1]*/youthLeagueMatch);
			//console.log("date = "+ date);
			home = htlivesight.Live.ParseHomeTeam(/*found[1]*/youthLeagueMatch);
			//console.log("home = "+ home);
			away = htlivesight.Live.ParseAwayTeam(/*found[1]*/youthLeagueMatch);
			//console.log("away = "+ away);
			if (round>lastRound) lastRound=round;
			if (round<firstRound) firstRound=round;
			if (!rounds[round]) {
				rounds[round] = new htlivesight.YouthLeague.Round(round, date);
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
		alert("htlivesight.YouthLeague.ParseFixtures (get info): " + e);
	}
	try {
		if(teamKind=="myFirstYouthTeam"){
		//console.log("into teamKind my first youth team")
		var matchId;
		//console.log("1");
		htlivesight.YouthLeague.rounds = rounds;
		//console.log("2");
		htlivesight.YouthLeague.currentRound = rounds[currentRound];
		//console.log("3");
		var p = htlivesight.prefs.matches.youthLeague;
		//console.log("4");
		htlivesight.Time.hattrickTime = htlivesight.Time.parseFetchDate(xml);// bigpapy:this read current time
		//console.log("5");
		//console.log(htlivesight.YouthLeague.currentRound.date);
		//console.log(htlivesight.Time.hattrickTime);
		if (
				//		!(htlivesight.prefs.other.reLive) && //bigpapy: this remove table from relive mode.
				p.get &&
				(
						!p.within || 
						Math.abs(htlivesight.YouthLeague.currentRound.date-htlivesight.Time.hattrickTime) < p.withinHours*htlivesight.Time.HOUR 
				)
		) {
			htlivesight.showYouthLeague= true;
		} else {
			htlivesight.showYouthLeague= false;
		}
		//console.log("htlivesight.showYouthLeague = " + htlivesight.showYouthLeague);
		//console.log("htlivesight.YouthLeague.currentRound = " + htlivesight.YouthLeague.currentRound);
		if (htlivesight.showYouthLeague && htlivesight.YouthLeague.currentRound != undefined) {
			try{
				htlivesight.DOM.UpdateElementBoxYouthLeagueTable(htlivesight.YouthLeague);
				htlivesight.DOM.UpdateElementBoxYouthLeague(htlivesight.YouthLeague);
				//console.log("before adding youthleague matches");
				//console.log(rounds[currentRound].id);
				htlivesight.YouthLeague.matches=rounds[currentRound].id;
				document.getElementById("winbox_youthleaguetable").setAttribute("style", "display:block");
				document.getElementById("winboxcontent_youthleaguematches").setAttribute("style", "display:block");
				document.getElementById("YouthLeagueMatches").setAttribute("style", "display:block");
				document.getElementById("h3YouthLeagueMatches").setAttribute("style", "display:block");
				htlivesight.Settings.click.headerBarColorSet();
				htlivesight.DOM.setHeaderColor();
			}catch(e){
				//document.getElementById("winbox_youthleaguetable").setAttribute("style", "display:none");
				//htlivesight.showYouthLeague= false;
				console.log(e);
			}
		}
		htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_YOUTHLEAGUE2);
		}else if(teamKind=="mySecondYouthTeam"){
			
			
			var matchId;

			htlivesight.YouthLeague.rounds2 = rounds;
			htlivesight.YouthLeague.currentRound2 = rounds[currentRound];
			var p = htlivesight.prefs.matches.youthLeague;
			htlivesight.Time.hattrickTime = htlivesight.Time.parseFetchDate(xml);// bigpapy:this read current time
			if (
					//		!(htlivesight.prefs.other.reLive) && //bigpapy: this remove table from relive mode.
					p.get &&
					(
							!p.within || 
							Math.abs(htlivesight.YouthLeague.currentRound2.date-htlivesight.Time.hattrickTime) < p.withinHours*htlivesight.Time.HOUR 
					)
			) {
				htlivesight.showYouthLeague2= true;
			} else {
				htlivesight.showYouthLeague2= false;
			}
			if (htlivesight.showYouthLeague2 && htlivesight.YouthLeague.currentRound2 != undefined) {
				try{
					htlivesight.DOM.UpdateElementBoxYouthLeagueTable2(htlivesight.YouthLeague);
					htlivesight.DOM.UpdateElementBoxYouthLeague2(htlivesight.YouthLeague);
					htlivesight.YouthLeague.matches2=rounds[currentRound].id;
					document.getElementById("winbox_youthLeaguetableBis").setAttribute("style", "display:block");
					document.getElementById("winboxcontent_youthLeaguematchesBis").setAttribute("style", "display:block");
					document.getElementById("YouthLeagueMatchesBis").setAttribute("style", "display:block");
					document.getElementById("h3YouthLeagueMatchesBis").setAttribute("style", "display:block");
					htlivesight.Settings.click.headerBarColorSet();
					htlivesight.DOM.setHeaderColor();
				}catch(e){
					//document.getElementById("winbox_youthleaguetableBis").setAttribute("style", "display:none");
					//htlivesight.showYouthLeague2= false;
					console.log(e);
					
				}
			}
			htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_YOUTHLEAGUE3);
		}else if(teamKind=="myThirdYouthTeam"){
			
			
			var matchId;

			htlivesight.YouthLeague.rounds3 = rounds;
			htlivesight.YouthLeague.currentRound3 = rounds[currentRound];
			var p = htlivesight.prefs.matches.youthLeague;
			htlivesight.Time.hattrickTime = htlivesight.Time.parseFetchDate(xml);// bigpapy:this read current time
			if (
					//		!(htlivesight.prefs.other.reLive) && //bigpapy: this remove table from relive mode.
					p.get &&
					(
							!p.within || 
							Math.abs(htlivesight.YouthLeague.currentRound3.date-htlivesight.Time.hattrickTime) < p.withinHours*htlivesight.Time.HOUR 
					)
			) {
				htlivesight.showYouthLeague3= true;
			} else {
				htlivesight.showYouthLeague3= false;
			}
			if (htlivesight.showYouthLeague3 && htlivesight.YouthLeague.currentRound3 != undefined) {
				try{
					htlivesight.DOM.UpdateElementBoxYouthLeagueTable3(htlivesight.YouthLeague);
					htlivesight.DOM.UpdateElementBoxYouthLeague3(htlivesight.YouthLeague);
					htlivesight.YouthLeague.matches3=rounds[currentRound].id;

					document.getElementById("winbox_youthLeaguetableTer").setAttribute("style", "display:block");
					document.getElementById("winboxcontent_youthLeaguematchesTer").setAttribute("style", "display:block");
					document.getElementById("YouthLeagueMatchesTer").setAttribute("style", "display:block");
					document.getElementById("h3YouthLeagueMatchesTer").setAttribute("style", "display:block");
					htlivesight.Settings.click.headerBarColorSet();
					htlivesight.DOM.setHeaderColor();
				}catch(e){
					//document.getElementById("winbox_youthleaguetableBis").setAttribute("style", "display:none");
					//htlivesight.showYouthLeague2= false;
					console.log(e);
					
				}
			}
			htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_LEAGUE_MATCHES);
		}

		
	} catch(e) {
		console.log(e); console.log(teamKind);
		if(teamKind=="myFirstYouthTeam"){htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_YOUTHLEAGUE2);}
		if(teamKind=="mySecondYouthTeam"){htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_YOUTHLEAGUE3);}
		if(teamKind=="myThirdYouthTeam"){htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_LEAGUE_MATCHES);}
		// alert("htlivesight.YouthLeague.ParseFixtures (set info): " + e);
	}
//	if(teamKind==="myFirstTeam"){
//		htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_LEAGUE2);
//	}else if(teamKind==="mySecondTeam"){
//		htlivesight.EventSystem.Declare(htlivesight.EventSystem.ev.MY_LEAGUE_MATCHES); // punto di fine della copia
//	}
};
htlivesight.YouthLeague.addYouthLeagueMatches= function(){
	try{
		for (var i=0; i<htlivesight.YouthLeague.matches.length; i++) {
			matchId = htlivesight.YouthLeague.matches[i];
			htlivesight.AddLiveMatch(matchId, "youth");
		}
	}catch(e){}
};

htlivesight.YouthLeague.addYouthLeagueMatches2= function(){
	try{
		for (var i=0; i<htlivesight.YouthLeague.matches2.length; i++) {
			matchId = htlivesight.YouthLeague.matches2[i];
			htlivesight.AddLiveMatch(matchId, "youth");
		}
	}catch(e){}
};

htlivesight.YouthLeague.addYouthLeagueMatches3= function(){
	try{
		for (var i=0; i<htlivesight.YouthLeague.matches3.length; i++) {
			matchId = htlivesight.YouthLeague.matches3[i];
			htlivesight.AddLiveMatch(matchId, "youth");
		}
	}catch(e){}
};
// TODO: make next three functions one.
htlivesight.YouthLeague.sortTable = function(){
	var tmp = Array();
	var length = 0;
	for(var id in htlivesight.YouthLeague.teams){
		tmp[htlivesight.YouthLeague.teams[id].livePosition] = htlivesight.YouthLeague.teams[id];
		length++;
	}
	var change = true;
	while(change){
		change = false;
		for(var i=1; i<length; i++){
			if(htlivesight.YouthLeague.compareTeams(tmp[i], tmp[i+1]) < 0){
				var tmpTeam = tmp[i];
				tmp[i] = tmp[i+1];
				tmp[i+1] = tmpTeam;
				change = true;
			}
		}
	}
	for(var j=1; j<=length; j++){
		htlivesight.YouthLeague.teams[tmp[j].id].livePosition = j;
	}
};

htlivesight.YouthLeague.sortTable2 = function(){
	var tmp = Array();
	var length = 0;
	for(var id in htlivesight.YouthLeague.teams2){
		tmp[htlivesight.YouthLeague.teams2[id].livePosition] = htlivesight.YouthLeague.teams2[id];
		length++;
	}
	var change = true;
	while(change){
		change = false;
		for(var i=1; i<length; i++){
			if(htlivesight.YouthLeague.compareTeams(tmp[i], tmp[i+1]) < 0){
				var tmpTeam = tmp[i];
				tmp[i] = tmp[i+1];
				tmp[i+1] = tmpTeam;
				change = true;
			}
		}
	}
	for(var j=1; j<=length; j++){
		htlivesight.YouthLeague.teams2[tmp[j].id].livePosition = j;
	}
};

htlivesight.YouthLeague.sortTable3 = function(){
	var tmp = Array();
	var length = 0;
	for(var id in htlivesight.YouthLeague.teams3){
		tmp[htlivesight.YouthLeague.teams3[id].livePosition] = htlivesight.YouthLeague.teams3[id];
		length++;
	}
	var change = true;
	while(change){
		change = false;
		for(var i=1; i<length; i++){
			if(htlivesight.YouthLeague.compareTeams(tmp[i], tmp[i+1]) < 0){
				var tmpTeam = tmp[i];
				tmp[i] = tmp[i+1];
				tmp[i+1] = tmpTeam;
				change = true;
			}
		}
	}
	for(var j=1; j<=length; j++){
		htlivesight.YouthLeague.teams3[tmp[j].id].livePosition = j;
	}
};


htlivesight.YouthLeague.compareTeams = function(team1, team2){
	if((!team1)||(!team2)) return 0;
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
htlivesight.YouthLeague.ParseMatchId = function(xml) {
	return parseInt(htlivesight.Util.Parse("MatchID", xml), 10);
};
htlivesight.YouthLeague.ParseMatchRound = function(xml) {
	return parseInt(htlivesight.Util.Parse("MatchRound", xml), 10);
};
htlivesight.YouthLeague.ParseMatchDate = function(xml) {
	return htlivesight.Time.parseDate(htlivesight.Util.Parse("MatchDate", xml));
};
htlivesight.YouthLeague.parseHomeTeam = function(xml) {
	return htlivesight.Util.Parse("HomeTeam", xml);
};
htlivesight.YouthLeague.parseAwayTeam = function(xml) {
	return htlivesight.Util.Parse("AwayTeam", xml);
};