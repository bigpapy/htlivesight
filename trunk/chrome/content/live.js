var Live = {
  ADD: 1,
  VIEW: 2,
  started: false,
  interval: null,
  loopValue: 0,
  startView: function() {
    if (Live.started==false) {
      var e = document.getElementById("clockBox");
  e.style.width="32px";
  e.style.height="32px";
  Live.interval = setInterval("Live.loop()", 1000);
      Live.started = true; 
    }
  },
  clockSeconds: 0,
  loop: function() {

    Live.clockSeconds = ++Live.clockSeconds % 60;
    var slice = Math.floor(Live.clockSeconds/10);
    var sec = Live.clockSeconds%10;
  
    //document.getElementById("sec").value=clockSeconds;
    //document.getElementById("sec").style.fontSize="9pt";
  
    var e = document.getElementById("clockBox");
    e.style.backgroundImage = "url('img/clock"+slice+".png')";  
    e.style.backgroundColor = "rgb(100%," +(50 + (10-sec)*5)+"%,"+ (10-sec)*10+"%)"; 

    var strings = document.getElementById("strings");
    htlivesight.Log.Label(strings.getString("progress.update")+" "+(60-Live.clockSeconds)
                      +strings.getString("progress.seconds"));
      
    if (Live.clockSeconds==0) {
      Live.view();
      htlivesight.warningShown = false;
    }
  }
  
};

/* ============================================ */

Live.view = function() {
 // var URL = HTTP.hattrickServer
   //                 + "/Common/chppxml.axd?file=live"
     //               + "&actionType=viewAll"
       //             + "&version=1.4"

 // EventSystem.HTTPRequest(URL, Live.ParseView, "request.live");

Live.ParseView = function (response) {
  Live.ParseLive(response, Live.VIEW);
};

/* ============================================ */
Live.Matches = function() {
};

Live.HTTPAddMatch = function (matchId, youth) {
/*  var URL = HTTP.hattrickServer
                    + "/Common/chppxml.axd?file=live"
                    + "&actionType=addMatch"
                    + "&matchID=" + matchId
		    + "&isYouth=" + youth
                    + "&version=1.4";*/
  var match = Match.List["_"+matchId+"_"+youth];
    match.live = true;
    document.getElementById("short_" + matchId + "_" + youth).hidden = false;
  } else {
 //   EventSystem.HTTPRequest(URL, Live.ParseAddMatch, "request.add");
  }
};
  
Live.ParseAddMatch = function (response) {
  Live.ParseLive(response, Live.ADD);
};

Live.HTTPDeleteMatch = function (matchId, youth) {
/*  var URL = HTTP.hattrickServer
                    + "/Common/chppxml.axd?file=live"
                    + "&actionType=deleteMatch"
                    + "&matchID=" + matchId
		    + "&isYouth=" + youth
                    + "&version=1.4"; */
 // EventSystem.HTTPRequest(URL, Live.ParseDeleteMatch, "request.delete");
};

Live.ParseDeleteMatch = function (response) {
};

/* ----------------------------------------------------------------
 * common Parse functions
 * ---------------------------------------------------------------- */

Live.ParseLive = function (response, source) {
  var regStr = "(<Match>(.*?)</Match>)";
  var regExp;
  var match, XMLEventList;
  var found;
  try {
	  var errorMsg = Live.ParseError(response);
	  if (errorMsg != null) {
		  var server = Live.ParseServer(response);
		  var strings = document.getElementById("strings");
		  alert(strings.getString("message.error_reading") + " " + server + ": " + errorMsg);
	  }
	//  alert("Live.Parselive3" + response);
	  regExp = new RegExp(regStr, "g");

	  var count = 0;
	  // for(;found = regExp.exec(response);) {
		  count++;
		  match = new Match(
				  //     Util.Parse("<MatchID>(.*?)</MatchID>", found[1]),
				  //       Time.parseDate(Util.Parse("<MatchDate>(.*?)</MatchDate>", found[1])),
				  new Match.side(
						  Live.ParseHomeTeam(matchNode),
						  Live.ParseHomeGoals(matchNode)
				  ),
				  new Match.side(
						  Live.ParseAwayTeam(matchNode),
						  Live.ParseAwayGoals(matchNode)
				  ),
				  //        new Match.events(Events.ParseList(Util.Parse("<EventList>(.*?)</EventList>", found[1]))),
				  null,
				  Live.ParseYouth(matchNode)
		  );
		//  alert("match.events: "+match.events);
		  if (match.id) {
			  match.home.team = Teams.update(match.home.team, match.youth);
			  match.away.team = Teams.update(match.away.team, match.youth);
			  match = Match.Update(match);
		  }
	  }
//	  alert("Live.Parselive10");
	  for (matchIndex in Match.List) {
		  match = Match.List[matchIndex];
		  if (match.live) {
			  match.updateTime();
	//		  alert("Live.Parselive12");
			  if (source == Live.VIEW) {
				  var first = match.event.list.first;
				  var last = match.event.list.last;
				  for (var i=first; i<=last; i++) {
					  htlivesight.Notify.add(match.event.list["_"+i]);
				  }
			  }
	//		  alert("Live.Parselive14");
			  htlivesight.DOM.UpdateLiveMatch(match);  
		  }

	  }

    if (source == Live.VIEW) {
    	htlivesight.Notify.set();
    }
    
    
  } catch(e) {
	 // alert("Live.ParseView : " + e);
  }

};
 
Live.ParseHomeTeam = function (xml) {
  return new Team(Live.ParseHomeTeamId(xml), Live.ParseHomeTeamName(xml), null, (Live.ParseYouth(xml)?Live.ParseYouth(xml):"False"));
};

Live.ParseAwayTeam = function (xml) {
  return new Team(Live.ParseAwayTeamId(xml), Live.ParseAwayTeamName(xml), null, (Live.ParseYouth(xml)?Live.ParseYouth(xml):"False"));
};

Live.ParseHomeTeamId = function (xml) {
//  return Util.Parse("<HomeTeamID>(.*?)</HomeTeamID>", xml);
};

Live.ParseHomeTeamName = function (xml) {
//  return Util.Parse("<HomeTeamName>(.*?)</HomeTeamName>", xml);
};

Live.ParseAwayTeamId = function (xml) {
//  return Util.Parse("<AwayTeamID>(.*?)</AwayTeamID>", xml);
};

Live.ParseAwayTeamName = function (xml) {
//  return Util.Parse("<AwayTeamName>(.*?)</AwayTeamName>", xml);
};

Live.ParseHomeGoals = function (xml) {
//  return Util.Parse("<HomeGoals>(.*?)</HomeGoals>", xml);
};

Live.ParseAwayGoals = function (xml) {
//  return Util.Parse("<AwayGoals>(.*?)</AwayGoals>", xml);
};

Live.ParseYouth = function (xml) {
//  return Util.Parse("<IsYouth>(.*?)</IsYouth>", xml);
};

Live.ParseError = function (xml) {
 // return Util.Parse("<Error>(.*?)</Error>", xml);
};

Live.ParseServer = function (xml) {
//  return Util.Parse("<Server>(.*?)</Server>", xml);
};

Live.ParseMatchId = function (xml) {
  return League.ParseMatchId(xml);
};