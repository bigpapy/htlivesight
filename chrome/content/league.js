function League() {
};

var Round = function(number, date) {
    this.number = number;
    this.date = date;
    this.id = new Array(0);
    this.elapsedTime=null;
  };

Round.prototype.ElapsedTime = function(now) {
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
	  str = h > 0 
          ? h + " hour" + (h > 1 ? "s and " : " and ")
          : "";
    str += m%60 + " minute" + (m > 1 ? "s" : "") + " to kick off.";
	}
  this.diff = str;
};

/* ----------------------------------------------
 * Get League data
 * ---------------------------------------------- */
League.HTTPGet = function () {
 // var URL = HTTP.hattrickServer
 //                     + "/Common/chppxml.axd?file=leaguedetails";
 // EventSystem.HTTPRequest(URL, League.ParseGet, "request.league_data");
//	alert("League.HTTPGet()");
  var parameters=[["file","leaguedetails"]];
//  alert("League.HTTPGet(): prima di api proxy");
  Htlivesight.ApiProxy.retrieve(document, parameters, function(xml){League.ParseGet(xml);});
};

League.ParseGet = function(xml) {
  League.countryId =  parseInt(Util.Parse("LeagueID", xml), 10);
  //  parseInt(Util.Parse("<LeagueID>(.*?)</LeagueID>", xml), 10);
//  alert("LegueID " +League.countryId);

  League.countryName = Util.Parse("LeagueName", xml);
  //  Util.Parse("<LeagueName>(.*?)</LeagueName>", xml);
//  alert("LegueName " +League.countryName);

  League.level = parseInt(Util.Parse("LeagueLevel", xml), 10);
  //  parseInt(Util.Parse("<LeagueLevel>(.*?)</LeagueLevel>", xml), 10);
//  alert("LegueLevel " +League.level);
  
  League.maxLevel = parseInt(Util.Parse("MaxLevel", xml), 10);
  //  parseInt(Util.Parse("<MaxLevel>(.*?)</MaxLevel>", xml), 10);
//  alert("MaxLevel " +League.maxLevel);

  League.levelUnitId = parseInt(Util.Parse("LeagueLevelUnitID", xml), 10);
  //  parseInt(Util.Parse("<LeagueLevelUnitID>(.*?)</LeagueLevelUnitID>", xml), 10);
//  alert("LeagueLevelUnitID " +League.levelUnitId);
  
  League.levelUnitName = Util.Parse("LeagueLevelUnitName", xml);
  //  Util.Parse("<LeagueLevelUnitName>(.*?)</LeagueLevelUnitName>", xml);
//  alert("LeagueLevelUnitName " +League.levelUnitName);

  League.teams = League.ParseTeams(xml);
  EventSystem.Declare(EventSystem.ev.MY_LEAGUE);
};

League.ParseTeams = function(xml) {
  //var regStr = "(<Team\\s(?:.*?)</Team>)";
 /* var regStr = "(<Team>(.*?)</Team>)";
  var regExp, found;
  var teamXml, teams=null;*/
  try {
	//  alert("before leagueTeams = xml.getElementsByTagName(Team)");
	  var leagueTeams = xml.getElementsByTagName("Team");
	//  alert("after leagueTeams = xml.getElementsByTagName(Team)");
	  
 //   regExp = new RegExp(regStr, "g");
    teams = new Array(0);
    	for(var j=0;j< leagueTeams.length ;++j){
    		leagueTeam = leagueTeams[j];
    // for(;found = regExp.exec(xml);) {
//    	teamXml = found[1];
      // Gonzo remove: teams[teams.length] = Util.Parse("<TeamID>(.*?)</TeamID>", teamXml);
      // Gonzo
    	//	var i=Util.Parse("<TeamID>(.*?)</TeamID>", teamXml);
    		var i=parseInt(Util.Parse("TeamID", leagueTeam), 10);
    //		alert("TeamID " + i);
    		
    		teams[i] = new Array();
    		    		
    		//teams[i].name = Util.Parse("<TeamName>(.*?)</TeamName>", teamXml);
    		teams[i].name = Util.Parse("TeamName", leagueTeam);
   // 		alert("TeamName " + teams[i].name);
    		
    		teams[i].id = i;
    		    		
    		//teams[i].position = parseInt(Util.Parse("<Position>(.*?)</Position>", teamXml), 10);
    		teams[i].position = parseInt(Util.Parse("Position", leagueTeam), 10);
    //		alert("Position " + teams[i].position);
    		
    		teams[i].livePosition = teams[i].position;
      
    		
    		//teams[i].matches = parseInt(Util.Parse("<Matches>(.*?)</Matches>", teamXml), 10);
    		teams[i].matches = parseInt(Util.Parse("Matches", leagueTeam), 10);
    //		alert("Matches " + teams[i].matches);
    		
    		teams[i].liveMatches = teams[i].matches;
      
    		
    		//teams[i].goalsFor = parseInt(Util.Parse("<GoalsFor>(.*?)</GoalsFor>", teamXml), 10);
    		teams[i].goalsFor = parseInt(Util.Parse("GoalsFor", leagueTeam), 10);
   // 		alert("GoalsFor " + teams[i].goalsFor);
    		
    		teams[i].liveGoalsFor = teams[i].goalsFor;
      
    		
    		//teams[i].goalsAgainst = parseInt(Util.Parse("<GoalsAgainst>(.*?)</GoalsAgainst>", teamXml), 10);
    		teams[i].goalsAgainst = parseInt(Util.Parse("GoalsAgainst", leagueTeam), 10);
    //		alert("GoalsAgainst " + teams[i].goalsAgainst);
    		
    		teams[i].liveGoalsAgainst = teams[i].goalsAgainst;
      
    		
    		//teams[i].points = parseInt(Util.Parse("<Points>(.*?)</Points>", teamXml), 10);
    		teams[i].points = parseInt(Util.Parse("Points", leagueTeam), 10);
    	//	alert("Points " + teams[i].points);
    		
    		teams[i].livePoints = teams[i].points;

    		
    		// End
    }
  } catch(e) {
    alert("League.ParseGet: " + e);
  }
  return teams;

};

/* ----------------------------------------------
 * Get League games
 * ---------------------------------------------- */

League.HTTPFixtures = function () {
   // var URL = HTTP.hattrickServer
   //                   + "/Common/chppxml.axd?file=leaguefixtures";
                      
 // EventSystem.HTTPRequest(URL, League.ParseFixtures, "request.league_games");
    var parameters=[["file","leaguefixtures"]];
    Htlivesight.ApiProxy.retrieve(document, parameters, function(xml){League.ParseFixtures(xml);});
};

League.ParseFixtures = function(xml) {
  var fetchDate = Time.parseFetchDate(xml);
  //var regStr = "(<Match\\s(?:.*?)</Match>)";
  var regStr = "(<Match>(.*?)</Match>)";
//  var regExp, found;
  try {
	  var leagueMatches = xml.getElementsByTagName("Match");
    regExp = new RegExp(regStr, "g");
    var rounds = new Array();  // punto d'inizio della copia
    var id, round, date/*, home, away*/;
    var firstRound=Number.MAX_VALUE, lastRound=Number.MIN_VALUE;

    // get all league games from hattrick
    
    for(var j=0;j< leagueMatches.length ;++j){
		leagueMatch = leagueMatches[j];
    
      id = League.ParseMatchId(/*found[1]*/leagueMatch);
  //    alert("id " +id);
      
      round = League.ParseMatchRound(/*found[1]*/leagueMatch);
  //    alert("round " +round);
      
      date = League.ParseMatchDate(/*found[1]*/leagueMatch);
   //   alert("date " +date);
      home = Live.ParseHomeTeam(/*found[1]*/leagueMatch);
  //    alert("home " +home);
      away = Live.ParseAwayTeam(/*found[1]*/leagueMatch);
  //    alert("away " +away);
      
      // just check if firstRound is 1 and lastRound is 14 
      if (round>lastRound) lastRound=round;
      if (round<firstRound) firstRound=round;

      if (!rounds[round]) {
        rounds[round] = new Round(round, date);
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
    alert("League.ParseFixtures (get info): " + e);
  }
  try {
    var /*g, h,*/ matchId;

    League.rounds = rounds;
    League.currentRound = rounds[currentRound];
    var p = htlivesight.prefs.matches.league;
    Time.hattrickTime = Time.parseFetchDate(xml);// bigpapy:this read current time
    if (
    		!(htlivesight.prefs.other.reLive) &&
      p.get
      && (
        !p.within
        || Math.abs(League.currentRound.date-Time.hattrickTime) < p.withinHours*Time.HOUR 
      )
    ) {
      htlivesight.showLeague= true;
    } else {
      htlivesight.showLeague= false;
    }
    
    if (htlivesight.showLeague) {
    	// Gonzo
      document.getElementById("winbox_leaguetable").hidden = false;
    
    	  UpdateElementBoxLeagueTable(League);
      // End 
    	  UpdateElementBoxLeague(League);
 
      for (i=0; i<rounds[currentRound].id.length; i++) {
        matchId = rounds[currentRound].id[i];
        htlivesight.AddLiveMatch(matchId, "False");
      }
    }
  } catch(e) {
    alert("League.ParseFixtures (set info): " + e);
  }
  EventSystem.Declare(EventSystem.ev.MY_LEAGUE_MATCHES); // punto di fine della copia
};

// Gonzo
League.sortTable = function(){
  var tmp = Array();
  for(var id in League.teams){
    tmp[League.teams[id].livePosition] = League.teams[id];
  }
  var change = true;
  while(change){
    change = false;
    for(var i=1; i<8; i++){
      if(League.compareTeams(tmp[i], tmp[i+1]) < 0){
        var tmpTeam = tmp[i];
        tmp[i] = tmp[i+1];
        tmp[i+1] = tmpTeam;
        change = true;
      }
    }
  }
  for(var j=1; j<=8; j++){
    League.teams[tmp[j].id].livePosition = j;
  }
};

League.compareTeams = function(team1, team2){
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
// End

/* ----------------------------------------------------------------
 * common Parse functions
 * ---------------------------------------------------------------- */

League.ParseMatchId = function(xml) {
//	return Util.Parse("<MatchID>(.*?)</MatchID>", xml);
	return parseInt(Util.Parse("MatchID", xml), 10);
};

League.ParseMatchRound = function(xml) {
//  return parseInt(Util.Parse("<MatchRound>(.*?)</MatchRound>", xml), 10);
	return parseInt(Util.Parse("MatchRound", xml), 10);
};

League.ParseMatchDate = function(xml) {
//  return Time.parseDate(Util.Parse("<MatchDate>(.*?)</MatchDate>", xml));
	return Time.parseDate(Util.Parse("MatchDate", xml));
};

League.parseHomeTeam = function(xml) {
//  return Time.parseDate(Util.Parse("<MatchDate>(.*?)</MatchDate>", xml));
	return Util.Parse("HomeTeam", xml);
};
League.parseAwayTeam = function(xml) {
//  return Time.parseDate(Util.Parse("<MatchDate>(.*?)</MatchDate>", xml));
  return Util.Parse("AwayTeam", xml);
};




